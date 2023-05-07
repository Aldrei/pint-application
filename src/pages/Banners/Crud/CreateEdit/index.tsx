import * as React from 'react';

import SwipeableViews from 'react-swipeable-views';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InfoIcon from '@mui/icons-material/Info';
import PhotoIcon from '@mui/icons-material/Photo';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

import { useNavigate, useParams } from 'react-router-dom';

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
import { bannersStoreThunk, bannersUpdateThunk, bannersShowThunk, setStatusStore, setStatusUpdate } from '../../../../reducers/banners/crud';

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
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { id } = useParams();

  /**
   * States.
  */
  const isCreate = !id;

  const [errors, setErrors] = React.useState<IBannerServiceFieldsRequired>({} as IBannerServiceFieldsRequired);
  const [banner, setBanner] = React.useState({} as IBannerData);

  const bannerIsSetted = !!banner?.id;

  /**
   * Get data banner to edit banner.
  */
  React.useEffect(() => {
    if (id !== String(banner.id)) dispatch(bannersShowThunk(String(id)));
  }, [id]);

  const { crud: { read: { data: bannerReadData } } } = useAppSelectorBlaBlaBal('bannersCrudReducer') as IServiceRequestTemp;

  /**
   * Get data property.
  */
  const { propertySelected } = useAppSelectorBlaBlaBal('propertiesSearchReducer') as IPropertySearchServiceRequest;

  const dataProperty = isCreate && propertySelected?.length ? propertySelected[0] : {} as IPropertyData;
  const dataPropertyIsSetted = !!dataProperty?.id;

  const bannerDataIsDifferent = (!bannerIsSetted && bannerReadData?.banner?.data?.id) && (bannerReadData?.banner?.data?.id !== banner?.id);
  const bannerPropertyIsDifferent = (bannerIsSetted && dataPropertyIsSetted) && (banner?.property?.data?.id !== dataProperty?.id);

  const bannerDataProperty = bannerIsSetted && banner?.property?.data?.id ? banner.property.data : {} as IPropertyData;

  let property: IPropertyData;
  if (dataProperty?.id) property = dataProperty;
  if (bannerDataProperty?.id) property = bannerDataProperty;

  /**
   *  Set banner edit.
  */
  /** Get data banner */
  React.useEffect(() => {
    if (bannerDataIsDifferent) {
      setBanner({ ...bannerReadData.banner.data });
    }
  }, [bannerReadData]);

  React.useEffect(() => {
    if (!isCreate) {
      if (bannerPropertyIsDifferent) {
        // setBanner({ ...banner, property: { data: dataProperty } });
        console.log('DEBUG UPDATE banner.property and banner.property_id');
      }
    }
  }, [dataProperty]);

  /**
   * Set banner create.
  */
  React.useEffect(() => {
    if (isCreate) {
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
    }
  }, [propertySelected]);

  console.log('DEBUG banner:', banner);
  console.log('DEBUG dataProperty:', dataProperty);

  const resolveTitle = () => {
    return (
      <WrapperTitle>
        <Title>{isCreate ? 'NOVO BANNER' : 'EDITANDO BANNER'}</Title>
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
      snackContext.addMessage({ type: 'warning', message: messages.pt.banners.store.errorRequired });
    }
  
    if (propertiesStoreStatus === 'success' && hasProperty(propertiesStoreData, 'status')) {
      const propertiesStoreDataTyped = propertiesStoreData as IBannerShow;
      dispatch(setStatusStore('idle'));
      if (propertiesStoreDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: messages.pt.banners.store.success });
      else snackContext.addMessage({ type: 'error', message: messages.pt.banners.store.errorRequest });
    }
  
    if (propertiesStoreStatus === 'failed') {
      dispatch(setStatusStore('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.banners.store.errorRequest });
    }
  
    /** Update. */
    if (propertiesUpdateStatus === 'success' && hasProperty(propertiesUpdateData, 'result.errors')) {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'warning', message: messages.pt.banners.update.errorRequired });
    }
  
    if (propertiesUpdateStatus === 'success' && hasProperty(propertiesUpdateData, 'status')) {
      const propertiesUpdateDataTyped = propertiesUpdateData as IBannerShow;
      dispatch(setStatusUpdate('idle'));
      if (propertiesUpdateDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: messages.pt.banners.update.success });
      else snackContext.addMessage({ type: 'error', message: messages.pt.banners.update.errorRequest });
    }
  
    if (propertiesUpdateStatus === 'failed') {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.banners.update.errorRequest });
    }
  }, [propertiesStoreStatus, propertiesUpdateData]);
  
  React.useEffect(() => {
    if (hasProperty(propertiesStoreData, 'banner.data.id') && isCreate) {
      const propertyShow = propertiesStoreData as IBannerShow;
      setTimeout(() => {
        navigate(ROUTES.slidesEdit.go({ id: propertyShow.banner.data.id }));
      }, 750);
    }
  }, [propertiesStoreData]);

  React.useEffect(() => {
    if (!isCreate && hasProperty(propertiesUpdateData, 'banner.data.id') && propertiesUpdateStatus === 'success') {
      const propertyShow = propertiesUpdateData as IBannerShow;
      setTimeout(() => {
        navigate(ROUTES.slidesEdit.go({ id: propertyShow.banner.data.id }));
      }, 750);
    }
  }, [propertiesUpdateData]);
    
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
    if (isCreate)
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
        <Form dataProperty={property} disableAutocomplete={!isCreate} />
        <DividerSpacingRows />
        <BannerRepresentationContainer>
          <BannerRepresentation banner={banner} hideActions handelSetBanner={(banner) => setBanner(banner)} />
        </BannerRepresentationContainer>
      </TabPanel>
      <TabPanel value={activeTab} index={1} dir={theme.direction}>
        <Photos dataProperty={property} banner={banner} handelSetBanner={(banner) => setBanner(banner)} />
        <DividerSpacingRows />
        <BannerRepresentationContainer>
          <BannerRepresentation banner={banner} hideActions hideInputs />
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
