import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import AllSongs from "../Components/AllSongs/AllSongs";
import MusicDetail from "../Components/AllSongs/MusicDetail";
import PlayList from "../Components/PlayList/PlayList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";


function App() {
    return (
        <div className="min-h-screen bg-[rgb(19,19,19)] flex flex-col items-center pt-[5%] ">
            <div className="main h-[75%] w-[55%] rounded-2xl">
                <NavBar />
              <div className="wrapper gap-10 flex justify-between gap pt-10 text-white ">
                <MusicDetail />
                <Routes>
                    <Route path="/" element={<AllSongs />} />
                    <Route path="/playlist" element={<PlayList />} />
                </Routes>
              </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default App;
