import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState, IReducersType } from '../../stores';

const useSelectorCallback = (state: RootState, reducer: keyof RootState) => state[reducer];
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppSelectorBlaBlaBal = (reducer: keyof IReducersType) => useAppSelector((state: RootState) => useSelectorCallback(state, reducer));