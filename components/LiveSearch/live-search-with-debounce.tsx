'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import InputCustom from './input';
import ListItem from './list-item';
import { ResponseResult } from './types';
import { SelectCustom } from './select';
import { getResponse } from './service';
import { useDebounce } from './hooks/useDebounce';
import { useObserver } from './hooks/useInfiniteScroll';
import { v4 as uuidv4 } from 'uuid';

export const LiveSearchDebounce = () => {
  //creating an array of data in order to draw them
  const [data, setData] = useState<ResponseResult[]>([]);
  // we need state for interaction with of input and our debounce logic
  const [searchTerm, setSearchTerm] = useState('');
  // ui loading
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // ui errors
  const [error, setError] = useState('');
  const [selectedSort, setSelectedSort] = useState<'region' | 'capital'>();
  //our state page and totalPage
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  // our debouncing logic. we put our searchTerm in the useDebounce hook.We will achieve productivity
  const debouncedData = useDebounce(searchTerm, 600);
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    // we can see the loading while our data is downloading
    //when our data will be finally downloaded we can change our state loading
    setIsLoading(true);
    getResponse(debouncedData, page, selectedSort)
      .then((result) => {
        // when we get our result we put it in out array
        //if we have debounce queries, we put them in our data array by filtering the result
        // if we don't have any debounce requests, we put new data in our array
        if (debouncedData) setData(result.data);
        else setData((prev) => prev.concat(result.data));
        setTotalPage(result.totalPage);
      })
      .catch(() => {
        // our catch error logic
        // clean our data array
        //and show a error
        setData([]);
        setError('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, [debouncedData, page, selectedSort]);

  //change our input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  // infinite scrolling for the results.
  useObserver({
    ref,
    canLoad: page < totalPage,
    isLoading,
    callback: () => setPage((prev) => prev + 1),
  });
  const handleSelected = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) =>
      setSelectedSort(event.target.value as 'region' | 'capital'),
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
    <div className='flex flex-col items-center justify-between min-h-screen'>
      <div>
        <div className='flex flex-col gap-x-2   mb-10'>
          <InputCustom searchTerm={searchTerm} handleChange={handleChange} />
          <SelectCustom
            value={selectedSort}
            onChange={handleSelected}
            defaultValue='defaultValue'
            options={[
              { name: 'region', value: 'region' },
              { name: 'capital', value: 'capital' },
            ]}
          />
        </div>

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
                {debouncedData && (
                  <div className='text-3xl italic mt-20 text-gray-400'>
                    There is not match
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {isLoading && page < totalPage && (
        <div className='text-3xl animate-bounce mt-20 text-gray-600'>
          Loading...
        </div>
      )}
      <div ref={ref} className='border-b-2 border-gray-400/50 w-full mt-60'>
        <span className='flex justify-center text-gray-400'>
          page scrolling line
        </span>
      </div>
    </div>
  );
};
