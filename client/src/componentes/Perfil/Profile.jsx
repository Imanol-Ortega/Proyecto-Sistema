import { useAuth } from "../../contexto/AuthProvider"

function Profile() {
    const {user, logout } = useAuth();
    return (
    <div className="bg-zinc-800 text-blue-50 h-screen w-full">
      HOLAAA
        <h1>!Hi {user.username}</h1>
        <button type="submit"  className="align-middle px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded" onClick={()=>logout()}>Logout</button>
    </div>
  )
}

export default Profile