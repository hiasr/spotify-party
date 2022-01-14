import {useRouter} from 'next/router'
import {useContext} from 'react'
import { useSession, signIn} from "next-auth/react"

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full flex-col bg-zinc-800 min-h-screen">
      <CreateParty/>
      <div className="w-1/2 h-0 border-t border-white m-2"/>
      <JoinParty/>
    </div>
  )
}

function CreateParty() {
  const router = useRouter();

  const handleLogin = () => {
    signIn("spotify", { callbackUrl: "http://localhost:3000"});
  }

  return (
    <div className="border-white flex flex-col items-center justify-center m-2">
      <h2 className="text-2xl font-bold text-white">Create New Party</h2>
      <button onClick={handleLogin} className= 'text-white font-medium bg-green-600  rounded-full p-3 m-4'>Log in with Spotify</button>
    </div>
  )
}


function JoinParty() {
  const registerUser = event => {
    event.preventDefault()
  }

  return (
    <form className="border-white flex flex-col items-center justify-center m-2" onSubmit={registerUser}>
      <h2 className="text-2xl font-bold text-white">Join Existing Party</h2>
      <input id="code" className='rounded-full m-4 placeholder-gray-600 border-white' placeholder='Enter code' type="text" autoComplete="code" required />
      <button type="submit" className= ' text-white font-medium bg-green-600  rounded-full p-3'>Join Party!</button>
    </form>
  )
}