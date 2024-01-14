import { memo } from 'react';

interface InputCustomProps {
  searchTerm?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputCustom: React.FC<InputCustomProps> = ({
  handleChange,
  searchTerm,
}) => (
  <input
    value={searchTerm}
    onChange={handleChange}
    type='text'
    placeholder='Search'
    autoFocus
    className='px-4 w-66 h-10 outline-none border-b border-gray-300 mb-4'
  />
);
export default memo(InputCustom);
