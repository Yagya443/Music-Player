import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
    name: "player",
    initialState: {
        isPlaying: true,
        mute: false,
        queue: [],
        currentIndex: 0,
    },
    reducers: {
        togglePlay(state) {
            state.isPlaying = !state.isPlaying;
        },
        volumeStatus(state) {
            state.mute = !state.mute;
        },
        setIsPlaying(state, action) {
            state.isPlaying = action.payload;
        },
        playQueue(state, action) {
            state.queue = action.payload;
            state.currentIndex = 0;
            state.isPlaying = true;
        },
        setCurrentIndex(state, action) {
            state.currentIndex = action.payload;
        },
    },
});

export const {
    togglePlay,
    volumeStatus,
    setIsPlaying,
    playQueue,
    setCurrentIndex,
} = playerSlice.actions;
export default playerSlice.reducer;
