import { useAuth } from "../../contexto/AuthProvider"

function Profile() {
    const {user, logout } = useAuth();
    return (
    <div className="bg-zinc-800 text-blue-50 h-full w-full flex justify-center align-middle">
      <div className="container mx-auto flex flex-1 justify-center items-center">
        <div className="w-full max-w-4xl">
          <div className="leading-loose">
            <h1 className="text-2xl  text-white ">PERFIL</h1>
            <h1>!Hola {user.username}</h1>
            <button type="button"  className=" mt-20 align-middle px-4 py-1 text-white font-light tracking-wider bg-gray-600 hover:bg-gray-400 rounded" onClick={()=>logout()}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile