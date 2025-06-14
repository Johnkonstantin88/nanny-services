import { SELECT_VALUES } from '../constants';
import { IDocument } from '../types/data.types';
import { ISelectOption } from '../types/filters.types';

// export const getFilteredData = (
//   data: IDocument[],
//   filters: ISelectOption['value'] | undefined
// ) => {
//   let filteredData = data;

//   if (filters === FILTERS.nameAsc) {
//     filteredData = [...data].sort((a, b) =>
//       a.documentDetails.name.localeCompare(b.documentDetails.name)
//     );
//   }

//   if (filters === FILTERS.nameDesc) {
//     filteredData = [...data].sort((a, b) =>
//       b.documentDetails.name.localeCompare(a.documentDetails.name)
//     );
//   }

//   return filteredData;
// };
