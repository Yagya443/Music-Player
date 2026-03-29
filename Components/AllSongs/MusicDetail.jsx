import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaForwardFast, FaBackwardFast } from "react-icons/fa6";
import { FaPlay, FaPause } from "react-icons/fa";
import {
    setCurrentIndex,
    togglePlay,
    volumeStatus,
} from "../Store/playerSlice";

import { setCurrentSong } from "../Store/playListSlice";
import { IoMdVolumeOff, IoMdVolumeHigh } from "react-icons/io";

const MusicDetail = () => {
    const dispatch = useDispatch();
    const { isPlaying } = useSelector((state) => state.player);
    const mute = useSelector((state) => state.player.mute);
    const currentSong = useSelector((state) => state.playlist.currentSong);

    const { queue, currentIndex } = useSelector((state) => state.player);

    const [process, setProcess] = useState(0);
    const [volume, setVolume] = useState(50);
    const lastVolume = useRef(volume);
    const audioRef = useRef(null);

    function handlePrev() {
        if (currentIndex <= 0) return;

        const prevIndex = currentIndex - 1;

        if (process < 3) {
            dispatch(setCurrentSong(queue[prevIndex]));
            dispatch(setCurrentIndex(prevIndex));
        } else {
            setProcess(0);
            audioRef.current.currentTime = 0;

            dispatch(setCurrentSong(queue[prevIndex + 1]));
            dispatch(setCurrentIndex(prevIndex + 1));
        }
        console.log("prev");

    }

    function handleNext() {
        if (currentIndex >= queue.length - 1) return;

        const nextIndex = currentIndex + 1;
        dispatch(setCurrentSong(queue[nextIndex]));
        dispatch(setCurrentIndex(nextIndex));

        console.log("next");
        
    }

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            setProcess(Math.floor(audio.currentTime));
        };
        audio.addEventListener("timeupdate", updateProgress);
        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
        };
    }, [currentSong, isPlaying]);

    useEffect(() => {
        setProcess(0);
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
    }, [currentSong]);

    function durationInSeconds(time) {
        const splitTime = time.split(":");
        const [minutes, seconds] = splitTime;
        const totalTime = Number(minutes * 60) + Number(seconds);
        return totalTime;
    }

    function durationInMinutes(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        if (seconds <= 9) seconds = "0" + seconds;

        const exactTime = minutes + ":" + seconds;
        return exactTime;
    }

    useEffect(() => {
        if (!audioRef.current || !currentSong) return;

        if (isPlaying) {
            audioRef.current.play();
        }
    }, [currentSong]);

    useEffect(() => {
        if (!audioRef.current) return;

        if (currentSong && isPlaying) {
            audioRef.current.play();
        } else if (!isPlaying) {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <>
            <div className="musicRadioWrapper border-2 w-[45%] h-fit bg-[#2B2B2B] rounded-2xl min-h-48">
                {currentSong === null ? (
                    <p className="musicRadioInitialText text-center font-semibold text-4xl py-4 my-auto mt-15">
                        Select A Music
                    </p>
                ) : (
                    <div>
                        <h1 className="text-center text-5xl font-bold mt-5">
                            {currentSong.title}
                        </h1>
                        <h4 className="text-center text-lg mt-1 ">
                            {currentSong.artist}
                        </h4>
                        <div className="flex items-center justify-center mt-4 gap-2 ">
                            <p className="font-semibold">
                                {durationInMinutes(process)}
                            </p>
                            <audio
                                src={currentSong?.url}
                                ref={audioRef}
                                onEnded={handleNext}
                            ></audio>
                            <input
                                type="range"
                                className="w-[75%] accent-green-400 "
                                value={process}
                                min={0}
                                max={
                                    durationInSeconds(currentSong.duration) || 0
                                }
                                onChange={(e) => {
                                    const audio = audioRef.current;
                                    audio.currentTime = e.target.value;
                                    setProcess(e.target.value);
                                }}
                            />
                            <p className="font-semibold">
                                {currentSong.duration}
                            </p>
                        </div>

                        <div className="flex gap-7 items-center justify-center mt-6  ">
                            <FaBackwardFast
                                size={40}
                                className="cursor-pointer"
                                onClick={handlePrev}
                            />
                            <button
                                className="cursor-pointer"
                                onClick={() => {
                                    dispatch(togglePlay());
                                }}
                            >
                                {!isPlaying ? (
                                    <FaPlay size={45} />
                                    
                                ) : (
                                    <FaPause size={45} />
                                )}
                            </button>
                            <FaForwardFast
                                size={40}
                                className="cursor-pointer"
                                onClick={handleNext}
                            />
                        </div>
                        <div className="flex items-center gap-2 ml-3 mt-6 mb-4">
                            <button
                                onClick={() => {
                                    dispatch(volumeStatus());
                                    if (mute === false) {
                                        audioRef.current.muted = true;
                                        lastVolume.current = volume;
                                        setVolume(0);
                                    } else {
                                        audioRef.current.muted = false;
                                        setVolume(lastVolume.current);
                                    }
                                }}
                            >
                                {mute ? (
                                    <IoMdVolumeOff size={35} />
                                ) : (
                                    <IoMdVolumeHigh size={35} />
                                )}
                            </button>

                            <input
                                type="range"
                                className="w-[85%] accent-green-400 "
                                min={0}
                                max={100}
                                value={volume}
                                onChange={(e) => {
                                    const vol = Number(e.target.value);
                                    setVolume(vol);
                                    audioRef.current.volume = vol / 100;
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MusicDetail;
