import * as React from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LocationOn from '@mui/icons-material/LocationOn';

import { IPropertyData, IServiceRequest, ITimmer } from '../../../../types';

import { getPhoto, hasProperty } from '../../../../helpers';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { useAppDispatch } from '../../../../hooks/useReducerDispatch';
import { propertiesSearchThunk } from '../../../../reducers/properties/search';

import PropertiesActionsMenu from '../../../ActionsMenu/hocs/PropertiesActionsMenu';

import PropertiesSearchSkeleton from './components/Skeleton';

import { 
  DialogStyled, 
  DialogHeaderStyled,
  DialogContentStyled,
  InputWrapper,
  Input,
  ClearButton,
  List,
  Content,
  Footer,
  Address,
  CodeWrapper,
  Code,
  CodePretty,
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
  const inputRef = React.useRef<HTMLInputElement>();

  const { data, status: propertiesSearchStatus } = useAppSelectorBlaBlaBal('propertiesSearchReducer') as IServiceRequest;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resultList = data ? data as unknown as Record<string, any> : [];

  const [searchValue, setSearchValue] = React.useState<string>('');

  const handleInputClear = () => setSearchValue('');

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
          <InputWrapper>
            <SearchIcon fontSize='large' />
            <Input ref={inputRef} placeholder='Código, rua, proprietário...' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} autoFocus autoComplete="off" />
            <ClearButton onClick={handleInputClear}>Limpar</ClearButton>
          </InputWrapper>
        </BootstrapDialogTitle>
        <DialogContentStyled dividers>
          {propertiesSearchStatus === 'loading' && (
            <PropertiesSearchSkeleton />
          )}
          {!!shouldRenderList && (
            <List>
              {resultList.paginate.data.map((item: IPropertyData, i: number) => (
                <React.Fragment>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      {hasProperty(item, 'photo.data') 
                        ? <Avatar 
                          alt={`${item.title} - Foto ${i}`} 
                          src={hasProperty(item, 'photo.data') ? getPhoto(item.photo.data, 'thumb') : ''}
                        />
                        : <Avatar>
                          <HomeIcon />
                        </Avatar>}
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.nomeImovel || 'NOME IMÓVEL'}
                      secondary={
                        <React.Fragment>
                          <Content>
                            <CodeWrapper>
                              <Code label={`Código: ${item.code || '--'}`} /> <CodePretty label={`Código tipo: ${item.codePretty || '--'}`} />
                            </CodeWrapper>
                            <Address>
                              <LocationOn sx={{ fontSize: '1.45rem' }} /> {renderAddress(item)}
                            </Address>
                          </Content>
                          <Footer>
                            {`Proprietário: ${item.owner.data.nomeRazao}`}
                          </Footer>
                        </React.Fragment>
                      }
                    />
                    <PropertiesActionsMenu item={item} handleCb={() => handleClose()} />
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