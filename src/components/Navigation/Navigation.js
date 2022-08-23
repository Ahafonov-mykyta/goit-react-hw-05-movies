import {NavLink} from 'react-router-dom'


export default function Navigation(){
    
    return (
        <nav>
            <ul className='menu'>
                <li><NavLink className='menu__item'  to="/">Home</NavLink></li>
                <li ><NavLink className='menu__item' to="movies">Movies</NavLink></li>
            </ul>
        </nav>
    )

}