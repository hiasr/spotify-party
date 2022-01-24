import Player from "../components/player"
import { getSession, signOut } from "next-auth/react"
import Script from "next/script"
import { GetServerSideProps } from "next";
import { getCurrentTrack, isAuthenticated } from "../lib/spotify";

export default function Home({ currentTrack }) {

		
	}
	return(
		<div className="bg-zinc-800 min-h-screen min-w-screen text-white">
			<Script src="https://sdk.scdn.co/spotify-player.js"/>
			<Player currentTrack={currentTrack}/>
		</div>
	)
}



export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	if (!session || !isAuthenticated(session)) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		}
	}

	const currentTrack = await getCurrentTrack(session);
	return {
		props: {currentTrack}
	}
} 