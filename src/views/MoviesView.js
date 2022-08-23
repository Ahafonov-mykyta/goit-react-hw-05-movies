import { useState , useEffect} from "react"
import { useSearchParams, Link } from "react-router-dom"



export default function MoviesView(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [films, setFilms] = useState(null)

    let queryUrl = searchParams.get('search') || "";
    console.log(queryUrl);

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = e.target.search.value;
        setSearchParams ({search: query})
        queryUrl = query;
    }

    const fetchQueryFilm = () => {
        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=9c53a08914e6b4a1350a474be4bdfe14&language=en-US&query=${queryUrl}&page=1&include_adult=false`).then(
            (response) => {
              if (!response.ok) {
                throw new Error(response.status);
              }
              return response.json();
            }
          )
    }
          
    useEffect(()=>{

      if(queryUrl === ""){
        return;
    }
        fetchQueryFilm().then(data =>   setFilms(data.results)).catch((error) => console.log(error));
    }, [searchParams] )

    return (
        <div className="container">
        <h1 className="title">Search Movies</h1>
        <form onSubmit={handleSubmit}>
        <input type="search" name="search"/>
        <button type="submit">Search</button>
        </form>

        {films && films.length>0 
        ?<ul>
            {films.map(film => <li className="list__item" key={film.id}><Link className="list__link" to={`/movies/${film.id}`}>{film.title}</Link></li> )}
        </ul>
   
        : <></> }
        {
          films && films.length === 0?
          <h2>No films bruh</h2> 
          : <></> }
        
        </div>

        
    )

}