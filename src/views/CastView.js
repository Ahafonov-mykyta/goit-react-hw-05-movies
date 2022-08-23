import { useEffect, useState } from "react"
import { useParams} from "react-router-dom"

export default function CastView(){
    
    const [cast, setCast] = useState(null)
    const {filmId} = useParams()
    console.log(filmId);


    const fetchCast = () => {
        return fetch(`https://api.themoviedb.org/3/movie/${filmId}/credits?api_key=9c53a08914e6b4a1350a474be4bdfe14&language=en-US`).then(
            (response) => {
              if (!response.ok) {
                throw new Error(response.status);
              }
              return response.json();
            }
          )
    }
   
        

       
    useEffect(()=>{
        fetchCast().then(data =>  {console.log(data);setCast(data.cast)}).catch((error) => console.log(error));
    }, [] )

    return (
        
        <ul className="film__container">
          
        {cast 
        ? cast.map(actor => 
        <li className="cast__item" key={actor.cast_id}>
            <img className="cast__image" src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}/>
            <h2 className="film__title"> {actor.name}</h2>
            <p className="film__decr">{actor.character}</p>
        </li>)
        :<h2>Sorry, cast is not found</h2>}
        </ul>
        
        
    )
            }