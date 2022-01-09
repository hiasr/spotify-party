import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";

const scope = "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative";

export default NextAuth({
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
		async jwt({token, account}) {
			if (account) {
				token.accessToken = account.access_token;
				token.expires_at = account.expires_at;
			}
			return token
		},
		async session({ session, token, user }) {
			session.user = token;
			return session;
		}
	}
})

