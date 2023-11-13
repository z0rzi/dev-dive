# Understanding the Event Loop

This week, we're going to talk about the Event Loop!

The Event Loop is the heartbeat of asynchronous JavaScript, playing a pivotal role in how our applications handle concurrent operations. Whether you're a seasoned developer or just starting, comprehending the Event Loop is essential for writing efficient and responsive code.

In scenarios where you're dealing with user interactions, handling file operations, or making API calls, a solid understanding of the Event Loop is your toolkit for crafting performant applications.

Join us for an exciting exploration about the inner workings of the Event Loop, its role in non-blocking I/O operations, and how it ensures the smooth execution of code in a single-threaded environment.

🔗 Study links:
- [MDN Web Docs: Concurrency model and Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
- [Understanding the JavaScript Event Loop](https://blog.carbonfive.com/the-javascript-event-loop-explained/)
- [Philip Roberts: What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

# The kata - Event Loop Simulator
## Background:
In this Kata, we'll delve into the core of JavaScript - its asynchronous behavior governed by the event loop. You'll simulate asynchronous operations and witness firsthand how JavaScript handles tasks in its event queue.

## Objective:
To develop a program that mimics asynchronous behavior using JavaScript. You'll create a simplified version of an event loop to execute asynchronous tasks and handle their resolution.

## Instructions:

### Task 1: Creating Asynchronous Functions

- Junior Level Task:
    - Create two functions: delayedGreeting and delayedCountdown.
    - delayedGreeting should log "Hello, DevDivers!" after a specified delay.
    - delayedCountdown should count down from a provided number to 1 at intervals.

- Senior Level Task:
    - Extend the functions to allow for a callback upon completion.
    - Implement delayedGreeting to accept a callback that triggers after the greeting is logged.
    - For delayedCountdown, ensure a callback is executed after the countdown completes.


### Task 2: Simulating the Event Loop

- Junior Level Task:
    - Use setTimeout to manage the asynchronous execution of the functions created in Task 1.
    - Queue the delayedGreeting function to execute after a specified delay.
    - Queue the delayedCountdown function with a delay to start after the greeting.

- Senior Level Task:
    - Replicate the event loop mechanism.
    - Implement a queue system to manage the order of function execution.
    - Ensure the event loop handles the callbacks appropriately.

### Task 3: Complexity Increment

- Junior Level Task:
    - Enhance the countdown to accept a custom callback function upon completion.
    - Implement a pause and resume functionality for the countdown.

- Senior Level Task:
    - Create a priority queue system to handle task priorities.
    - Allow for the manipulation of task priorities during execution.


## Wrap Up:

Present your code and a brief explanation of your approach. Share your insights on how this simulation emulates the JavaScript event loop.
