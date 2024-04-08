import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import type { ServerWebSocket } from "bun";

let CWD = path.dirname(__dirname);
let RUN_SCRIPT_CMD = "node ../robot.js";

// Building the front script
await Bun.build({
  entrypoints: ["./script.ts"],
  outdir: "./build",
});

let script = fs.readFileSync("build/script.js", "utf8");
let html = fs.readFileSync("index.html", "utf8");

html = `
<html>
  <head>
    <script src="/script.js"></script>
  </head>
  <body>
    ${html}
  </body>
</html>
`;

script = `
document.addEventListener('DOMContentLoaded', () => {
  ${script}
})
`;

// Opening the web server
Bun.serve({
  port: 8080,
  fetch(req) {
    const reqUrl = new URL(req.url);

    if (reqUrl.pathname === "/script.js") {
      return new Response(script, {
        headers: {
          "Content-Type": "application/javascript",
        },
      });
    }

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
});
console.log("Server running at http://localhost:8080");

let websocket = null as null | ServerWebSocket<unknown>;

// Opening the websocket server
Bun.serve({
  port: 8800,
  fetch(req, server) {
    if (server.upgrade(req)) return;
    return new Response("Upgrade failed :(", { status: 500 });
  },
  websocket: {
    message(ws, message: string) {
      // a message is received
      console.log("Message received", message);

      if (message.startsWith("$")) {
        // It's the command to run the script
        const command = message.slice(1).trim();
        RUN_SCRIPT_CMD = command;
      } else if (message.startsWith(">")) {
        // It's the sequence
        const sequence = message.slice(1).trim();
        ws.send("> RUNNING SCRIPT");
        runScript(sequence).then(() => {
          if (ws !== null) {
            ws.send("> DONE ");
          }
        });
      } else if (message.startsWith("~")) {
        // It's a command to change the working directory
        const dirpath = message.slice(1).trim();
        CWD = dirpath;
      } else {
        console.log("Received unknown message", message);
      }
    },
    open(ws) {
      // a socket is opened
      websocket = ws;
      ws.send(`CWD=${CWD}`);
    },
    close(ws) {
      // a socket is closed
      console.log("Socket closed");
      websocket = null;
    },
  },
});

async function runOneCommand(command: string): Promise<boolean> {
  const cmdParts = command.split(" ");
  const mainCmd = cmdParts.shift();
  if (mainCmd === undefined) {
    throw new Error("Invalid command");
  }

  try {
    const robotExec = spawn(mainCmd, cmdParts, { cwd: CWD, shell: true });

    robotExec.stdout.on("data", (data) => {
      if (websocket !== null) {
        websocket.send(data.toString());
      }
    });

    robotExec.stderr.on("data", (data) => {
      if (websocket !== null) {
        websocket.send(data.toString());
      }
    });

    await new Promise<void>((resolve, reject) => {
      robotExec.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Robot script exited with code ${code}`));
        }
      });
    });
  } catch (err: any) {
    if (!!websocket) {
      let errMessage = "";
      if ("message" in err) {
        errMessage = err.message as string;
      } else {
        errMessage = "Unknown error";
      }

      websocket.send("Error while running the script: " + errMessage);
      return false;
    }
  }

  return true;
}

async function runScript(sequence: string) {
  // Running the user robot script, and listening to the output
  if (!fs.existsSync(CWD)) {
    console.log("Directory doesn't exist", CWD);
    websocket?.send("Directory doesn't exist: " + CWD);
    return;
  }
  const stats = fs.statSync(CWD);
  if (!stats.isDirectory()) {
    console.log("CWD is not a directory", CWD);
    websocket?.send("CWD is not a directory: " + CWD);
    return;
  }

  const cmdParts = (RUN_SCRIPT_CMD).split(" ");
  cmdParts.push('"' + sequence.trim() + '"');
  const mainCmd = cmdParts.shift();
  if (mainCmd === undefined) {
    throw new Error("Invalid command");
  }

  try {
    const robotExec = spawn(mainCmd, cmdParts, { cwd: CWD, shell: true });

    robotExec.stdout.on("data", (data) => {
      if (websocket !== null) {
        websocket.send(data.toString());
      }
    });

    robotExec.stderr.on("data", (data) => {
      if (websocket !== null) {
        websocket.send(data.toString());
      }
    });

    await new Promise<void>((resolve, reject) => {
      robotExec.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Robot script exited with code ${code}`));
        }
      });
    });
  } catch (err: any) {
    if (!!websocket) {
      let errMessage = "";
      if ("message" in err) {
        errMessage = err.message as string;
      } else {
        errMessage = "Unknown error";
      }

      websocket.send("Error while running the script: " + errMessage);
      return false;
    }
  }

  return true;
}
