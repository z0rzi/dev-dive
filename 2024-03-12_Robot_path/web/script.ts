let ws: null | WebSocket = null;

function* rainbowColors(difference: number): Generator<string> {
  let hue = 0;

  while (true) {
    const color = `hsl(${hue}, 100%, 50%)`;
    yield color;

    hue += difference;

    if (hue >= 360) {
      hue %= 360;
    }
  }
}

class Canvas {
  ctx: CanvasRenderingContext2D;

  colors = rainbowColors(5);

  get canvas() {
    return this.ctx.canvas;
  }

  readonly GRID_SIZE = 80;
  get CELL_SIZE() {
    return this.ctx.canvas.width / this.GRID_SIZE;
  }

  constructor() {
    const canvas = document.getElementById(
      "canvas"
    ) as null | HTMLCanvasElement;
    if (canvas === null) {
      throw new Error("Canvas not found");
    }

    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.clear();
  }

  clear() {
    const canvasWidth = this.ctx.canvas.width;
    const canvasHeight = this.ctx.canvas.height;
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    this.drawGrid();
  }

  drawGrid() {
    const canvasWidth = this.ctx.canvas.width;
    const canvasHeight = this.ctx.canvas.height;
    if (!this.ctx || !canvasWidth || !canvasHeight) {
      return;
    }

    this.ctx.strokeStyle = "#eee";
    this.ctx.beginPath();

    for (let i = 0; i < this.GRID_SIZE; i++) {
      this.ctx.moveTo(i * this.CELL_SIZE, 0);
      this.ctx.lineTo(i * this.CELL_SIZE, canvasHeight);
      this.ctx.moveTo(0, i * this.CELL_SIZE);
      this.ctx.lineTo(canvasWidth, i * this.CELL_SIZE);
    }

    this.ctx.stroke();
  }

  printRobotPosition(x: number, y: number) {
    const canvasWidth = this.canvas?.width;
    const canvasHeight = this.canvas?.height;
    if (!this.ctx || !canvasWidth || !canvasHeight) {
      return;
    }

    this.ctx.fillStyle = this.colors.next().value || "#000";
    this.ctx.fillRect(
      canvasWidth / 2 + x * this.CELL_SIZE,
      canvasHeight / 2 + y * this.CELL_SIZE,
      this.CELL_SIZE,
      this.CELL_SIZE
    );
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(
      canvasWidth / 2 + x * this.CELL_SIZE,
      canvasHeight / 2 + y * this.CELL_SIZE,
      this.CELL_SIZE,
      this.CELL_SIZE
    );
  }
}

class HtmlStuff {
  constructor() {
    this.setupButtonListener();
    this.setupCmdInputListener();
    this.setupCwdInputListener();
  }

  getCommand() {
    const cmdInput = document.querySelector(
      ".command"
    ) as null | HTMLInputElement;

    if (cmdInput === null) {
      throw new Error("Input not found");
    }

    return cmdInput.value;
  }

  setCwd(cwd: string) {
    const cwdEl = document.querySelector("input.cwd") as null | HTMLInputElement;
    if (cwdEl === null) {
      throw new Error("CWD element not found");
    }

    cwdEl.value = cwd;
  }

  setupButtonListener() {
    const submit = document.querySelector("button") as null | HTMLButtonElement;
    if (submit === null) {
      throw new Error("Submit button not found");
    }
    submit.addEventListener("click", (evt) => {
      this.onButtonClicked(evt);
    });
  }

  setupCmdInputListener() {
    const cmdInput = document.querySelector(
      ".command"
    ) as null | HTMLInputElement;

    if (cmdInput === null) {
      throw new Error("Input not found");
    }

    cmdInput.addEventListener("keyup", () => {
      if (!ws) return;

      const command = cmdInput.value;

      ws.send("$" + command);
    });
  }

  setupCwdInputListener() {
    const cwdInput = document.querySelector(
      ".cwd"
    ) as null | HTMLInputElement;

    if (cwdInput === null) {
      throw new Error("Input not found");
    }

    cwdInput.addEventListener("blur", () => {
      if (!ws) return;

      const cwd = cwdInput.value;

      ws.send(`~${cwd}`);
    });
  }

  onButtonClicked(event: Event) {
    const btn = event.target as null | HTMLButtonElement;
    const sequenceInput = document.querySelector(
      ".sequence"
    ) as null | HTMLInputElement;

    if (sequenceInput === null || btn === null) {
      throw new Error("Input or button not found");
    }

    const sequence = sequenceInput.value;

    this.toggleButton(false);

    if (ws !== null) {
      ws.send(">" + sequence);
    }
  }

  toggleButton(enable: boolean) {
    const btn = document.querySelector("button") as null | HTMLButtonElement;
    if (btn === null) {
      throw new Error("Button not found");
    }

    btn.disabled = !enable;
  }

  private logDebounce = 0;
  private logBuffer = "";
  log(message: string) {
    if (this.logDebounce) {
      this.logBuffer += message + "<br>";
      return;
    } else {
      this.logBuffer += message + "<br>";
    }

    // We debounce the log to avoid too many writes to the DOM, it can be slow...
    this.logDebounce = window.setTimeout(() => {
      const log = document.getElementById("logs");
      if (log) {
        log.innerHTML += this.logBuffer;
        log.scrollTop = log.scrollHeight;
      }
      this.logBuffer = "";
      this.logDebounce = 0;
    }, 10);
  }

  clearLogs() {
    const log = document.getElementById("logs");
    if (log) {
      log.innerHTML = "";
    }
  }
}

function setupWS() {
  const socket = new WebSocket("ws://localhost:8800");

  socket.addEventListener("open", () => {
    // connection is opened
    console.log("WebSocket connection established");
    ws = socket;

    setTimeout(() => {
      const command = html.getCommand();
      ws?.send("$" + command);
    });
  });

  const canvas = new Canvas();
  const html = new HtmlStuff();

  function onReceiveMessage(line: string) {
    html.log(line);
    if (line.startsWith('CWD=')) {
      // It's the current working directory
      html.setCwd(line.slice(4));
      return;
    }

    if (line.startsWith(">")) {
      line = line.slice(1).trim();

      if (line === "RUNNING SCRIPT") {
        canvas.clear();
        html.clearLogs();
        return;
      }

      if (line === "DONE") {
        html.toggleButton(true);
        return;
      }

      if (!/^-?\d+;-?\d+$/.test(line)) {
        html.log("Invalid position, ignoring");
        return;
      }

      const [x, y] = line.split(";").map((coord) => +coord);

      canvas.printRobotPosition(x, y);
    }
  }

  socket.addEventListener("message", (event) => {
    // message is received from the server
    const message = event.data as string;
    const lines = message.split("\n");

    for (let line of lines) {
      if (line.trim() === "") {
        continue;
      }

      onReceiveMessage(line);
    }
  });

  socket.addEventListener("close", () => {
    // connection is closed
    console.log("WebSocket connection closed");
    ws = null;
  });
}

setupWS();
