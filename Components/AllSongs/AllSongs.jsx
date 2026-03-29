import { FaMusic, FaPause } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setIsPlaying, togglePlay } from "../Store/playerSlice";
import { setCurrentSong } from "../Store/playListSlice";


const AllSongList = () => {
    const dispatch = useDispatch();
    const songDetail = useSelector((state) => state.playlist.songs);
    const currentSong = useSelector((state) => state.playlist.currentSong);
    const isPlaying = useSelector((state) => state.player.isPlaying);

    const handleSongClick = (song) => {
        if (currentSong && currentSong.id === song.id) {
            dispatch(togglePlay());
        } else {
            dispatch(setCurrentSong(song));
            dispatch(setIsPlaying(true));
        }
    };

    return (
        <>
            <div className="allSongWrapper border-2 rounded-2xl w-108 max-h-112 overflow-y-auto no-scrollbar bg-[#2B2B2B] px-4 font-semibold">
                <h1 className="text-3xl font-semibold text-center mt-4">
                    All Songs({songDetail.length})
                </h1>

                {songDetail.map((song, idx) => (
                    <div
                        className={`px-4 py-1 border my-4 rounded cursor-pointer ${currentSong && currentSong.id === idx + 1 && "bg-[#8bffcb90] border-2 border-[#04f589d0]"} `}
                        key={idx}
                        onClick={() => handleSongClick(song)}
                    >
                        <h1>{song.title}</h1>
                        <div className="flex justify-between items-center">
                            <h2>{song.artist}</h2>
                            {currentSong && currentSong.id === idx + 1 && isPlaying ? (
                                <FaPause />
                            ) : (
                                <FaMusic />
                            )}
                        </div>
                        <p>{song.duration}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AllSongList;
