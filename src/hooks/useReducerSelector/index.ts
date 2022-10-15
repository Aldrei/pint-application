import { RootState, IReducersType } from '../../stores';
import { useAppSelector, useSelectorCallback } from '../../stores/hooks';

export const useAppSelectorBlaBlaBal = (reducer: keyof IReducersType) => useAppSelector((state: RootState) => useSelectorCallback(state, reducer));