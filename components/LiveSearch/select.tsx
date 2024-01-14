interface SelectCustomProps {
  options: { name: string; value: string }[];
  defaultValue: string;
  value?: 'region' | 'capital';
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const SelectCustom: React.FC<SelectCustomProps> = ({
  defaultValue,
  options,
  onChange,
  value,
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className='px-4 bg-white border-b border-gray-300 outline-none h-8'>
      <option disabled value='' className='opacity-40'>
        {defaultValue}
      </option>

      {options.map((option) => (
        <option key={option.name} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
