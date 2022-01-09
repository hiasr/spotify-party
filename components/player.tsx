export default function Player({ currentTrack }) {
	return (
		<div className="flex flex-col items-center justify-center space-y-4 h-screen">
			<img 
				src={currentTrack.album.image.url} 
				width={currentTrack.album.image.width} 
				height={currentTrack.album.image.height}
				className="w-1/4"
				alt={currentTrack.name}/>
			<span className="text-4xl font-semibold">{currentTrack.name}</span>
			<span className="text-slate-500 italic">{currentTrack.artists[0].name}</span>
		</div>
	)
}
