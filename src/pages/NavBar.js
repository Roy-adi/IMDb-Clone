import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { useSearch } from './SearchContext';

const NavBar = () => {

  const { searchQuery, updateSearchQuery } = useSearch();

  const handleSearchInputChange = (e) => { 
    updateSearchQuery(e.target.value);
  };
  

  return (
    <>
 <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img className="logo-img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/330px-IMDB_Logo_2016.svg.png" alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/popular" className="nav-link">
                Trending Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/toprated" className="nav-link">
                TopRated Movies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
  
  )
}

export default NavBar