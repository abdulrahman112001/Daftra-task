import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Text } from '../../components/atoms';

const HomePage: React.FC = () => {
  return (
    <div className="hero">
      <Text variant="heading" color="default" as="h1" className="hero__title">
        <span className="hero__title-icon">⚡</span>
        Pokédex
      </Text>
      
      <Text variant="subtitle" color="default" className="hero__subtitle">
        Discover and explore Pokémon with infinite scroll
      </Text>
      
      <Text variant="body" color="default" className="hero__features">
        ⚡ Powered by React Query • 🛡️ Error Boundaries • ⚙️ React Suspense
      </Text>
      
      <div className="hero__buttons">
        <Button variant="primary" size="large">
          <Link to="/pagination" style={{ textDecoration: 'none', color: 'inherit' }}>
            Page Controls
          </Link>  
        </Button>
        <Button variant="secondary" size="large">
          <Link to="/infinite" style={{ textDecoration: 'none', color: 'inherit' }}>
            Infinite Scroll
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;