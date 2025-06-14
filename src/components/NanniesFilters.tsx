import { FC, useEffect, useState } from 'react';
import CustomSelect from './CustomSelect';

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
    <CustomSelect
      onChange={e => setSelected(e?.value)}
      selectValue={selectValue}
    />
  );
};

export default NanniesFilters;
