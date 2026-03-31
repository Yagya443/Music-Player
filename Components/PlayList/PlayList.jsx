import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";
import {
    addSongToPlaylist,
    createPlayList,
    deletePlaylist,
    removeSongFromPlayList,
    setCurrentSong,
} from "../Store/playListSlice";
import { playQueue } from "../Store/playerSlice";

const PlayListlist = () => {
    const [inputVal, setInputVal] = useState("");
    const songs = useSelector((state) => state.playlist.songs);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const playLists = useSelector((state) => state.playlist.playLists);

    const dispatch = useDispatch();

    const handleCreatePlayList = () => {
        if (!inputVal) return;
        dispatch(createPlayList(inputVal));

        setInputVal("");
    };

    const handlePlayListPlay = (e) => {
        if (e.length === 0) return;

        dispatch(playQueue(e));
        dispatch(setCurrentSong(e[0]));
    };

    const handleDeletePLayList = () => {
        dispatch(deletePlaylist(selectedPlaylistId));
    };

    const handleRemoveFromPlayList = (e, song) => {
        dispatch(
            removeSongFromPlayList({
                playlistId: e.id,
                songId: song.id,
            }),
        );
    };

    const handleAddToPlayList = (song) => {
        dispatch(
            addSongToPlaylist({
                playlistId: selectedPlaylistId,
                song,
            }),
        );
    };

    const filteredPlayLists = playLists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
);

    return (
        <>
            <div className="playlistWrapper border-2 rounded-2xl w-108 bg-[#2B2B2B] px-4 py-4 max-h-148">
                <h1 className="text-3xl text-center font-semibold">PlayList</h1>
                <div className="createPlaylist-wrapper w-90% bg-[#363636] py-3 px-3 mt-2 rounded-lg">
                    <h2 className=" font-semibold text-2xl">
                        Create A PlayList
                    </h2>
                    <div className="flex gap-1.5 justify-evenly mt-3">
                        <input
                            placeholder="PlayList Name..."
                            className="border-2 rounded-md pl-4 w-[80%] focus:outline-none"
                            onChange={(e) => setInputVal(e.target.value)}
                            value={inputVal}
                            onKeyDown={(e) => {
                                e.key === "Enter" && handleCreatePlayList();
                            }}
                        />
                        <button
                            className="bg-green-400 px-4 py-1.5 font-bold hover:cursor-pointer rounded-lg"
                            onClick={() => handleCreatePlayList()}
                        >
                            Create
                        </button>
                    </div>
                    <div className="createPlaylist-list rounded-lg mt-4 max-h-34 border overflow-y-auto no-scrollbar ">
                        {songs.map((song, idx) => (
                            <div
                                key={idx}
                                className="flex px-2 py-2 justify-between items-center"
                            >
                                <div className="font-medium text-xl" key={idx}>
                                    {song.title}
                                </div>
                                <button
                                    className="bg-yellow-500 px-6 py-0.5 rounded cursor-pointer"
                                    onClick={() => handleAddToPlayList(song)}
                                >
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-90% bg-[#363636] mt-5 py-3 px-4 rounded-lg">
                    <div className="flex justify-between items-center">
                        <h2 className=" font-semibold text-2xl ">
                            Your PlayList
                        </h2>
                        <button
                            className="bg-red-400 px-4 py-1.5 font-bold hover:cursor-pointer rounded-lg"
                            onClick={() => {
                                handleDeletePLayList();
                            }}
                        >
                            Delete
                        </button>
                    </div>
                    <input
                        placeholder="Search PlayList ..."
                        className="border-2 rounded-md w-full text-md py-1 px-4 mt-3 focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="overflow-y-auto  no-scrollbar max-h-28 mt-2 ">
                        {filteredPlayLists.map((arr, idx) => (
                            <div
                                key={idx}
                                className={`border-2 mt-2 py-2 px-1.5 ${selectedPlaylistId == arr.id && "border-yellow-500 border-2"}`}
                                onClick={() => {
                                    setSelectedPlaylistId(arr.id);
                                }}
                            >
                                <div className="flex flex-row justify-between items-center bg-[#404040] rounded  py-2 px-2 ">
                                    <h2 className="flex gap-3 text-2xl font-bold">
                                        {arr.name}
                                    </h2>
                                    <button
                                        className="font-semibold bg-amber-400 px-6 py-0.5 rounded cursor-pointer"
                                        onClick={() =>
                                            handlePlayListPlay(
                                                arr.playListSongs,
                                            )
                                        }
                                    >
                                        Play
                                    </button>
                                </div>
                                <h3 className="text-xl mx-5 mt-2">
                                    {arr.playListSongs.length === 0 ? (
                                        <p className="ml-4 py-1 text-gray-400">
                                            No songs added
                                        </p>
                                    ) : (
                                        arr.playListSongs.map((e, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between mt-1"
                                            >
                                                <div className="flex items-center">
                                                    <GoDotFill />
                                                    <p>{e.title}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div>{e.duration}</div>
                                                    <button
                                                        className="text-sm font-semibold px-2 bg-red-400 rounded cursor-pointer"
                                                        onClick={() => {
                                                            handleRemoveFromPlayList(
                                                                arr,
                                                                e,
                                                            );
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlayListlist;
