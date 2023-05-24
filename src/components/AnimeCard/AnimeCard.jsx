import React from 'react'
import { Link } from 'react-router-dom'

export default function AnimeCard({ anime }) {
	return (
		<>
			<Link 
				to={anime.url} 
				target="_blank" 
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