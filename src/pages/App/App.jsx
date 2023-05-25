import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import NavBar from '../../components/NavBar/NavBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import AnimeDetailPage from '../AnimeDetailPage/AnimeDetailPage';
import MainContent from '../../components/MainContent/MainContent';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [animeList, SetAnimeList] = useState([]);
	const [topAnime, SetTopAnime] = useState([]);
	const [search, SetSearch] = useState("");

	const GetTopAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity&sort=asc&limit=10?sfw`)
			.then(res => res.json());

    console.log(temp.data)
		SetTopAnime(temp.data);
    console.log('hello there', topAnime)
	}
  

	const HandleSearch = e => {
		e.preventDefault();

		FetchAnime(search);
	}

	const FetchAnime = async (query) => {
		const temp = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&order_by=bypopularity&sort=asc&limit=10?sfw`)
			.then(res => res.json());

    console.log('Hello', temp.data)
		SetAnimeList(temp.data);
    console.log("welcome", animeList)
	}

	useEffect(() => {
		GetTopAnime();
	}, []);

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Sidebar topAnime={topAnime} />
            <Routes>
              {/* Route components in here */}
              {/* <Route path="/" element={<AnimeListPage />} */}
              <Route path="/" element={<MainContent
                  HandleSearch={HandleSearch}
                  search={search}
                  SetSearch={SetSearch}
                  animeList={animeList} />} />
              <Route path="/anime/:id" element={<AnimeDetailPage />} />
              <Route path="/profile/" element={<ProfilePage />} />
              
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
