'use client';

import InputCustom from './input';
import ListItem from './list-item';
import Pagination from './pagination';
import { useFetch } from './hooks/useFetch';
import { v4 as uuidv4 } from 'uuid';

export const LiveSearchWithUseDeferredValue = () => {
  const { state, fn } = useFetch();
  // when we get a error we can announce about it
  if (state.error)
    return (
      <div className='text-3xl font-medium'>
        Error:{state.error} <br />
        <p className='text-xl italic'>you need restart page</p>
      </div>
    );
  return (
    <div
      className='flex flex-col items-center justify-center'
      data-testid='mainDiv'>
      <InputCustom
        searchTerm={state.searchTerm}
        handleChange={fn.handleChange}
      />
      {state.isLoading && state.searchTerm ? (
        <div className='text-3xl animate-bounce mt-20 text-gray-600'>
          Loading...
        </div>
      ) : (
        <>
          {state.data?.length ? (
            state.data.map((item) => <ListItem key={uuidv4()} data={item} />)
          ) : (
            <>
              {state.deferredQuery && (
                <div className='text-3xl italic mt-20 text-gray-400'>
                  There is not match
                </div>
              )}
            </>
          )}
        </>
      )}
      {state.page && state.totalPage && (
        <div className='border-t border-gray-400 w-full my-10 pt-10 text-center'>
          <Pagination
            currentPage={state.page}
            click={fn.handlePage}
            totalPage={state.totalPage}
          />
        </div>
      )}
    </div>
  );
};
function FormEvent<T>() {
  throw new Error('Function not implemented.');
}
