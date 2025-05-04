import React, {useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import Lenis from '@studio-freight/lenis';
import { Link } from 'react-router-dom';



const TitleCards = ({title, category}) => {
  

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const lenisRef = useRef();


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDA2NzRlNjdlYTAzMmFlYTFhNmU5NjFlYmNjNGU4MyIsIm5iZiI6MTc0NjA3ODY1Ny4wMjQsInN1YiI6IjY4MTMwYmMxNjlhZTQ3MjBiYjVlNzA0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GV8a_Z1UieUmVSHqEZCYrEmuS_EcxCTpgMnGZZLtRsI'
    }
  };
  


  const handleWheel = (event) =>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }
  



useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));


  cardsRef.current.addEventListener('wheel', handleWheel);
}, [])


 useEffect(() => {
  const lenis = new Lenis({
    wrapper: cardsRef.current,   // 👈 Target your card-list div!
    content: cardsRef.current,   // 👈 Content is also your card-list
    wheelMultiplier: 1,          // 👈 Control speed
    smoothWheel: true,
    smoothTouch: true,
    orientation: 'horizontal',   // 👈 IMPORTANT: horizontal scroll
  });

  lenisRef.current = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return () => {
    lenis.destroy();  // Cleanup
  };
}, []); 

  return (
    <div className='title-cards'>
          <h2>{title? title: "Popular on Netflix"} </h2>
          <div className="card-list" ref={cardsRef}>
              {apiData.map((card, index) => {
                  return <Link to={`/player/${card.id}`} className="card" key={index}>
                       <img src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path} alt="" />
                       <p>{card.original_title}</p>
                  </Link>
              })}
          </div>
    </div>
  )
}

export default TitleCards