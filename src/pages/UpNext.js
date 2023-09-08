import React from 'react'
import './style.css'

const UpNext = ({movies}) => {
  return (
    <>
    <div>
       {
        movies.splice(0, 3).map(movie=>(
          <div className="cards">
        <div className="card__image">
         { <img className='up-next-image' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}/> }
        </div>
        <div className="card__copy"> 
         { <h4> {movie.original_title} </h4> }
        </div>
      </div>
        ))
       }
    </div>

    </>
  )
}

export default UpNext