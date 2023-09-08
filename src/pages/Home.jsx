import React from 'react'
import NavBar from './NavBar'
import { useEffect, useState } from 'react'
import { NOWPLAYING_API_URL } from '../constants/AllApi'
import {getCategoryMovies} from '../service/api'
import Banner from './Banner'
import Slides from './Slides'
import MoviePoster from './MoviePoster'
import HeroBanner from './HeroBanner'

const Home = () => {
   
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const getData = async () => {
            
            let response = await getCategoryMovies(NOWPLAYING_API_URL);
            
            setMovies(response.results);   
           
        }
        getData();
      
    }, [])



  return (
    <>
    <HeroBanner movies={movies}/>
    <h4 className='tending'>Trending Movies </h4>
    <MoviePoster/>
    <div className='sliding'>
    <h4 className='sliders'>Now Playing Movies </h4>
    <Slides movies={movies} />
    </div>
    </>
  )
}

export default Home