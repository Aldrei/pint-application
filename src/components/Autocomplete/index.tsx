import React from 'react';

import AutocompleteMui from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';

import { ITimmer } from '../../types';

import { useAppDispatch } from '../../hooks/useReducerDispatch';

import { ActionCreatorWithPayload, AsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

interface IProps<T> {
  // eslint-disable-next-line
  onReducerSource?: AsyncThunk<AxiosResponse<any, any>, any, {}>;
  // eslint-disable-next-line
  onReducerSelected?: ActionCreatorWithPayload<Array<any>, string>;
  params?: object;
  descFlag: keyof T;
  dataOptions: readonly T[];
  loading: boolean;
  label: string;
  readonly: boolean;
  // eslint-disable-next-line
  valueDefault: any;
  disable?: boolean;
  clear?: boolean;
  required?: boolean;
  error?: boolean;
  startAdornmentIcon?: React.ReactNode
  startAdornmentHandle?: ()=> void
}

const timmer: ITimmer = {
  id: 0,
  delay: 500,
};

const Autocomplete = <T,>({ 
  onReducerSource, 
  onReducerSelected,
  params,
  descFlag, 
  dataOptions, 
  loading, 
  label, 
  readonly, 
  valueDefault,
  disable,
  clear,
  required,
  error,
  startAdornmentIcon,
  startAdornmentHandle,
}: IProps<T>) => {
  // const theme = useTheme();
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = React.useState('');
  const [selected, setSelected] = React.useState<Array<object>>([]);

  React.useEffect(() => {
    const resolveDispatch = async () => {
      if (onReducerSource) {
        if (params) dispatch(onReducerSource({ ...params, search: inputValue }));
        else dispatch(onReducerSource(inputValue));
      }
    };

    if (inputValue) {
      if (timmer.id) clearTimeout(timmer.id);
      timmer.id = setTimeout(() => resolveDispatch(), timmer.delay) as unknown as number;
    }
  }, [inputValue]);

  React.useEffect(() => {
    if (onReducerSelected) dispatch(onReducerSelected(selected));
  }, [selected]);

  React.useEffect(() => {
    if (clear && selected && selected.length) setSelected([]);
  }, [clear]);

  React.useEffect(() => {
    if (!valueDefault && !valueDefault.length) setSelected([]);
    if ((valueDefault && valueDefault.length) && !selected.length) setSelected(valueDefault);
  }, [valueDefault]);

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
          // width: '89%',
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
        },
        // [theme.breakpoints.up('sm')]: {
        //   '& .MuiInput-input': {
        //     width: '95%',
        //   }
        // }
        '& .MuiInputAdornment-root': {
          cursor: 'pointer',
          marginTop: '-26px',
          marginLeft: '0',
          marginRight: '10px'
        },
        '& .MuiInputAdornment-disablePointerEvents': {
          color: 'rgba(255, 255, 255, 0.5)'
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
      value={selected}
      isOptionEqualToValue={(option, value) => option[descFlag] === value[descFlag]}
      getOptionLabel={(option) => option[descFlag] as unknown as string}
      options={dataOptions}
      loading={loading}
      readOnly={readonly}
      disabled={disable}
      defaultValue={valueDefault}
      renderOption={(props, option) => (<li {...props} key={String(option.id)}>{option[descFlag]}</li>)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          required={required}
          error={error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
            ...(startAdornmentIcon ? { startAdornment: (
              <React.Fragment>
                <InputAdornment position="end" onClick={() => startAdornmentHandle?.()} disablePointerEvents={disable}>
                  {startAdornmentIcon}
                </InputAdornment>
                {params.InputProps.startAdornment}
              </React.Fragment>
            ) } : {})
          }}
        />
      )}
    />
  );
};

export default Autocomplete;