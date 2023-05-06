import * as React from 'react';

import SwipeableViews from 'react-swipeable-views';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InfoIcon from '@mui/icons-material/Info';
import PhotoIcon from '@mui/icons-material/Photo';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

import { useNavigate } from 'react-router-dom';

import SnackContext from '../../../../contexts/SnackContext';

import { ROUTES } from '../../../../constants/routes';
import { messages } from '../../../../constants/messages';

import useQuery from '../../../../hooks/useQuery';
import { useAppDispatch } from '../../../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';

import { IPropertyData, IBannerData, IBannerShow, IBannerServiceFieldsRequired, IServiceRequestTemp } from '../../../../types';

import { hasProperty } from '../../../../helpers';

import Button from '../../../../components/Button';
import BannerRepresentation from '../../../../components/BannerRepresentation';

import Form from './components/Form';
import Photos from './components/Photos';
// import Video from './components/Video';

import { IPropertySearchServiceRequest } from '../../../../reducers/properties/search';
import { bannersStoreThunk, bannersUpdateThunk, setStatusStore, setStatusUpdate } from '../../../../reducers/banners/crud';

import { PropertiesContainer, WrapperTitle, Title, BannerRepresentationContainer, DividerSpacingRows } from './styles';

// const property = {} as IPropertyData;
// const banner = {} as IBannerData;

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const CreateEdit = () => {
  /**
   * Contexts.
  */
  const snackContext = React.useContext(SnackContext);

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /**
   * States.
  */
  const [crudType, setCrudType] = React.useState<string>('create');
  const [errors, setErrors] = React.useState<IBannerServiceFieldsRequired>({} as IBannerServiceFieldsRequired);

  const [banner, setBanner] = React.useState({} as IBannerData);

  /**
   * Get data property.
  */
  const { propertySelected } = useAppSelectorBlaBlaBal('propertiesSearchReducer') as IPropertySearchServiceRequest;

  const dataProperty = propertySelected?.length ? propertySelected[0] : {} as IPropertyData;

  /**
   * Get banner.
  */
  React.useEffect(() => {
    if (hasProperty(dataProperty, 'id')) {
      setBanner({
        ...banner,
        property_id: dataProperty.id,
        titulo: dataProperty.nomeImovel ? dataProperty.nomeImovel : dataProperty.title,
        descGeral: dataProperty.descGeral || '',
      });
    }

    if (!hasProperty(dataProperty, 'id') && banner.property_id) {
      setBanner({
        ...banner,
        property_id: undefined,
        titulo: '',
        descGeral: '',
        link: ''
      });
    }
  }, [propertySelected]);

  console.log('DEBUG banner:', banner);
  console.log('DEBUG dataProperty:', dataProperty);

  const resolveTitle = () => {
    return (
      <WrapperTitle>
        <Title>NOVO BANNER</Title>
      </WrapperTitle>
    );
  };

  /**
   * Resolve tab.
  */
  const queryParams = useQuery();

  const resolveTabByParam = (): number => {
    switch (queryParams.get('tab')) {
    case 'infos': return 0;
    case 'photos': return 1;
    // case 'video': return 2;
    default: return 0;
    }
  };

  const [activeTab, setActiveTab] = React.useState<number>(resolveTabByParam());

  React.useEffect(() => {
    setActiveTab(resolveTabByParam());
  }, [queryParams]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // navigate(ROUTES.propertiesEdit.go({ code: property.code, tab: resolveTabByIndex(newValue) }));
    setActiveTab(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setActiveTab(index);
  };

  /**
   * Submit create/edit.
  */
  const { crud: { 
    create: { status: propertiesStoreStatus, data: propertiesStoreData }, 
    update: { status: propertiesUpdateStatus, data: propertiesUpdateData } 
  } } = useAppSelectorBlaBlaBal('bannersCrudReducer') as IServiceRequestTemp;
  
  console.log('DEBUG propertiesStoreStatus:', propertiesStoreStatus);
  console.log('DEBUG propertiesStoreData:', propertiesStoreData);
  
  const handleSubmitCreate = () => {
    console.log('DEBUG CLICK bannersStoreThunk.');
    dispatch(bannersStoreThunk(banner));
  };
  const handleSubmitUpdate = () => dispatch(bannersUpdateThunk(banner));
  
  React.useEffect(() => {
    /** Create. */
    if (propertiesStoreStatus === 'success' && hasProperty(propertiesStoreData, 'result.errors')) {
      dispatch(setStatusStore('idle'));
      snackContext.addMessage({ type: 'warning', message: messages.pt.properties.store.errorRequired });
    }
  
    if (propertiesStoreStatus === 'success' && hasProperty(propertiesStoreData, 'status')) {
      const propertiesStoreDataTyped = propertiesStoreData as IBannerShow;
      dispatch(setStatusStore('idle'));
      if (propertiesStoreDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: messages.pt.properties.store.success });
      else snackContext.addMessage({ type: 'error', message: messages.pt.properties.store.errorRequest });
    }
  
    if (propertiesStoreStatus === 'failed') {
      dispatch(setStatusStore('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.properties.store.errorRequest });
    }
  
    /** Update. */
    if (propertiesUpdateStatus === 'success' && hasProperty(propertiesUpdateData, 'result.errors')) {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'warning', message: messages.pt.properties.store.errorRequired });
    }
  
    if (propertiesUpdateStatus === 'success' && hasProperty(propertiesUpdateData, 'status')) {
      const propertiesUpdateDataTyped = propertiesUpdateData as IBannerShow;
      dispatch(setStatusUpdate('idle'));
      if (propertiesUpdateDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: messages.pt.properties.store.success });
      else snackContext.addMessage({ type: 'error', message: messages.pt.properties.store.errorRequest });
    }
  
    if (propertiesUpdateStatus === 'failed') {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.properties.store.errorRequest });
    }
  }, [propertiesStoreStatus, propertiesUpdateData]);
  
  React.useEffect(() => {
    if (hasProperty(propertiesStoreData, 'banner.data.id') && crudType === 'create') {
      const propertyShow = propertiesStoreData as IBannerShow;
      setTimeout(() => {
        navigate(ROUTES.slidesEdit.go({ id: propertyShow.banner.data.id }));
      }, 750);
    }
  }, [propertiesStoreData]);
    
  /** Submit return fields required to create. */
  React.useEffect(() => {
    const propertiesStoreDataRequired = propertiesStoreData as IBannerServiceFieldsRequired;
    if (hasProperty(propertiesStoreDataRequired, 'errors')) {
      setErrors({ errors: { ...propertiesStoreDataRequired.errors } });
    }
  }, [propertiesStoreData]);
  
  /** Submit return fields required to update. */
  React.useEffect(() => {
    const propertiesUpdateDataRequired = propertiesUpdateData as IBannerServiceFieldsRequired;
    if (hasProperty(propertiesUpdateDataRequired, 'errors')) {
      setErrors({ errors: { ...propertiesUpdateDataRequired.errors } });
    }
  }, [propertiesUpdateData]);

  /**
   * Render.
  */
  const renderButtonSubmit = () => {
    if (crudType === 'create')
      return <Button data-testid="submit-create-button" fab text="Cadastrar e Avançar" icon={<CloudDoneIcon />} onClick={handleSubmitCreate} loading={(propertiesStoreStatus === 'loading')} />;

    return <Button fab text="Salvar Informações" icon={<CloudDoneIcon />} onClick={handleSubmitUpdate} disabled={(propertiesUpdateStatus === 'loading')} />;
  };

  const renderTabs = () => {
    return (
      <Tabs
        sx={{ '& .MuiTabs-flexContainer': { flexDirection: 'row' } }}
        value={activeTab}
        onChange={handleChange}
        indicatorColor="secondary"
        variant="fullWidth"
        aria-label="Property create-edit"
      >
        <Tab icon={<InfoIcon />} label="Infos" {...a11yProps(0)} />
        <Tab icon={<PhotoIcon />} label="Foto" {...a11yProps(1)} />
        {/* <Tab icon={<SmartDisplayIcon />} label="Vídeo" {...a11yProps(2)} disabled={Boolean(!property.code)} /> */}
      </Tabs>
    );
  };

  const renderTabsContent = () => (
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeTab}
      onChangeIndex={handleChangeIndex}
    >
      <TabPanel value={activeTab} index={0} dir={theme.direction}>
        <Form dataProperty={dataProperty} />
        <DividerSpacingRows />
        <BannerRepresentationContainer>
          <BannerRepresentation banner={banner} mode="create" />
        </BannerRepresentationContainer>
      </TabPanel>
      <TabPanel value={activeTab} index={1} dir={theme.direction}>
        <Photos dataProperty={dataProperty} banner={banner} handelSetBanner={(banner) => setBanner(banner)} />
        <DividerSpacingRows />
        <BannerRepresentationContainer>
          <BannerRepresentation banner={banner} mode="readonly" />
        </BannerRepresentationContainer>
      </TabPanel>
      {/* <TabPanel value={activeTab} index={2} dir={theme.direction}>
        <Video dataProperty={property} />
      </TabPanel> */}
    </SwipeableViews>
  );

  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      {resolveTitle()}
      {renderTabs()}
      {renderTabsContent()}
      <Box style={{ alignItems: 'end' }}>
        {renderButtonSubmit()}
      </Box>
    </PropertiesContainer>
  );
};

export default CreateEdit;
