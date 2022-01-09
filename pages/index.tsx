import Player from "../components/player"
import { getSession } from "next-auth/react"
import { GetServerSideProps } from "next";
import { getCurrentTrack, isAuthenticated } from "../lib/spotify";
import firebase from "../firebase/clientApp"
import { useCollection } from "react-firebase-hooks/firestore"

export default function Home({ currentTrack }) {
	const [users, postsloading, postserror] = useCollection(
		firebase.firestore().collection("posts"),
		{}
	  );

	return(
		<div className="bg-zinc-800 min-h-screen min-w-screen text-white">
			<Player currentTrack={currentTrack}/>
		</div>
	)
}



export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	if (!isAuthenticated(session)) {
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