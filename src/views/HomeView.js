import { useEffect, useState } from "react"
import { Link } from "react-router-dom"




export default function HomeView(){
    
    const [films, setFilms] = useState(null)

    const fetchTrendingFilms = () => {
        return fetch('https://api.themoviedb.org/3/trending/all/day?api_key=9c53a08914e6b4a1350a474be4bdfe14').then( res => res.json())
    }

    useEffect(()=>{
        fetchTrendingFilms().then(data => {console.log(data);return setFilms(data.results)})
    }, [] )

    return (
        
        <div className="container">
        <h1 className="title">Trending Films</h1>
        <ul>
            {films && films.map(film => <li className="list__item" key={film.id}>
               <Link className="list__link" to={`/movies/${film.id}`}> {film.name || film.title}</Link>
            </li> )}
        </ul>
        </div>
        
        
    )

}