import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../stores';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
