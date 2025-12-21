import React from 'react';
import css from './[...slug]/NotesPage.module.css';


export default function FilterLayout({
  children,
  sidebar,
  // modal,
}: {
  children: React.ReactNode;
    sidebar: React.ReactNode;
    // modal: React.ReactNode;
}) {
  return (
    // <div style={{ display: 'flex', padding: '20px'}}>
    <div className={css.container}>
      <aside style={{ width: '200px' }}>{sidebar}</aside>
      {/* {modal} */}
      <main style={{ flex: 1, maxWidth: '1080px' }}>{children}</main>
    </div>
  );
}