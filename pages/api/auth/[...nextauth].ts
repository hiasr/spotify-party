import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import { connectToDatabase } from "../../../lib/mongodb"
const axios = require('axios');

const scope = "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative";

async function refreshAccessToken(token) {
	console.log("Refreshing access token...")
	try {
		await axios.post('https://accounts.spotify.com/api/token', null,
			{
				params: {
					'grant_type': 'refresh_token',
					'refresh_token': token.refreshToken,
				},
				headers: {
					'Authorization': 'Basic ' + new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'),
					'Content-Type': 'application/x-www-form-urlencoded',
				}
			}
		).then((response) => {
			console.log("Succesfully refreshed access token")
			token.accessToken = response.data.access_token
			token.expiresAt = Date.now() + response.data.expires_in * 1000
		})
	}
	catch (error) {
		console.log("Error while refreshing access token")
		console.log(error);
	}
	return token
};

export default NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			authorization: {
				params: { scope },
			}
		})
	],

	callbacks: {
		async jwt({token, user, account}) {
			if (account && user) {
				token.accessToken = account.access_token
				token.expiresAt = account.expires_at*1000
				token.refreshToken = account.refresh_token
				token.user = user

				const { db } = await connectToDatabase();
				const user_db = await db.collection("users")
					.findOne({"user.id": user.id})

				if (!user_db) {
					db.collection("users").insertOne(token)
				} else {
					db.collection("users").replaceOne({"user.id": user.id}, token)
				}

				return token
			}

			if (Date.now() < token.expiresAt) {
				return token
			}

			return refreshAccessToken(token)
		},

		async session({ session, token}) {
			session.user = token.user
			session.accessToken = token.accessToken
			session.expiresAt = token.expiresAt
			session.error = token.error

			return session
		}
	},
})
