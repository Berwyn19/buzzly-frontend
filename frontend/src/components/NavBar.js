import { Video } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
    return (
        <div className="flex flex-row justify-between bg-white px-4 py-4 border-b-solid border-b-2">
            {/* Logo */}
            <NavLink to="/" className="flex flex-row items-center gap-4">
                <Video className="text-white bg-emerald-600 px-2 py-2 rounded-lg" size={36}/>
                <span className="text-black font-bold">BuzzlyAI</span>
            </NavLink>
            {/* Links */}
            <div className="flex flex-row gap-8 items-center mr-10">
                <NavLink
                    to="/form"
                    className={({ isActive }) =>
                        isActive ? "text-emerald-600 font-bold" : "text-slate-700 font-bold"
                    }
                >
                    Create
                </NavLink>
                <NavLink
                    to="/library"
                    className={({ isActive }) =>
                        isActive ? "text-emerald-600 font-bold" : "text-slate-700 font-bold"
                    }
                >
                    Library
                </NavLink>
            </div>
        </div>
    );
}
