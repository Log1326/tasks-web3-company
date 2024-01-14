import { ResponseResult } from '../types';
import axios from 'axios';

export async function getResponse(
  searchTerm?: string,
  p = 1,
  options?: 'region' | 'capital'
): Promise<{ page: number; data: ResponseResult[]; totalPage: number }> {
  try {
    // here we make our request for data
    const data = (
      await axios.get<ResponseResult[]>('https://restcountries.com/v2/all', {
        params: { fields: `name,${options}` },
      })
    ).data;

    // I did not find the necessary queries for this resource to handle pagination or filtering properly.
    // I made my decision for an example should be enough.
    // Splitting the query result into the number of required items
    let itemsPerPage = 20,
      page = 1,
      pageItems: ResponseResult[] = [],
      totalPagesItems: { page: number; data: ResponseResult[] }[] = [],
      totalPages = Math.ceil(data.length / itemsPerPage);
    for (page = 1; page <= totalPages; page++) {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      pageItems = data.slice(startIndex, endIndex);
      totalPagesItems.push({ page, data: pageItems });
    }

    // implementing a simple filter by name
    if (searchTerm)
      return {
        page,
        totalPage: totalPagesItems.length,
        data: totalPagesItems[p - 1].data.filter((item) =>
          item.name
            .toLocaleLowerCase()
            .includes(String(searchTerm).toLocaleLowerCase())
        ),
      };
    else
      return {
        ...totalPagesItems[p - 1],
        totalPage: totalPagesItems.length,
      };
  } catch (error: any) {
    throw new Error('Something went wrong');
  }
}
