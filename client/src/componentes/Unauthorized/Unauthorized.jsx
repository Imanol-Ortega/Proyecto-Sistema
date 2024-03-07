/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"

function Unauthorized() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="text-6xl font-extrabold text-white tracking-widest">No Autorizado</h1>
        <div className="bg-[#FF6A3D] px-2 text-lg rounded rotate-12 absolute">Not authorized</div>
        <Link to="/login" className="mt-5">
            <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>
            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                Ir al Login
            </span>
            </a>
        </Link>
    </div>
  )
}

export default Unauthorized