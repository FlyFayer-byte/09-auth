import Link from 'next/link';
import css from './SidebarNotes.module.css';

const tags = ['all', 'Work', 'Personal', 'Todo', 'Meeting', 'Shopping'];

export default function SidebarNotes() {
  return (
    <>
      <h3 className={css.title}>Filter by tag</h3>

      <ul className={css.menuList}>
        {tags.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag === 'all' ? 'All notes' : tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}