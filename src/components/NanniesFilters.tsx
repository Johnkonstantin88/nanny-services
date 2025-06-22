import { FC, useEffect, useState } from 'react';
import Select from 'react-select';
import { components as SelectComponents } from 'react-select';
import Icon from './Icon';
import { nanniesSelectOptions } from '../constants';

export interface NanniesFiltersProps {
  onChange: (selected: string) => void;
  selectValue: string | undefined;
}

const NanniesFilters: FC<NanniesFiltersProps> = ({ onChange, selectValue }) => {
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    if (selected) onChange(selected);
  }, [selected]);

  return (
    <div className="w-[226px]">
      <span className="inline-flex mb-2 text-sm text-grey-text-main font-medium leading-3 font-roboto">
        Filters
      </span>
      <Select
        classNamePrefix="nannies-select"
        className="w-[226px]"
        options={nanniesSelectOptions}
        onChange={e => setSelected(e?.value)}
        unstyled
        isSearchable={false}
        value={nanniesSelectOptions.find(
          option => option.value === selectValue
        )}
        defaultValue={nanniesSelectOptions[nanniesSelectOptions.length - 1]}
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

export default NanniesFilters;
