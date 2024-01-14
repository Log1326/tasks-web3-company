import { ResponseResult } from './types';
import { memo } from 'react';

interface ListItemProps {
  data: ResponseResult;
}
const ListItem: React.FC<ListItemProps> = ({ data }) => {
  if (data.name === undefined) return 'Error';
  return (
    <div className='cursor-pointer h-10' data-testid='list-item-test-id'>
      <p className='hover:bg-gray-200/70 p-2 px-6 rounded-xl'>{data.name}</p>
    </div>
  );
};
export default memo(ListItem);
