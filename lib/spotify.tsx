import { Track, Artist, Album } from '../types/types'

const axios = require('axios')
const base_url = "https://api.spotify.com/v1"

export function isAuthenticated(session) {
	return (session.user.accessToken && session.user.expires_at * 1000 > Date.now())
}

export async function getCurrentTrack(session) {
	const url = base_url + "/me/player/currently-playing"
	const config = {
		headers: {
			Authorization: "Bearer " + session.user.accessToken,
			'Content-Type': "application/json"
		}
	}
	const response = await axios.get(url, config)
	const data = response.data;

	const album: Album = {
		id: data.item.album.id,
		name: data.item.album.name,
		image: data.item.album.images[0],
	};

	const artists: Artist[] = data.item.artists.map((item) => {
		return {
			name: item.name,
			id: item.id,
		}
	});

	const track: Track = {
		id: data.item.id,
		name: data.item.name,
		artists: artists,
		album: album,
	}

	return track;
}
