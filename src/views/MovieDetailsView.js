import { Link,Route, Routes, useParams,useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import CastView from "./CastView";
import Reviews from "./Reviews";


export default function MovieDetailsView(){
    const navigate = useNavigate()
    const [film, setFilm] = useState("")
    const {filmId} = useParams()


    const fetchFilmDetails = () => {
        return fetch(`https://api.themoviedb.org/3/movie/${filmId}?api_key=9c53a08914e6b4a1350a474be4bdfe14&language=en-US`).then(
            (response) => {
              if (!response.ok) {
                throw new Error(response.status);
              }
              return response.json();
            }
          )
    }
          
    useEffect(()=>{
        fetchFilmDetails().then(data =>  {console.log(data);setFilm(data)}).catch((error) => console.log(error));
    }, [] )
    

    const goBack = () => navigate(-1)
    return (
        <>
            <button onClick={goBack} type="button">Go back</button>
        <div className="film__container">
            {film 
            ?<>
            <img className="film__image" src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} alt={film.name || film.title}></img>
            <h1 className="film__title">{film.name || film.title} ({film.release_date.slice(0,4)})</h1>
            <p className="film__decr">User score: {Math.round(film.vote_average*10)}%</p>
            <h2 className="film__title">Overview</h2>
            <p className="film__decr">{film.overview}</p>
            <h3 className="film__title">Genres</h3>
            <p className="film__decr">{film.genres.map(genre => `${genre.name} `)}</p>
            </>
            : <h1>Sorry, film is not found</h1>}
           
        </div> 
            <ul className="film__container"> 
            <li><Link className="film__title" to={`/movies/${filmId}/cast`}>Cast</Link></li>
            <li><Link className="film__title" to={`/movies/${filmId}/reviews`}>Reviews</Link></li>
            </ul>
            <Routes>
                <Route path="cast" element={<CastView/>} />
                <Route path="reviews" element={<Reviews/>} />
            </Routes> 
        </>
        
            )
        
}