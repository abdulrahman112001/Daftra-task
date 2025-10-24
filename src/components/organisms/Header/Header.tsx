import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Text } from '../../atoms';

export interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const location = useLocation();

  const navItems = [
    { path: '/pagination', label: 'Page Controls' },
    { path: '/infinite', label: 'Infinite Scroll' },
  ];

  return (
    <header className={`header ${className}`}>
      <div className="container">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">⚡</span>
          <Text variant="title" color="primary" as="span">
            Pokédex
          </Text>
        </Link>
        
        <nav className="header__nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`header__nav-link ${
                location.pathname === item.path ? 'active' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;