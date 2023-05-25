import React from 'react'
import { Link } from 'react-router-dom'
import '../../index.css'


export default function AnimeCard({ anime, addToWatchlist }) {

	return (
		<>
			<Link 
				to={`/anime/${anime.mal_id}`} 
				rel="noreferrer">
				<figure>
					<img 
						src={anime.images.jpg.image_url} 
						alt="Anime Image" />
				</figure>
				<h3>{ anime.title_english }</h3>
			</Link>
		</>
	)
}