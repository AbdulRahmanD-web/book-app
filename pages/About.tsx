import type { JSX } from 'react';
import './About.css';
import portraitImg from '/img/coder.png';


interface Chapter {
  numeral: string;
  title: string;
  body: string[];
}

interface Skill {
  label: string;
  value: string;
}

interface Contact {
  label: string;
  href: string;
}

interface AuthorData {
  name: string;
  role: string;
  tagline: string;
  portrait: string | null;
  initials: string;
  chapters: Chapter[];
  skills: Skill[];
  contacts: Contact[];
}

const AUTHOR: AuthorData = {
  name: 'Abdul-Rahman D.',
  role: 'Junior Frontend Developer',
  tagline: 'Собираю интерфейсы, которые хочется открывать снова',
  portrait: portraitImg,
  initials: 'АРД',
  chapters: [
    {
      numeral: 'I',
      title: 'О себе',
      body: [
        'Мне нравится делать интерфейсы, которые приятно открывать. Не просто рабочие — а такие, где есть пара продуманных деталей, из-за которых человек удивляется: «а, вот это круто, я такого не ожидал».',
        'Именно такие мелочи я и стараюсь добавлять в свои проекты. Не ради эффекта, а потому что сам получаю удовольствие, когда вещь сделана хорошо. Если после открытия приложения хочется остаться на нём ещё на минуту — значит, получилось.',
      ],
    },
    {
      numeral: 'II',
      title: 'Путь',
      body: [
        'В разработке я год и два месяца. Начинал с нуля: HTML, CSS, первые макеты, ошибки, вёрстка в столбик. Потом пришёл JavaScript — а с ним и первое понимание, что можно не просто верстать, а оживлять интерфейс. Первые проекты, мини-практики, взаимодействие с DOM.',
        'Следующий шаг — React. Сначала были небольшие приложения на статике, потом всё выросло в два полноценных проекта. Это приложение, которое ты сейчас читаешь, — как раз объединение всего, что я знаю и умею на сегодняшний день.',
        'Сейчас доучиваю React и TypeScript, осталось несколько закрепляющих тем по JavaScript. Параллельно подал заявку на вакансию, выполнил тестовое задание и жду ответа. Это ближайшая точка, к которой я иду.',
        'Дальше хочу углубиться в своё направление по-настоящему: не просто писать код, а понимать чужой, видеть, где что можно улучшить, разбираться в свойствах и фишках, которые отличают сильного разработчика. Возможно, дальше пойду в сторону Next.js или Python — но сначала хочу набить руку на том, что уже есть.',
      ],
    },
  ],
  skills: [
    { label: 'Уверенно',   value: 'HTML, CSS, JavaScript, React' },
    { label: 'В процессе', value: 'TypeScript, закрепление JavaScript' },
    { label: 'Дальше',     value: 'Next.js, углубление во frontend' },
    { label: 'Вне кода',   value: 'Книги' },
  ],
  contacts: [
    { label: 'Telegram', href: 'https://t.me/AbdulRahmanD_web' },
    { label: 'GitHub',   href: 'https://github.com/AbdulRahmanD-web' },
  ],
};

/* ==========================================================
   Компонент
   ========================================================== */

function About(): JSX.Element {
  return (
    <main className="about">
      {/* ============================================
          Титульный лист
          ============================================ */}
      <header className="about-hero">
        <div className="about-portrait" aria-hidden="true">
          {AUTHOR.portrait ? (
            <img
              src={AUTHOR.portrait}
              alt=""
              className="about-portrait-img"
            />
          ) : (
            <span className="about-monogram">{AUTHOR.initials}</span>
          )}
        </div>

        <span className="about-eyebrow">Об авторе</span>

        <h1 className="about-name">{AUTHOR.name}</h1>

        <p className="about-role">{AUTHOR.role}</p>

        <span className="about-rule" aria-hidden="true" />

        <p className="about-tagline">{AUTHOR.tagline}</p>
      </header>

      {/* ============================================
          Главы
          ============================================ */}
      <div className="about-chapters">
        {AUTHOR.chapters.map((chapter) => (
          <section key={chapter.numeral} className="about-chapter">
            <div className="about-chapter-head">
              <span className="about-chapter-numeral">
                {chapter.numeral}
              </span>
              <h2 className="about-chapter-title">{chapter.title}</h2>
            </div>

            <div className="about-chapter-body">
              {chapter.body.map((paragraph, i) => (
                <p key={i} className={i === 0 ? 'about-first' : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* ============================================
          Навыки
          ============================================ */}
      <section className="about-skills" aria-label="Навыки">
        <h2 className="about-section-title">
          <span>·</span> Перечень
        </h2>

        <dl className="about-skills-list">
          {AUTHOR.skills.map((skill) => (
            <div key={skill.label} className="about-skill">
              <dt className="about-skill-label">{skill.label}</dt>
              <dd className="about-skill-value">{skill.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ============================================
          Колофон — контакты
          ============================================ */}
      <footer className="about-colophon">
        <span className="about-rule" aria-hidden="true" />

        <p className="about-colophon-text">
          Написать можно здесь
        </p>

        <nav className="about-contacts" aria-label="Контакты">
          {AUTHOR.contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              className="about-contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.label}
            </a>
          ))}
        </nav>

        <span className="about-fleuron" aria-hidden="true">❦</span>
      </footer>
    </main>
  );
}

export default About;