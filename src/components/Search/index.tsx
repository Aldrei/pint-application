import * as React from 'react';

import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

import Modal from './components/Modal';

import { Search, SearchIconWrapper, StyledInputBase, InputFake } from './styles';

interface IProps {
  type: 'properties' | 'owners';
}

const SearchComponent = ({ type }: IProps): React.ReactElement => {
  const intputRef = React.useRef<HTMLInputElement>();
  const intputFakeRef = React.useRef<HTMLInputElement>();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setTimeout(() => {
      setOpen(true);
    }, 200);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /** 
   * Force remove focus of the input search with InputFake.
   * 
   * setTimeout avoid error: "Warning: Cannot update a component (`ForwardRef(InputBase)`) while rendering a different component (`SearchComponent`). To locate the bad setState() call inside"
  */
  // if (!open) {
  //   // setTimeout(() => {
  //   if (intputRef.current) intputRef.current.blur();
  //   if (intputFakeRef.current) intputFakeRef.current.click();
  //   // }, 0);
  // }
  // But useEffect avoid error and is more beautiful.
  React.useEffect(() => {
    if (!open) {
      if (intputRef.current) intputRef.current.blur();
      if (intputFakeRef.current) intputFakeRef.current.click();
    }
  }, [open]);

  return (
    <Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          ref={intputRef}
          placeholder="Pesquisar..."
          inputProps={{ 'aria-label': 'search' }}
          onClick={() => handleClickOpen()}
        />
        <InputFake ref={intputFakeRef} />
        <Modal handleClose={handleClose} open={open} />
      </Search>
    </Box>
  );
};

export default SearchComponent;