# State management and Redux

This week, we're going to talk about State management!

State management is the backbone of responsive and dynamic applications. It's the art of handling and controlling data, ensuring your app reacts intelligently to user input and changing conditions. Whether you're building web or mobile applications, understanding state management is essential.

Join us for an exploration of state management. We'll dive into the concepts, patterns, and tools that empower you to create applications that respond seamlessly to user interactions.

The kata will be using the Redux library. Make sur to get familiar with it before coming.

🔗 **Study links :**

- What is state management?
  https://dev.to/jennherrarte/what-is-state-management-and-why-is-it-important-1i8d

- Understanding Redux
  https://www.freecodecamp.org/news/what-is-redux-store-actions-reducers-explained/

- Getting started with Redux
  https://redux.js.org/tutorials/fundamentals/part-1-overview

## The Kata

### Installation

With bun :

```bash
bun install
bun start
```

With npm :

```bash
npm install
npm run start
```

### Mechanics

The app is a **very** simple RPG-like CLI game. The player has to choose the movements of a character who wakes up in a dungeon. The character goes from room to room, to ultimately fight a final boss, and potentially win the game.

The existing rooms are as follow :

- Init room
  Where the game starts

- Sword room
  Levels up your sword

- Food room
  Restores tour health

- Empty room
  Nothing happens

- Enemy room, boss room and final boss room
  You loose a given amount of health, depending on the type of enemy, and your sword level.

The _randomness_ of the game is based on a seed (accessible in `index.ts`). Meaning that 2 games with the same seed and the same movements will be exactly identical.

### The challenge

Your role is to implement the "Go back in time" feature (currently binded to the `backspace` key.)

When going back in time, the player should be placed in the last visited room, his state and the map state are restored, as if the movement never happened.

The player should be able to go back in time 5 times per game.
It should be possible to go back in time twice in a row.

Use Redux to manage the state of the various elements of the game.

### A bit of help

An article about how to implement an undo history with Redux:
https://redux.js.org/usage/implementing-undo-history


### Extra task

If you still have time, add a possibility to save a game as a file, and to load it later. (Without re-playing the movements on load)
