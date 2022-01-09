export interface Track{
	id: string;
	name: string;
	artists: Artist[];
	album: Album;
}

export interface Artist{
	id: string;
	name: string;
}

export interface Album{
	id: string;
	name: string;
	image: Image;
}

interface Image{
	url: string;
	width: number;
	height: number
}