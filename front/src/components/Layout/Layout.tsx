import React, { PropsWithChildren } from 'react';
import Header from '../UI/Header/Header';

const Layout:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;