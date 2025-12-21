import css from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    // console.log(`3. components/Footer/Footer.tsx - function 'Footer' return <footer> => <body>`),
    (
      <footer className={css.footer}>
        <div className={css.content}>
          <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
          <div className={css.wrap}>
            <p>Developer: Mykhailo Krupa</p>
            <p>
              Contact us:
              <Link href="mailto:krupa.mykhailo@icloud.com"> krupa.mykhailo@icloud.com</Link>
            </p>
          </div>
        </div>
      </footer>
    )
  );
};