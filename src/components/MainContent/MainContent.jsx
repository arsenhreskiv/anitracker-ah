import React from 'react'
import AnimeCard from '../AnimeCard/AnimeCard';

export default function MainContent({
    HandleSearch,
    search,
    SetSearch,
    animeList, }) {
        const card = animeList.map(anime => (
					<AnimeCard
						anime={anime}
						key={anime.mal_id} />
				))
	return (
		<main>
			<div className="main-head">
				<form 
					className="search-box"
					onSubmit={HandleSearch}>
					<input 
						type="search"
						placeholder="Search for an anime..."
						required
						value={search}
						onChange={e => SetSearch(e.target.value)}/>
				</form>
                {card}
			</div>
		</main>
	)
}