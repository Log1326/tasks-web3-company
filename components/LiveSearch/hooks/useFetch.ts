import { useCallback, useDeferredValue, useEffect, useState } from 'react';

import { ResponseResult } from '../types';
import { getResponse } from '../service';

interface UseFetchResponse {
  state: {
    data: ResponseResult[] | undefined;
    searchTerm: string;
    deferredQuery: string;
    isLoading: boolean;
    error: string;
    page: number;
    totalPage: number;
  };
  fn: {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handlePage: (method?: 'i' | 'd', point?: number) => () => void;
  };
}
export const useFetch = <T>(): UseFetchResponse => {
  //creating an array of data in order to draw them
  const [data, setData] = useState<ResponseResult[] | undefined>([]);
  // we need state for interaction with of input and our debounce logic
  const [searchTerm, setSearchTerm] = useState<string>('');
  // we can use this hooks for performance
  const deferredQuery = useDeferredValue<string>(searchTerm);
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
      .catch(() => {
        // our catch error logic
        setData([]);
        setError('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, [deferredQuery, page]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const handlePage = useCallback(
    (method?: 'i' | 'd', point?: number) => () => {
      if (method === 'i') setPage((prev) => prev + 1);
      if (method === 'd') setPage((prev) => prev - 1);
      if (point) setPage(point);
    },
    [setPage]
  );
  return {
    state: {
      data,
      searchTerm,
      deferredQuery,
      isLoading,
      error,
      page,
      totalPage,
    },
    fn: { handleChange, handlePage },
  };
};
