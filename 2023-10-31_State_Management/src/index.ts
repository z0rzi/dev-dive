import Plot from "./Plot";
import Seed from "./Seed";

import store from './Store';

const seed = store.getState().game.seed;
Seed.getInstance().init(seed);

new Plot();
