import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Slides from './Slides';
import MoviePoster from './MoviePoster';

const Banner = ({ movies }) => {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  // Shuffle array utility function
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const shuffledMovies = shuffleArray(movies);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-7'>
          <div className='left-side'>
            <Carousel       swipeable={false}
            draggable={false}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            showDots={false}
            slidesToSlide={1}
            containerClass="react-multi-carousel-list"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px">
              {shuffledMovies.map((movie) => (
                <img
                  key={movie.id}
                  className='banner-image'
                  src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                  alt='banner'
                />
              ))}
            </Carousel>
          </div>
        </div>
        <div className='col-md-5'>
        <h4>Up-Next</h4>
          <div className='right-side'>
           
            {shuffledMovies.slice(0, 3).map((movie) => (
              <div className='cards' key={movie.id}>
                <div className='card__image'>
                  <img
                    className='up-next-image'
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.original_title}
                  />
                </div>
                <div className='card__copy'>
                  <h4 className='title_text'>{movie.original_title}</h4>
                  <h4 className='title_text'>{movie.release_date}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className='slider'>
        
        </div>
        
      </div>
    </div>
  );
};

export default Banner;
