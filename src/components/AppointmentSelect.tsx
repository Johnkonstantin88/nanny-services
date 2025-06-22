import Select, { GroupBase, MenuProps, OptionProps } from 'react-select';
import { components as SelectComponents } from 'react-select';
import Icon from './Icon';
import { ISelectOption } from '../types/filters.types';
import { FC } from 'react';

export interface AppointmentSelectProps {
  field: {
    onChange: (value: string | null) => void;
    onBlur: () => void;
    value: string;
  };
  options: ISelectOption[];
}

const Menu = (
  props: MenuProps<ISelectOption, false, GroupBase<ISelectOption>>
) => (
  <SelectComponents.Menu {...props}>
    <span className="absolute top-4 left-4 w-[97px] h-6 text-[16px] text-black-main font-medium leading-8 align-middle">
      Meeting time
    </span>
    {props.children}
  </SelectComponents.Menu>
);

const MenuOption = (
  props: OptionProps<ISelectOption, false, GroupBase<ISelectOption>>
) => (
  <SelectComponents.Option {...props}>
    {props.label.replace(':', '   :   ')}
  </SelectComponents.Option>
);

const AppointmentSelect: FC<AppointmentSelectProps> = ({ field, options }) => {
  return (
    <Select
      {...field}
      classNamePrefix="appointment-select"
      className="w-58"
      options={options}
      onChange={selectedOption => {
        field.onChange(selectedOption ? selectedOption.value : null);
      }}
      onBlur={() => field.onBlur()}
      value={
        options ? options.find(option => option.value === field.value) : null
      }
      unstyled
      isSearchable={false}
      placeholder={'00:00'}
      components={{
        DropdownIndicator: props => (
          <SelectComponents.DropdownIndicator {...props}>
            <Icon name={'icon-clock-converted'} width={20} height={20} />
          </SelectComponents.DropdownIndicator>
        ),
        Menu,
        Option: MenuOption,
      }}
    />
  );
};

export default AppointmentSelect;
