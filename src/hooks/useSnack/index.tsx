import React from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';

import { ISnack } from '../../contexts/SnackContext';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useSnack = () => {
  const [snacks, setSnacks] = React.useState<ISnack>();

  const handleClose = () => setSnacks(undefined);

  const SnackList = React.useCallback(() => {
    return (
      <Snackbar 
        open={Boolean(snacks)} 
        autoHideDuration={8000} 
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        sx={{ '& .MuiPaper-root': { flexDirection: 'row' } }}
      >
        <Alert 
          onClose={handleClose} 
          severity={snacks && snacks.type} 
          sx={{ width: '100%' }}
        >
          {snacks && snacks.message}
        </Alert>
      </Snackbar>
    );
  }, [snacks]);

  const addSnack = React.useMemo(() => ({
    addMessage: ({ type, message }: ISnack) => {
      setSnacks({ type, message });
    },
  }), []);

  return { addSnack, snacks, SnackList };
};

export default useSnack;