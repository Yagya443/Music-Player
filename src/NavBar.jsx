import { NavLink } from "react-router-dom";
import { FaMusic } from "react-icons/fa";

const NavBar = () => {
    return (
        <div className="flex justify-between items-center border-2 py-2 px-4 rounded-2xl text-white bg-[#2B2B2B]">
            <NavLink to="/" reloadDocument>
                <div className="text-3xl flex items-center gap-2 text-green-500 font-semibold">
                    <FaMusic /> Music Player
                </div>
            </NavLink>

            <div className="flex gap-2 text-lg ">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `hover:bg-[#4d4444] px-4 rounded py-1 ${isActive ? "font-bold" : "font-semibold"}`
                    }
                >
                    All Songs
                </NavLink>
                <NavLink
                    to="/playlist"
                    className={({ isActive }) =>
                        `hover:bg-[#4d4444] px-4 rounded py-1 ${isActive ? "font-bold" : "font-semibold"}`
                    }
                >
                    Playlist
                </NavLink>
            </div>
        </div>
    );
};

export default NavBar;
