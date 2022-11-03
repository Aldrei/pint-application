import React from 'react';

import AutocompleteMui from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppDispatch } from '../../stores/hooks';

interface IProps<T> {
  // eslint-disable-next-line
  onReducerSource?: any;
  // eslint-disable-next-line
  onReducerSelected?: any;
  params?: object;
  descFlag: keyof T;
  dataOptions: readonly T[];
  loading: boolean;
  label: string;
  readonly: boolean;
  // eslint-disable-next-line
  valueDefault: any;
}

const Autocomplete = <T,>({ 
  onReducerSource, 
  onReducerSelected,
  params,
  descFlag, 
  dataOptions, 
  loading, 
  label, 
  readonly, 
  valueDefault 
}: IProps<T>) => {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = React.useState('');
  const [selected, setSelected] = React.useState<Array<object>>(valueDefault ? valueDefault : []);

  React.useEffect(() => {
    const resolveDispatch = async () => {
      if (onReducerSource) {
        if (params) dispatch(onReducerSource({ ...params, search: inputValue }));
        else dispatch(onReducerSource(inputValue));
      }
    };

    if (inputValue) {
      resolveDispatch();
    }
  }, [inputValue]);

  React.useEffect(() => {
    if (onReducerSelected) dispatch(onReducerSelected(selected));
  }, [selected]);

  return (
    <AutocompleteMui
      multiple
      sx={{
        flexGrow: 1,
        '& .MuiInput-root': {
          flexDirection: 'row',
          ...(selected.length ? {
            paddingBottom: '5px'
          } : {})
        },
        '& .MuiInput-input': {
          width: '95% !important',
          ...(selected.length ? {
            display: 'none'
          } : {})
        },
        '& .MuiAutocomplete-endAdornment': {
          flexDirection: 'row',
          ...(readonly ? {
            display: 'none'
          } : {})
        },
        '& .MuiButtonBase-root': {
          flexDirection: 'row'
        }
      }}
      open={Boolean((!loading && inputValue && !(!selected && !Array(selected).length)))}
      onChange={(event, value, reason) => {
        if (reason === 'clear' || reason === 'removeOption') setSelected([]);
        else setSelected(value);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      isOptionEqualToValue={(option, value) => option[descFlag] === value[descFlag]}
      getOptionLabel={(option) => option[descFlag] as unknown as string}
      options={dataOptions}
      loading={loading}
      readOnly={readonly}
      defaultValue={valueDefault}
      renderOption={(props, option) => (<li {...props} key={String(option.id)}>{option[descFlag]}</li>)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={label}
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