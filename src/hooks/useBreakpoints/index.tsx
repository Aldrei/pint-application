import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useBreakpoints = () => {
  const theme = useTheme();

  const goSm = useMediaQuery(theme.breakpoints.up('sm'));
  const goMd = useMediaQuery(theme.breakpoints.up('md'));
  const goLg = useMediaQuery(theme.breakpoints.up('lg'));
  const goXl = useMediaQuery(theme.breakpoints.up('xl'));

  return [goSm, goMd, goLg, goXl];
};
