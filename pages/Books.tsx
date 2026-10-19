import { useState } from 'react';
import './Books.css';
import { useLocalStorage } from '../src/hooks/useLocalStorage.ts';
import type { Book } from '../src/types/Book';
import { genres, fictionGenres, HUES } from '../src/types/bookConstants';

function Books() {
  const [filter, setFilter] = useState('Все');
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [year, setYear] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState(genres[0]);
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);

  const addBook = () => {
    if (title.trim() === '') return;
    if (rating.trim() === '') return;
    const ratingNum = Number(rating);
    if(Number.isNaN(rating)) return;
    const yearNum = year.trim() === '' ? undefined : Number(year);
    const newBook: Book = {
      id: Date.now(),
      title: title,
      rating: ratingNum,
      author: author.trim() === '' ? undefined : author,
      year: yearNum,
      genre: genre,
      isFavorite: false,
      hue: HUES[Math.floor(Math.random() * HUES.length)],
      addedAt: new Date().toISOString().slice(0, 10),
    };
    setBooks(prev => [...prev, newBook]);
    setTitle('');
    setRating('');
    setYear('');
    setAuthor('');
    setGenre(genres[0]);
  };

  const toggleFavorite = (id: number) => {
    setBooks(prev => prev.map(book =>
      book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
    ));
  };

  const deleteBook = (id: number) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  const filteredBooks = books.filter(book => {
    if (filter === 'Все') return true;
    if (filter === 'Художественная литература') return fictionGenres.includes(book.genre);
    if (filter === 'Документальная литература') return !fictionGenres.includes(book.genre);
    return true;
  });

function Key(event: React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === 'Enter') addBook();
}

  return (
    <>
      <section className="books">
        <div className="books__container">

          <div className="books__header">
            <h2 className="books__title">Книги</h2>
            <blockquote className="books__subtitle">
              «Чтение — это беседа с самыми мудрыми людьми прошлых веков»
            </blockquote>
            <p className="books__desc">
              Чтение книг расширяет кругозор, обогащает словарный запас и улучшает работу мозга.<br />
              Оно эффективно снижает уровень стресса, помогая расслабиться и найти новые идеи.
            </p>
          </div>

          <div className="books__add">
            <div className='books__add-int'>

              <input
                type="text"
                className="books__input"
                placeholder="Названия книги..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={Key}
              />

              <input
                type="text"
                className="books__input"
                placeholder="Год..."
                value={year}
                onChange={(e) => setYear(e.target.value)}
                onKeyDown={Key}
              />

              <input
                type="text"
                className="books__input"
                placeholder="Автор..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                onKeyDown={Key}
              />

              <input
                type="text"
                className="books__input"
                placeholder="Оценка..."
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                onKeyDown={Key}
              />
            </div>
            <div className='books-add-buttons'>

              <button className="books__add-btn button-gold" onClick={addBook}>Сохранить</button>

              <select
                className="books__select"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="Любовные романы">Любовные романы</option>
                <option value="Детективы">Детективы</option>
                <option value="Триллеры">Триллеры</option>
                <option value="Криминал">Криминал</option>
                <option value="Фэнтези">Фэнтези</option>
                <option value="Научная фантастика">Научная фантастика</option>
                <option value="Саморазвитие ">Саморазвитие</option>
                <option value="Психология">Психология</option>
                <option value="Биографии и мемуары">Биографии и мемуары</option>
              </select>
            </div>
          </div>

          <div className="books__filters">
            <button className={`filter-btn ${filter === 'Все' ? 'active' : ''}`} onClick={() => setFilter('Все')}>Все</button>
            <button className={`filter-btn ${filter === 'Художественная литература' ? 'active' : ''}`} onClick={() => setFilter('Художественная литература')}>Художественная литература</button>
            <button className={`filter-btn ${filter === 'Документальная литература' ? 'active' : ''}`} onClick={() => setFilter('Документальная литература')}>Документальная литература</button>
          </div>

          <div className="books_box">
            <h2 className='books_title-box'>Ваша библиотека :</h2>

            <div className="books__list">
              {filteredBooks.map(book => (
                <div key={book.id} className="books--card">
                  <span className="books-icon" onClick={() => toggleFavorite(book.id)}>♡</span>
                  <button className="button-card__delete" onClick={() => deleteBook(book.id)}>
                    ✕
                  </button>
                  <div className="books--card__inner">
                    <h3>{book.title}</h3>
                    <time>Год: {book.year}</time>
                    <cite>Автор: {book.author}</cite>
                    <span>Оценка: {book.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='library'>
        <article className='library_container'>
          <h3 className='library_title'>Рекомендации от Автора:<br />
            <span className='library_title-span'>Топ-5 книг.</span>
          </h3>

          <div className='library_slider'>
            <div className='library_track'>
              <div className='library_card'><img src="./img/Бк.webp" alt="" /></div>
              <div className='library_card'><img src="./img/Дл.webp" alt="" /></div>
              <div className='library_card'><img src="./img/Нс.webp" alt="" /></div>
              <div className='library_card'><img src="./img/BL.webp" alt="" /></div>
              <div className='library_card'><img src="./img/Gf.jpg" alt="" /></div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}

export default Books;