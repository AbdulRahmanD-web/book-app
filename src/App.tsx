import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {  useState, useEffect} from 'react';
import './App.css';
import Home from '../pages/Home.tsx';
import Books from '../pages/Books.tsx'
import Favorites from '../pages/Favorites.tsx'
import About from '../pages/About.tsx'


function App() {     
  
    let [isMenuOpen, setIsMenuOpen] = useState(false);
  let toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  let closeMenu = () => setIsMenuOpen(false) 


    useEffect(() =>{
    if(isMenuOpen){
      document.body.classList.add('no-scroll')
    }else{
      document.body.classList.remove('no-scroll')
    }
  }, [isMenuOpen]);

  return (
    <BrowserRouter>
    
      <header className="header">
        <nav className="nav">
          <div className="nav_logo">
            <h1 className='nav_logo__title'>Book-App</h1>
          </div>
          <ul className="nav-links">
            <li><Link className="links" to="/">Главная</Link></li>
            <li><Link className="links" to="/books">Книги</Link></li>
            <li><Link className="links" to="/favorites">Избранное</Link></li>
            <li><Link className="links" to="/about">Об авторе</Link></li>
          </ul>
          <div className="nav_buttons">
          <a href="https://t.me/AbdulRahmanD_web" className="nav_btn" target="_blank" rel="noopener noreferrer">Telegram</a>
       <button className={`burger ${isMenuOpen ? 'active' : ''}`}  onClick={toggleMenu}>
        <span ></span>
        <span ></span>
        <span ></span>
    </button>
    </div>
        </nav>
     </header>

 
   <div  className={`menu ${isMenuOpen ? 'active' : ''}`}>
    <div className="mobile_menu_inner">
     <div className="mobile_nav">
    <Link className='link' to="/" onClick={closeMenu} >Главная</Link>
    <Link className='link' to="/books"onClick={closeMenu} >Книги</Link>
    <Link className='link' to="/favorites" onClick={closeMenu}>Избранное</Link>
    <Link className='link' to="/about" onClick={closeMenu}>Об авторе</Link>
            <div className="mobile_btn">
          <a href="https://t.me/AbdulRahmanD_web" className="btn" target="_blank" rel="noopener noreferrer">Telegram</a>
        </div>
     </div>
    </div>
    </div>

      <main className="main">
        
        <Routes>
          <Route path="/" element={
            <Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
        </Routes> 
      </main>

      <footer className='footer'>
  <div className="footer-inner">
    <span className='footer-span'>© <span id="year">2026</span> Future Tech · Издание первое</span>
    <div className="socials" aria-label="Социальные сети">
      <a href="#" className='social_link' aria-label="Telegram">Telegram</a>
      <a href="#" className='social_link' aria-label="GitHub">GitHub</a>
    </div>
  </div>
</footer>

    </BrowserRouter>
    
  );
}

export default App;