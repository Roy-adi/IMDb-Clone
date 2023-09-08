import React, { useState, useEffect } from 'react';
import './HeroBanner.css';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../Store/SearchSlice';
import { IoMdClose } from 'react-icons/io';

const HeroBanner = ({ movies, category }) => {
  const searchQuery = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const handleSearchInputChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClearInput = () => {
    dispatch(setSearchQuery(''));
  };

  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];

    const imageUrl = randomMovie
      ? `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
      : '';

    setBackgroundImage(imageUrl);
  }, [movies]);

  return (
    <div className="container-fluid" style={{padding:'20px 0'}}>
      <div
        className="HeroSection"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="heroBannerContent">
              <span className="title">IMDb {category} </span>
              <span className="subTitle d-block">
                Millions of movies, and people to discover. Explore now.
              </span>
              <div className="searchInput">
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Search for a movie or TV show...."
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  {searchQuery && (
                    <span className="clearIcon" onClick={handleClearInput}>
                      <IoMdClose />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
