import React from 'react'
import { Link } from 'react-router-dom';
import './Sidebar.css'


export default function Sidebar({ topAnime }) {

    const top = topAnime.map(anime => (
					<Link 
						to={`/anime/${anime.mal_id}`} 
						key={anime.mal_id} 
						rel="noreferrer">
						{ anime.title_english }
					</Link>
				))
    return (
        <aside className='aside'>
			<nav>
				<h3>Top Anime</h3>
				{top}
			</nav>
		</aside>
    )
}