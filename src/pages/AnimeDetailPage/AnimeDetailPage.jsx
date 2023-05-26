import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as animeAPI from '../../utilities/anime-api'
import Comment from '../../components/Comment/Comment'
import './AnimeDetailPage.css'


export default function AnimeDetailPage({ addToWatchlist }) {
    const {id} = useParams()
    console.log(`${id}`)
    //state
    const [anime, setAnime] = useState({})
    const [characters, setCharacters] = useState([])
    const [showMore, setShowMore] = useState(false)
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');

    useEffect(() => {
        console.log('useEffect Running')
        async function animeDetail() {

            console.log('Naruto')
            const details =  await fetch(`https://api.jikan.moe/v4/anime/${id}`)
            const data = await details.json()
            setAnime(data.data)
        }
    animeDetail()
    }, [id])

    useEffect(() => {
        // Load comments from local storage on component mount
        const storedComments = localStorage.getItem('comments');
        if (storedComments) {
          setComments(JSON.parse(storedComments));
        }
      }, []);

    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments]);
    console.log(anime)
    //destructure anime
    const {
        title, synopsis, 
        trailer,duration,aired, 
        season, images, rank, 
        score,scored_by, popularity, 
        status, rating, source } = anime
    

    const handleAddToWatchlist = () => {
        const animeToAdd = {
            id: anime.mal_id,
            title: anime.title,
            };
        
            addToWatchlist(animeToAdd);
          };
    
    const addComment = (content) => {
        const newComment = { id: Date.now(), content };
        setComments((prevComments) => [...prevComments, newComment]);
        setCommentContent('');
    };
        
    const handleCommentChange = (e) => {
        setCommentContent(e.target.value);
    };
        
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        addComment(commentContent);
    };
        
    return (
        <>
        
            <h1>{title}</h1>
            <div className="details">
                <div className="detail">
                    <div className="image">
                        <img src={images?.jpg.large_image_url} alt="" />
                    </div>
                    <div className="anime-details">
                        <p><span>Aired:</span><span>{aired?.string}</span></p>
                        <p><span>Rating:</span><span>{rating}</span></p>
                        <p><span>Rank:</span><span>{rank}</span></p>
                        <p><span>Score:</span><span>{score}</span></p>
                        <p><span>Scored By:</span><span>{scored_by}</span></p>
                        <p><span>Popularity:</span><span>{popularity}</span></p>
                        <p><span>Status:</span><span>{status}</span></p>
                        <p><span>Source:</span><span>{source}</span></p>
                        <p><span>Season:</span><span>{season}</span></p>
                        <p><span>Duration:</span><span>{duration}</span></p>
                    </div>
                </div>
            </div>
                <p className="description">
                    {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
                    
                </p>
                    <button className="read-more-button" onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Show Less' : 'Read More'}
                    </button>
           
            <h3 className="title">Trailer</h3>
            <div className="trailer-con">
                {trailer?.embed_url ? 
                    <iframe 
                        src={trailer?.embed_url} 
                        title="Inline Frame Example"
                        width="800"
                        height="450"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe> :
                    <h3>Trailer not available</h3>
                }
            </div>
            <div>
                <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
            </div>   
            <div className="comment-section">
                <h3>Comments</h3>
                {comments.length === 0 ? (
                <p>No comments yet.</p>
                ) : (
                comments.map((comment) => (
                    <Comment key={comment.id} content={comment.content} />
                ))
                )}
            </div>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
            <input
                type="text"
                placeholder="Add a comment..."
                value={commentContent}
                onChange={handleCommentChange}
                className="comment-input"
                />
            <button type="submit" className="comment-submit-button">
                Submit
            </button>
            </form>
        </>
    )
}