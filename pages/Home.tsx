import './Home.css'


function Home() { 
  return (
    <>
    <section className="hero reveal">
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero-badge">
            <span className="pulse" aria-hidden="true"></span>Светлый режим</div>
          <h1 className="hero__title">
             Книги. Порядок. Память. <br />
            <span className="hero__highlight"></span>
          </h1>
          <p className="hero__description">
           Простое место для твоих книг: читай, оценивай, храни.
          </p>
          <div className="hero-ornament"><span className='hero-ornament-span'>❈ ❖ ❈</span></div>
        </div>
        <div className="hero__stats">      
          <div className='hero-actions'>
        <a className="hero-btn button-gold" href="\books">Начать</a>
        <a className="hero-btn" href="\favorites">Избранное</a>
      </div>
        </div>
     </div>
    </section>
        
        
  <section className="flip__hero reveal"> 
   <div className="flip_hero__container  reveal">
   

    <div className="flip__principles reveal">
       <h2 className="flip--title">Что такое Book-App?</h2>
       <div className='flip__grid '>
        
        <div className='flip-card'>
          <div className="flip-card__inner">
            <div className="flip-card__front">
       <span className="flip-icon">1.</span>
        <h4 className="flip-title">Что такое?</h4>
            </div>
            <div className="flip-card__back">
              <h4>Book-App — приложение для тех, кто читает. 
                Добавляй прочитанные и желаемые книги, храни избранное как на книжной полке и получай топ-5 рекомендаций от автора.</h4> 
            </div>
          </div>
          </div> 
                  <div className='flip-card'>
          <div className="flip-card__inner">
            <div className="flip-card__front">
       <span className="flip-icon">2.</span>
        <h4 className="flip-title">Как с ним работать?</h4>
            </div>
            <div className="flip-card__back">
              <h4>Нажми «Начать» на главной — и попадёшь на страницу «Книги». 
                Там добавляй книги, ставь оценки и отмечай избранное.</h4> 
            </div>
          </div>
          </div> 
                  <div className='flip-card'>
          <div className="flip-card__inner">
            <div className="flip-card__front">
       <span className="flip-icon">3.</span>
        <h4 className="flip-title">Какие технологии?</h4>
            </div>
            <div className="flip-card__back">
              <h4>React, TypeScript, React Router. Современный интерфейс с тёмной темой, адаптивом и анимациями.</h4> 
            </div>
          </div>
          </div> 
</div>
    </div>
  </div>
</section>
</>
  

) 
};
export default Home;