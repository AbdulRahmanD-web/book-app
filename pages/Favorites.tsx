import { useState } from 'react';
import type { CSSProperties, JSX } from 'react';
import './Favorites.css';
import { useLocalStorage } from '../src/hooks/useLocalStorage.ts';
import type { Book } from '../src/types/Book';

type SortKey = 'recent' | 'title' | 'author' | 'rating';

const ratingToStars = (rating: number): string => {
  const filled = Math.max(0, Math.min(5, Math.round(rating / 2)));
  return '★'.repeat(filled) + '☆'.repeat(5 - filled);
};

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
};

const spineShift = (id: number): string => `${(id % 3) - 1}px`;

const SORT_LABEL: Record<SortKey, string> = {
  recent: 'Недавние',
  title: 'По названию',
  author: 'По автору',
  rating: 'По рейтингу',
};

interface BookSpineProps {
  book: Book;
}

const BookSpine = ({ book }: BookSpineProps) => (
  <article
    className={`book book--${book.hue} book--${book.size ?? 'medium'} book--${book.width ?? 'normal'}`}
    title={`${book.title} — ${book.author ?? ''}`}
    style={{ '--shift': spineShift(book.id) } as CSSProperties}
  >
    {book.bookmark && <span className="book-bookmark" aria-hidden="true" />}
    <span className="book-top" aria-hidden="true" />
    <span className="book-spine">
      <span className="book-spine-line" aria-hidden="true" />
      <span className="book-title">{book.title}</span>
      <span className="book-ornament" aria-hidden="true">❦</span>
      <span className="book-spine-line" aria-hidden="true" />
    </span>
    <span className="book-pages" aria-hidden="true" />
  </article>
);

function Favorites(): JSX.Element {
  const [books] = useLocalStorage<Book[]>('books', []);
  const favoriteBooks = books.filter((b) => b.isFavorite);

  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('recent');

  const recent = [...favoriteBooks]
    .sort((a, b) => (b.addedAt ?? '').localeCompare(a.addedAt ?? ''))
    .slice(0, 3);

  const q = query.trim().toLowerCase();

  let visible = favoriteBooks.filter((b) => {
    if (!q) return true;
    return (
      b.title.toLowerCase().includes(q) ||
      (b.author ?? '').toLowerCase().includes(q)
    );
  });

  visible = [...visible].sort((a, b) => {
    switch (sortBy) {
      case 'title':  return a.title.localeCompare(b.title, 'ru');
      case 'author': return (a.author ?? '').localeCompare(b.author ?? '', 'ru');
      case 'rating': return b.rating - a.rating;
      case 'recent':
      default:       return (b.addedAt ?? '').localeCompare(a.addedAt ?? '');
    }
  });

  const resetAll = () => {
    setQuery('');
    setSortBy('recent');
  };

  return (
    <main className="page">
      <header className="pageHead">
        <span className="pageHead-eyebrow">Личная библиотека</span>
        <h1>Избранное</h1>
        <p className="pageHead-sub">
          {favoriteBooks.length} книг
        </p>
      </header>

      {recent.length > 0 && (
        <section className="shelf shelf--hero" aria-label="Недавно добавленные">
          <h2 className="shelf-caption">
            <span>✦</span> Недавно добавленные
          </h2>

          <div className="shelf-row">
            {recent.map((book) => (
              <BookSpine key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}

      <section className="toolbar" aria-label="Поиск и сортировка">
        <div className="search">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            id="lib-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Найти книгу или автора…"
            aria-label="Поиск по библиотеке"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className="search-clear"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setQuery('')}
              aria-label="Очистить поиск"
            >
              ×
            </button>
          )}
        </div>

        <div className="toolbar-row">
          <div className="sort" aria-label="Сортировка">
            <span className="sort-label">Сортировка:</span>
            {(Object.keys(SORT_LABEL) as SortKey[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={sortBy === key}
                className={`sort-btn ${sortBy === key ? 'sort-btn--active' : ''}`}
                onClick={() => setSortBy(key)}
              >
                {SORT_LABEL[key]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="covers" aria-label="Обложки книг">
        {visible.length === 0 ? (
          <div className="empty">
            <span className="empty-mark" aria-hidden="true">❦</span>
            <h3 className="empty-title">
              {favoriteBooks.length === 0 ? 'Пока пусто' : 'Ничего не найдено'}
            </h3>
            <p className="empty-text">
              {favoriteBooks.length === 0
                ? 'Добавь книги на странице «Книги» и отметь их сердечком'
                : 'Попробуй изменить запрос или сбросить фильтры'}
            </p>
            {favoriteBooks.length > 0 && (
              <button type="button" className="empty-btn" onClick={resetAll}>
                Сбросить
              </button>
            )}
          </div>
        ) : (
          <div className="covers-grid">
            {visible.map((book) => (
              <article key={book.id} className="cover">
                <div className={`cover-frame cover-frame--${book.hue}`}>
                  <span className="cover-foil" aria-hidden="true" />

                  <div className="cover-inner">
                    <span className="cover-mark" aria-hidden="true">✦</span>
                    <h3 className="cover-title">{book.title}</h3>
                    <span className="cover-rule" aria-hidden="true" />
                    <span className="cover-author">{book.author ?? '—'}</span>
                  </div>
                </div>

                <div className="cover-meta">
                  <span className="cover-meta-left">
                    {book.author ?? '—'} · {book.year ?? '—'}
                  </span>
                  <span className="cover-meta-right">
                    {book.addedAt ? formatDate(book.addedAt) : '—'}
                  </span>
                </div>

                <div className="cover-foot">
                  <span
                    className="cover-rating"
                    aria-label={`Рейтинг ${book.rating} из 10`}
                  >
                    {ratingToStars(book.rating)}
                  </span>
                  <span className="cover-score">{book.rating}/10</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Favorites;