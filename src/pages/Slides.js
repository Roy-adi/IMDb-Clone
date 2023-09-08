import React from 'react'
import Carousel from 'react-multi-carousel';
import './style.css'
import { Link } from 'react-router-dom';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};
const Slides = ({movies}) => {


    function formatReleaseDate(releaseDate) {
        const date = new Date(releaseDate);
        const options = { year: 'numeric', month: 'long' };
        return date.toLocaleDateString(undefined, options);
      }
  return (
    <Carousel
    swipeable={false}
    draggable={false}
    responsive={responsive}
    infinite={true}
    autoPlay={true}
    autoPlaySpeed={3000}
    keyBoardControl={true}
    showDots={false}
    slidesToSlide={1}
    containerClass="carousel-container"
    dotListClass="custom-dot-list-style"
    itemClass="carousel-item-padding-40-px"
>
    {
        movies.map(movie => (
            <>
            <div className="carousel-slide" key={movie.id}>
            <Link to={`/${movie.id}`} style={{textDecoration:'none'}}>
            <img className="slide-image" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.original_title} />
            <h4 className="title-text">{movie.original_title}</h4>
            </Link>

            <div className='releseDate slide-date'> 
            <h5>Release Date : </h5>
            <h5 className="movie-release">{formatReleaseDate(movie.release_date)}</h5> </div> 
        </div>
            </>
        ))
    }
</Carousel>
  )
}

export default Slides