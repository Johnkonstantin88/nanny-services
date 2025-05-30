import Select from 'react-select';
import { components as SelectComponents } from 'react-select';
import Icon from './Icon';

const selectOptions = [
  { value: 'alphbet-asc', label: 'A to Z' },
  { value: 'alphabet-desc', label: 'Z to A' },
  { value: 'less-than-10$', label: 'Less than 10$' },
  { value: 'greater-than-10$', label: 'Greater than 10$' },
  { value: 'popular', label: 'Popular' },
  { value: 'not-popular', label: 'Not popular' },
  { value: 'show-all', label: 'Show all' },
];

const CustomSelect = () => {
  return (
    <div className="w-[226px]">
      <span className="inline-flex mb-2 text-sm text-grey-text-main font-medium leading-3 font-roboto">
        Filters
      </span>
      <Select
        classNamePrefix="custom-select"
        className="w-[226px]"
        options={selectOptions}
        unstyled
        isSearchable={false}
        defaultValue={selectOptions[selectOptions.length - 1]}
        components={{
          DropdownIndicator: props => (
            <SelectComponents.DropdownIndicator {...props}>
              <Icon name={'icon-chevron-down'} width={20} height={20} />
            </SelectComponents.DropdownIndicator>
          ),
        }}
      />
    </div>
  );
};

export default CustomSelect;
