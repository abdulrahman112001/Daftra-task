import React from 'react';
import { Header } from '../../organisms';

export interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`layout ${className}`}>
      <Header />
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;