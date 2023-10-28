import * as React from 'react';

/**
 * Third libs
*/
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ButtonGroup from '@mui/material/ButtonGroup';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LocationOn from '@mui/icons-material/LocationOn';

/**
 * Types
*/
import { IOwnerData, IPropertyData, IServiceRequest, ITimer } from '../../../../types';

/**
 * Helpers
*/
import { getPhoto, hasProperty } from '../../../../helpers';

/**
 * Context & Hooks
*/
import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';
import { useAppDispatch } from '../../../../hooks/useReducerDispatch';

/**
 * Reducers
*/
import { propertiesSearchThunk } from '../../../../reducers/properties/search';
import { ownersSearchThunk, IOwnerSearchServiceRequest } from '../../../../reducers/owners/search';

/**
 * Components
*/
import PropertiesActionsMenu from '../../../ActionsMenu/hocs/PropertiesActionsMenu';
import ListItems from '../../../ListItems';
import OwnersActionsMenu from '../../../ActionsMenu/hocs/OwnersActionsMenu';

import SearchSkeleton from './components/Skeleton';

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
  ButtonGroupWrapper,
  ButtonGroupButton
} from './styles';

/**
 * Constants
*/
const timer: ITimer = {
  id: 0,
  delay: 500,
};

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
}

interface IModal {
  open: boolean;
  handleClose: () => void;
}

const Modal = ({ handleClose, open }: IModal) => {
  /**
   * Hooks
  */
  const theme = useTheme();
  const dispatch = useAppDispatch();

  /**
   * Refs
  */
  const inputRef = React.useRef<HTMLInputElement>();

  /**
   * States
  */
  const [buttonGroupSelected, setButtonGroupSelected] = React.useState<number>(0);
  const [searchValue, setSearchValue] = React.useState<string>('');

  /**
   * Reducers
  */
  const { data: propertiesSearchReducerData, status: propertiesSearchStatus } = useAppSelectorBlaBlaBal('propertiesSearchReducer') as IServiceRequest;
  const propertiesResult = propertiesSearchReducerData ? propertiesSearchReducerData as Record<string, any> : [] as Record<string, any>;
  const shouldRenderProperties = (propertiesResult?.paginate?.data?.length && (searchValue && searchValue.length)) && propertiesSearchStatus !== 'loading';

  const { data: ownersSearchReducerData, status: ownersSearchReducerStatus } = useAppSelectorBlaBlaBal('ownersSearchReducer') as IOwnerSearchServiceRequest;
  const ownersResult = ownersSearchReducerData ? ownersSearchReducerData as Record<string, any> : [] as Record<string, any>;
  const shouldRenderOwners = !!(ownersResult?.data?.length && (searchValue && searchValue.length > 2)) && ownersSearchReducerStatus !== 'loading';

  /**
   * Target the search input
  */
  const handleInputClear = () => setSearchValue('');

  React.useEffect(() => {
    if (searchValue && searchValue.length) {
      if (timer.id) clearTimeout(timer.id);
      timer.id = setTimeout(() => {
        if (buttonGroupSelected === 0) dispatch(propertiesSearchThunk(searchValue));
        else if (buttonGroupSelected === 1 && searchValue.length > 2) dispatch(ownersSearchThunk(searchValue));
        else console.warn('Invalid value to search.');
        
      }, timer.delay) as unknown as number;
    }
  }, [searchValue]);

  React.useEffect(() => {
    if (timer.id) clearTimeout(timer.id);
    handleInputClear();
  }, [buttonGroupSelected]);

  /**
   * Renders
  */
  const renderAddress = (item: IPropertyData) => (
    `${item.city.data.long_desc} - ${item.neighborhood.data.nome}, ${item.localLogradouro}, núm. ${item.localNumero || '--'}, apto ${item.apApto || '--'} - CEP ${item.localCEP || '--'}`
  );

  const renderGroupButton = () => {
    return (
      <ButtonGroup size='small' variant="outlined" aria-label="outlined button group">
        <ButtonGroupButton onClick={() => setButtonGroupSelected(0)} className={buttonGroupSelected === 0 ? 'selected' : ''}>Imóveis</ButtonGroupButton>
        <ButtonGroupButton onClick={() => setButtonGroupSelected(1)} className={buttonGroupSelected === 1 ? 'selected' : ''}>Clientes</ButtonGroupButton>
      </ButtonGroup>
    );
  };

  const renderResults = () => {
    if (buttonGroupSelected === 0 && propertiesSearchStatus === 'loading')
      return <SearchSkeleton />;

    if (buttonGroupSelected === 1 && ownersSearchReducerStatus === 'loading')
      return <SearchSkeleton />;

    if (buttonGroupSelected === 1 && !!shouldRenderOwners)
      return (
        <ListItems<IOwnerData>
          dataResult={ownersResult.data} 
          hideAvatar={false}
          primaryInfo='nomeRazao'
          secondaryInfo='logradouro'
          actionsComponent={(item: IOwnerData) => <OwnersActionsMenu item={item} handleCb={() => handleClose()} />}
        />
      );

    if (buttonGroupSelected === 0 && !!shouldRenderProperties)
      return (
        <List>
          {propertiesResult.paginate.data.map((item: IPropertyData, i: number) => (
            <React.Fragment key={String(i)}>
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
      );

    return null;
  };

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
        <DialogHeaderStyled
          id="customized-dialog-title"
          sx={{
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <ButtonGroupWrapper>
            {renderGroupButton()}
          </ButtonGroupWrapper>
          <InputWrapper>
            <SearchIcon fontSize='large' />
            <Input ref={inputRef} placeholder={`${buttonGroupSelected === 0 ? 'Código do imóvel' : 'Nome do cliente'}...`} onChange={(e) => setSearchValue(e.target.value)} value={searchValue} autoFocus autoComplete="off" />
            <ClearButton onClick={handleInputClear}>Limpar</ClearButton>
          </InputWrapper>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              padding: 0,
              alignSelf: 'flex-end',
              position: 'absolute'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogHeaderStyled>
        <DialogContentStyled dividers>
          {renderResults()}
        </DialogContentStyled>
      </DialogStyled>
    </Box>
  );
};

export default Modal;