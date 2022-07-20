import { RootState, IReducersType } from '../../store';
import { useAppSelector } from '../../store/hooks';

export const useAppSelectorBlaBlaBal = (reducer: keyof IReducersType) => useAppSelector((state: RootState) => state[reducer]);