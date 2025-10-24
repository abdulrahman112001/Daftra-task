import React from 'react';
import { Button } from '../../atoms';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
  className = '',
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`pagination ${className}`}>
      <Button
        variant="secondary"
        disabled={!hasPrev}
        onClick={onPrev}
        className="pagination__btn pagination__btn--prev"
      >
        Previous
      </Button>
      
      <div className="pagination__pages">
        {getVisiblePages().map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? 'primary' : 'secondary'}
            className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''}`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={typeof page !== 'number'}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="secondary"
        disabled={!hasNext}
        onClick={onNext}
        className="pagination__btn pagination__btn--next"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;