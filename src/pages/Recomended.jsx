import './style.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import './style.css';
import { Link } from 'react-router-dom';

const Recomended = () => {
    const responsive = {
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };
    const { id } = useParams();
    const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';
    const SMILER_API = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`;
    const [movies, setMovies] = useState([]); // Fix the destructuring here

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const smilerMovies = await axios.get(SMILER_API);
                setMovies(smilerMovies.data.results); // Assuming `results` contains an array of movies
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [SMILER_API]);

    function formatReleaseDate(releaseDate) {
        const date = new Date(releaseDate);
        const options = { year: 'numeric', month: 'long' };
        return date.toLocaleDateString(undefined, options);
      }

    return (
        <div className='container'>
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
                {movies.map((movie) => (
                    <div className="carousel-slide" key={movie.id}>
                    <div className="image-container">
                    <Link to={`/${movie.id}`}>
                    <img
                    className="slide-image"
                    src={movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                        : 'https://img.freepik.com/free-psd/girl-character-with-404-error_23-2149838727.jpg?size=626&ext=jpg&ga=GA1.1.1457208155.1693933855&semt=aiss'}
                    alt={movie.original_title}
                    style={{ maxWidth: '100%', maxHeight: '400px', height: 'auto' }}
                />
                </Link>
                </div>
                        <h4 className="title-text">{movie.original_title}</h4>
                        <div className='releseDate'> 
                        <h5>Release Date : </h5>
                        <h5 className="movie-release">{formatReleaseDate(movie.release_date)}</h5> </div> 
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Recomended;
