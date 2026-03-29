import { createSlice } from "@reduxjs/toolkit";

const playListSlice = createSlice({
    name: "playlist",
    initialState: {
        currentSong: null,
        playLists: [],
        songs: [
            {
                id: 1,
                title: "Motto",
                artist: "NF Real Music",
                duration: "3:54",
                url: "./songs/NF_-_Motto_CeeNaija.com_.mp3",
            },
            {
                id: 2,
                title: "Fear",
                artist: "NF Real Music",
                duration: "4:31",
                url: "./songs/NF_-_Fear_CeeNaija.com_.mp3",
            },
            {
                id: 3,
                title: "Change",
                artist: "NF Real Music",
                duration: "5:36",
                url: "./songs/NF_-_Change_CeeNaija.com_.mp3",
            },
            {
                id: 4,
                title: "Time",
                artist: "NF Real Music",
                duration: "4:04",
                url: "./songs/NF_-_Time_CeeNaija.com_.mp3",
            },
            {
                id: 5,
                title: "Layers",
                artist: "NF Real Music",
                duration: "3:16",
                url: "./songs/NF_-_Layers_CeeNaija.com_.mp3",
            },
        ],
    },

    reducers: {
        setCurrentSong(state, action) {
            state.currentSong = action.payload;
        },
        createPlayList(state, action) {
            const name = action.payload.trim();
            const exists = state.playLists.find((e) => e.name === name);
            if (exists) return;

            state.playLists.push({
                id: Date.now(),
                name: action.payload,
                playListSongs: [],
            });
        },
        deletePlaylist(state, action) {
            state.playLists = state.playLists.filter(
                (pl) => pl.id !== action.payload,
            );
        },
        addSongToPlaylist(state, action) {
            const { playlistId, song } = action.payload;
            const playlist = state.playLists.find((pl) => pl.id === playlistId);

            if (!playlist) return;

            const exists = playlist.playListSongs.find((s) => s.id === song.id);
            if (!exists) {
                playlist.playListSongs.push(song);
            }
        },
        removeSongFromPlayList(state, action) {
            const { playlistId, songId } = action.payload;

            const playlist = state.playLists.find((pl) => pl.id === playlistId);

            if (!playlist) return;

            playlist.playListSongs = playlist.playListSongs.filter(
                (song) => song.id !== songId,
            );
            
        },
    },
});

export const {
    setCurrentSong,
    createPlayList,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlayList,
} = playListSlice.actions;
export default playListSlice.reducer;
