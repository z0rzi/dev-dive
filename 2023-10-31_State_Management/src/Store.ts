import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Direction, DirectionDelta } from "./Position";

export type PlayerState = {
  health: number;
  swordLevel: number;
  movements: string[];
  position: {
    x: number;
    y: number;
  };
};

type GameState = {
  seed: string;
  player: {
    past: PlayerState[];
    present: PlayerState;
  };
};

const initialState: GameState = {
  seed: "jbednoiwd",
  player: {
    past: [],
    present: {
      health: 100,
      swordLevel: 0,
      movements: [],
      position: {
        x: 0,
        y: 0,
      },
    },
  },
};

export const gameSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    damagePlayer: (state, action: PayloadAction<number>) => {
      state.player.present.health -= action.payload;
      if (state.player.present.health < 0) state.player.present.health = 0;
    },
    restoreHealth: (state, action: PayloadAction<number>) => {
      state.player.present.health += action.payload;
      if (state.player.present.health > 100) state.player.present.health = 100;
    },
    levelUp: (state) => {
      state.player.present.swordLevel++;
    },
    movePlayer: (state, action: PayloadAction<Direction>) => {
      state.player.past.push(state.player.present);

      const newPresentState = { ...state.player.present };
      const newPosition = { ...newPresentState.position };
      const delta = DirectionDelta[action.payload];

      newPresentState.movements = [
        ...newPresentState.movements,
        Direction[action.payload].charAt(0),
      ];

      newPosition.x += delta.x;
      newPosition.y += delta.y;

      newPresentState.position = newPosition;

      state.player.present = newPresentState;
    },
    undo: (state) => {
      let lastState: PlayerState | undefined = state.player.past.pop();

      if (lastState) state.player.present = lastState;
      else state.player.present = initialState.player.present;
    },
  },
});

const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

export default store;

export function getVisitedRooms(): { x: number; y: number }[] {
  const visitedRooms: { x: number; y: number }[] = [];

  store.getState().game.player.past.forEach((state) => {
    visitedRooms.push(state.position);
  });

  return visitedRooms;
}

export const { movePlayer, damagePlayer, restoreHealth, levelUp, undo } =
  gameSlice.actions;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
