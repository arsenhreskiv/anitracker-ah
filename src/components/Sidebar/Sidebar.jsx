import React from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/global';


export default function Sidebar({ topAnime }) {

    const top = topAnime.map(anime => (
					<a 
						href={anime.url} 
						target="_blank"
						key={anime.mal_id} 
						rel="noreferrer">
						{ anime.title_english }
					</a>
				))
    return (
        <aside>
			<nav>
				<h3>Top Anime</h3>
				{top}
			</nav>
		</aside>
    )
}