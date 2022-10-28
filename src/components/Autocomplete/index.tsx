import React from 'react';

import AutocompleteMui from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppDispatch } from '../../stores/hooks';

interface IProps<T> {
  reducerSource: any;
  descFlat: keyof T;
  dataOptions: readonly T[];
  loading: boolean;
}

const Autocomplete = <T,>({ reducerSource, descFlat, dataOptions, loading }: IProps<T>) => {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = React.useState('');
  const [selected, setSelected] = React.useState<object>();

  React.useEffect(() => {
    const resolveDispatch = async () => {
      dispatch(reducerSource(inputValue));
    };

    if (inputValue) {
      resolveDispatch();
    }
  }, [inputValue]);

  React.useEffect(() => {
    console.log('selected:', selected);
  }, [selected]);

  return (
    <AutocompleteMui
      sx={{
        flexGrow: 1,
        '& .MuiInput-root': {
          flexDirection: 'row',
        },
        '& .MuiInput-input': {
          width: '95% !important'
        },
        '& .MuiAutocomplete-endAdornment': {
          flexDirection: 'row'
        }
      }}
      open={Boolean((!loading && inputValue && !selected))}
      onChange={(event, value) => setSelected(value as unknown as object)}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      isOptionEqualToValue={(option, value) => option[descFlat] === value[descFlat]}
      getOptionLabel={(option) => option[descFlat] as unknown as string}
      options={dataOptions}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Proprietário"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default Autocomplete;