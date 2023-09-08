import './App.css';
import Home from './pages/Home';
import { BrowserRouter ,Routes,Route } from 'react-router-dom'

import Popular from './pages/Popular';
import MovieDetails from './pages/MovieDetails';
import NavBar from './pages/NavBar';
import { SearchProvider } from './pages/SearchContext';
import Footer from './pages/Footer';
import UpComing from './pages/UpComing';
import './pages/responsive.css'

function App() {

  

  return (
    <>
       <BrowserRouter>
       <SearchProvider>
       <NavBar/>
         <Routes>
           <Route path='/'  element={<Home/>} />
           <Route path='/popular' element={<Popular/>}/>
           <Route path='/toprated' element={<UpComing/>} />
           <Route path='/:id' element={<MovieDetails />} />
         </Routes>
         <Footer/>
         </SearchProvider>
        </BrowserRouter>
        </>
  );
}

export default App;
