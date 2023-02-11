import * as React from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LocationOn from '@mui/icons-material/LocationOn';
import Chip from '@mui/material/Chip';

import { IPropertyData, IServiceRequest, ITimmer } from '../../../../types';

import { getPhoto, hasProperty } from '../../../../helpers';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { useAppDispatch } from '../../../../hooks/useReducerDispatch';
import { propertiesSearchThunk } from '../../../../reducers/properties/search';

import PropertiesSearchSkeleton from '../Skeleton';

import { 
  DialogStyled, 
  DialogHeaderStyled,
  DialogContentStyled,
  DialogInputWrapper,
  DialogInput
} from './styles';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const timmer: ITimmer = {
  id: 0,
  delay: 500,
};

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogHeaderStyled
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            padding: 0
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogHeaderStyled>
  );
};

interface IModal {
  open: boolean;
  handleClose: () => void;
}

const Modal = ({ handleClose, open }: IModal) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { data, status: propertiesSearchStatus } = useAppSelectorBlaBlaBal('propertiesSearchReducer') as IServiceRequest;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resultList = data ? data as unknown as Record<string, any> : [];

  const [searchValue, setSearchValue] = React.useState<string>('');

  React.useEffect(() => {
    if (searchValue && searchValue.length > 2) {
      if (timmer.id) clearTimeout(timmer.id);
      timmer.id = setTimeout(() => dispatch(propertiesSearchThunk(searchValue)), timmer.delay) as unknown as number;
    }
  }, [searchValue]);

  const shouldRenderList = (resultList?.paginate?.data?.length && (searchValue && searchValue.length > 2)) && propertiesSearchStatus !== 'loading';

  const renderAddress = (item: IPropertyData) => (
    `${item.city.data.long_desc} - ${item.neighborhood.data.nome}, ${item.localLogradouro}, núm. ${item.localNumero || '--'}, apto ${item.apApto || '--'} - CEP ${item.localCEP || '--'}`
  );

  return (
    <Box>
      <DialogStyled
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          style: {
            backgroundColor: theme.palette.background.default,
            borderRight: '1px solid rgb(23, 58, 94)'
          }
        }}
        maxWidth="md"
        scroll='paper'
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <DialogInputWrapper>
            <SearchIcon fontSize='large' />
            <DialogInput variant="outlined" placeholder='Código, rua, proprietário...' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} autoComplete="off" />
          </DialogInputWrapper>
        </BootstrapDialogTitle>
        <DialogContentStyled dividers>
          {propertiesSearchStatus === 'loading' && (
            <PropertiesSearchSkeleton />
          )}
          {shouldRenderList && (
            <List sx={{ width: '100%' }}>
              {resultList.paginate.data.map((item: IPropertyData, i: number) => (
                <React.Fragment>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      {hasProperty(item, 'photo.data') 
                        ? <Avatar alt={`${item.title} - Foto ${i}`} src={hasProperty(item, 'photo.data') ? getPhoto(item.photo.data, 'thumb') : ''} />
                        : <Avatar><HomeIcon /></Avatar>}
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.nomeImovel || 'NOME IMOVE'}
                      secondary={
                        <React.Fragment>
                          <Box sx={{ marginTop: '1px' }}>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              <Chip label={`Código: ${item.code || '--'}`} style={{ marginBottom: '5px', marginRight: '3px' }} /> <Chip label={`Código tipo: ${item.codePretty || '--'}`} />
                            </Typography>
                            <Box sx={{ flexDirection: 'row', alignItems: 'center' }}>
                              <LocationOn sx={{ fontSize: '1.45rem' }} /> {renderAddress(item)}
                            </Box>
                          </Box>
                          <Box sx={{ marginTop: '3px', fontSize: '13px' }}>
                            {`Proprietário: ${item.owner.data.nomeRazao}`}
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          )}
        </DialogContentStyled>
      </DialogStyled>
    </Box>
  );
};

export default Modal;