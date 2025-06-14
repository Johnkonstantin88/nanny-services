import Select, { OnChangeValue } from 'react-select';
import { components as SelectComponents } from 'react-select';
import Icon from './Icon';
import { SELECT_VALUES } from '../constants';
import { ISelectOption } from '../types/filters.types';
import { FC } from 'react';

const selectOptions: ISelectOption[] = [
  { value: SELECT_VALUES.nameAsc, label: 'A to Z' },
  { value: SELECT_VALUES.nameDesc, label: 'Z to A' },
  { value: SELECT_VALUES.lessThan, label: 'Less than 18$' },
  { value: SELECT_VALUES.greaterThan, label: 'Greater than 18$' },
  { value: SELECT_VALUES.popular, label: 'Popular' },
  { value: SELECT_VALUES.notPopular, label: 'Not popular' },
  { value: SELECT_VALUES.showAll, label: 'Show all' },
];

export interface CustomSelectProps {
  onChange?: (selected: OnChangeValue<ISelectOption, false>) => void;
  selectValue: string | undefined;
}

const CustomSelect: FC<CustomSelectProps> = ({ onChange, selectValue }) => {
  return (
    <div className="w-[226px]">
      <span className="inline-flex mb-2 text-sm text-grey-text-main font-medium leading-3 font-roboto">
        Filters
      </span>
      <Select
        classNamePrefix="custom-select"
        className="w-[226px]"
        options={selectOptions}
        onChange={onChange}
        unstyled
        isSearchable={false}
        value={selectOptions.find(option => option.value === selectValue)}
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
