import { State } from "../../types/state"

export const getFiltersLoadingStatus = () => (state: State) => state.filterSlice.loadingStatus; 
export const getFilters = () => (state: State) => state.filterSlice;
export const getActiveFilter = () => (state: State) => state.filterSlice.activeFilter;
