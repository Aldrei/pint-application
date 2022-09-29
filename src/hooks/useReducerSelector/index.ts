import { RootState, IReducersType } from '../../stores';
import { useAppSelector } from '../../stores/hooks';

export const useAppSelectorBlaBlaBal = (reducer: keyof IReducersType) => useAppSelector((state: RootState) => state[reducer]);