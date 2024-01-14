import { cn } from './lib/utils';
import { memo } from 'react';

interface PaginationProps {
  click: (method?: 'i' | 'd', point?: number) => () => void;
  currentPage: number;
  totalPage: number;
}
const Pagination: React.FC<PaginationProps> = ({
  click,
  currentPage,
  totalPage,
}) => {
  return (
    <div aria-label='Page navigation example' data-testid='pagination-test-id'>
      <div className='inline-flex -space-x-px text-sm'>
        <button
        disabled={currentPage == 1}
          onClick={click('d')}
          className={` cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500
         bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100
          hover:text-gray-500 disabled:opacity-30 disabled:cursor-default`}>
          Previous
        </button>
        {Array.from({ length: totalPage }, (_, index) => (
          <button
            onClick={click(undefined, index + 1)}
            key={index}
            className={cn(
              `cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500
          bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-500`,
              {
                'bg-gray-700 text-white hover:text-white hover:bg-gray-800':
                  index + 1 === currentPage,
              }
            )}>
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPage}
          onClick={click('i')}
          className={`cursor-pointer flex items-center justify-center px-4 h-8 leading-tight text-gray-500
         bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100
          hover:text-gray-500 disabled:opacity-30 disabled:cursor-default`}>
          Next
        </button>
      </div>
    </div>
  );
};
export default memo(Pagination);
