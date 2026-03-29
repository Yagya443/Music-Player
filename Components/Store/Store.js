import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./playerSlice";
import playlistReducer from "./playListSlice";
// import playlist from "./playListSlice";


export const store = configureStore({
  reducer: {
    player: playerReducer,
    playlist:playlistReducer
  },
});
