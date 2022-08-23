import { useEffect, useState } from "react"
import { useParams} from "react-router-dom"

export default function Reviews(){
    
    const [reviews, setReviews] = useState(null)
    const {filmId} = useParams()
  

    const fetchReview = () => {
        return fetch(`https://api.themoviedb.org/3/movie/${filmId}/reviews?api_key=9c53a08914e6b4a1350a474be4bdfe14&language=en-US&page=1`).then(
            (response) => {
              if (!response.ok) {
                throw new Error(response.status);
              }
              return response.json();
            }
          )
    }
   
       
    useEffect(()=>{
        fetchReview().then(data =>  {console.log(data);setReviews(data.results)}).catch((error) => console.log(error));
    }, [] )

    return (
        
        <ul className="film__container">
        {reviews &&  reviews.length>0
        ? reviews.map(review => 
        <li className="list__item" key={review.id}>
            <h2 className="film__title">Author: {review.author}</h2>
            <p className="film__descr">{review.content}</p>
        </li>)
        :<h2>Sorry, reviews are not found</h2>}
        </ul>
        
        
    )
            }