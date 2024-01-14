'use client';

import { useCallback, useDeferredValue, useEffect, useState } from 'react';

import InputCustom from './input';
import ListItem from './list-item';
import Pagination from './pagination';
import { ResponseResult } from './types';
import { getResponse } from './service';
import { v4 as uuidv4 } from 'uuid';

export const LiveSearchWithUseDeferredValue = () => {
  //creating an array of data in order to draw them
  const [data, setData] = useState<ResponseResult[] | undefined>([]);
  // we need state for interaction with of input and our debounce logic
  const [searchTerm, setSearchTerm] = useState('');
  // we can use this hooks for performance
  const deferredQuery = useDeferredValue(searchTerm);
  // ui loading
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // ui errors
  const [error, setError] = useState<string>('');
  //pagination logic
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  useEffect(() => {
    // we can see the loading while our data is downloading
    //when our data will be finally downloaded we can change our state loading
    setIsLoading(true);
    getResponse(deferredQuery, page)
      .then((result) => {
        // when we get our result we put it in out array
        setData(result.data);
        setTotalPage(result.totalPage);
      })
      .catch((err) => {
        // our catch error logic
        setData([]);
        setError('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, [deferredQuery, page]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handlePage = useCallback(
    (method?: 'i' | 'd', point?: number) => () => {
      if (method === 'i') setPage((prev) => prev + 1);
      if (method === 'd') setPage((prev) => prev - 1);
    },
    []
  );
  // when we get a error we can announce about it
  if (error)
    return (
      <div className='text-3xl font-medium'>
        Error:{error} <br />
        <p className='text-xl italic'>you need restart page</p>
      </div>
    );
  return (
    <div
      className='flex flex-col items-center justify-center'
      data-testid='mainDiv'>
      <InputCustom searchTerm={searchTerm} handleChange={handleChange} />
      {isLoading && searchTerm ? (
        <div className='text-3xl animate-bounce mt-20 text-gray-600'>
          Loading...
        </div>
      ) : (
        <>
          {data?.length ? (
            data.map((item) => <ListItem key={uuidv4()} data={item} />)
          ) : (
            <>
              {deferredQuery && (
                <div className='text-3xl italic mt-20 text-gray-400'>
                  There is not match
                </div>
              )}
            </>
          )}
        </>
      )}
      {page && totalPage && (
        <div className='border-t border-gray-400 w-full my-10 pt-10 text-center'>
          <Pagination
            currentPage={page}
            click={handlePage}
            totalPage={totalPage}
          />
        </div>
      )}
    </div>
  );
};
