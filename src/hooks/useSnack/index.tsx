import React from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useSnack = () => {
  const [snacks, setSnacks] = React.useState(false);

  const handleClose = () => setSnacks(false);

  const SnackList = React.useCallback(() => {
    return (
      <Snackbar 
        open={snacks} 
        autoHideDuration={6000} 
        onClose={handleClose}
        sx={{ '& .MuiPaper-root': { flexDirection: 'row' } }}
      >
        <Alert 
          onClose={handleClose} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    );
  }, [snacks]);

  const addSnack = React.useMemo(() => ({
    addMessage: () => {
      console.log('ADD SNACK MESSAGE!');
      setSnacks(!snacks);
    },
  }), []);

  return { addSnack, snacks, SnackList };
};

export default useSnack;