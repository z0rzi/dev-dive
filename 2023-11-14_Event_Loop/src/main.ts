type Task = () => unknown;

class Api {
  setTimeout(fn: Task, delay: number) {
    setTimeout(() => {
      taskQueue.addTask(fn);
    }, delay);
  }
}

class TaskQueue {
  queue: Task[] = [];

  addTask(t: Task) {
    this.queue.push(t);
    eventLoop.run();
  }

  getTask() {
    return this.queue.shift();
  }

  get size() {
    return this.queue.length;
  }
}

class EventLoop {
  run() {
    if (runtime.instructions.length > 0 || taskQueue.size === 0) return;
    const task = taskQueue.getTask();
    if (!!task) runtime.addInstruction(task);
  }
}

class Runtime {
  instructions: Task[] = [];
  running = false;

  private runNextInstruction() {
    const instruction = this.instructions.shift();
    if (!!instruction) instruction();
  }

  public run() {
    this.running = true;
    while (this.instructions.length) {
      this.runNextInstruction();
    }
    this.running = false;
    eventLoop.run();
  }

  public addInstruction(instruction: Task, stayStopped = false) {
    this.instructions.push(instruction);
    if (!stayStopped && !this.running) this.run();
  }
}

const api = new Api();
const runtime = new Runtime();
const eventLoop = new EventLoop();
const taskQueue = new TaskQueue();

runtime.addInstruction(() => {
  console.log("Hey there");
  runtime.addInstruction(() => {
    console.log("Hey there 2");
  });
});
runtime.addInstruction(() => {
  api.setTimeout(() => {
    console.log("waited...");
  }, 500);
});

runtime.run();
