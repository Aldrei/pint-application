import * as React from 'react';

import SwipeableViews from 'react-swipeable-views';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';

import CloudDoneIcon from '@mui/icons-material/CloudDone';
import InfoIcon from '@mui/icons-material/Info';
import PhotoIcon from '@mui/icons-material/Photo';

import { useNavigate, useParams } from 'react-router-dom';

import SnackContext from '../../../../contexts/SnackContext';

import { ROUTES } from '../../../../constants/routes';

import useQuery from '../../../../hooks/useQuery';
import { useAppDispatch } from '../../../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';

import { IBannerData, IBannerServiceFieldsRequired, IBannerShow, IPropertyData, IServiceRequestTemp } from '../../../../types';

import { getMessage, hasProperty } from '../../../../helpers';

import BannerRepresentation from '../../../../components/BannerRepresentation';
import Button from '../../../../components/Button';

import Form from './components/Form';
import Photos from './components/Photos';
// import Video from './components/Video';

import { bannersShowThunk, bannersStoreThunk, bannersUpdateThunk, setStatusStore, setStatusUpdate } from '../../../../reducers/banners/crud';

import { IPropertySearchServiceRequest } from '../../../../reducers/properties/search';
import { BannerRepresentationContainer, DividerSpacingRows, PropertiesContainer, Title, WrapperTitle } from './styles';

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

const model = 'Banner';

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errors, setErrors] = React.useState<IBannerServiceFieldsRequired>({} as IBannerServiceFieldsRequired);
  const [banner, setBanner] = React.useState({} as IBannerData);

  const customSetBanner = (newData: any) => {
    console.log('customSetBanner newData:', newData);
    setBanner(newData);
  };

  const bannerIsSet = !!banner?.id;

  /**
   * Get data banner to edit banner.
  */
  React.useEffect(() => {
    if (id !== String(banner.id)) dispatch(bannersShowThunk(String(id)));
  }, [id]);

  const { crud: { read: { data: dataRead } } } = useAppSelectorBlaBlaBal('bannersCrudReducer') as IServiceRequestTemp;

  /**
   * Get data property.
  */
  const { propertySelected } = useAppSelectorBlaBlaBal('propertiesSearchReducer') as IPropertySearchServiceRequest;

  const bannerDataProperty = bannerIsSet && banner?.property?.data?.id ? banner.property.data : {} as IPropertyData;

  let property: IPropertyData = {} as IPropertyData;

  if (propertySelected?.[0]?.id) property = propertySelected?.[0];
  if (bannerDataProperty?.id) property = bannerDataProperty;

  const bannerDataIsDifferent = (!bannerIsSet && dataRead?.banner?.data?.id) && (dataRead?.banner?.data?.id !== banner?.id);

  /**
   *  Set banner edit.
  */
  /** Get data banner */
  React.useEffect(() => {
    if (bannerDataIsDifferent) {
      setBanner({ ...dataRead.banner.data });
    }
  }, [dataRead]);

  /**
   * Set banner create.
  */
  React.useEffect(() => {
    if (isCreate) {
      if (hasProperty(property, 'id')) {
        setBanner({
          ...banner,
          property_id: property.id,
          titulo: property.nomeImovel,
          descGeral: property.descGeral || '',
        });
      }
  
      if (!hasProperty(property, 'id') && banner.property_id) {
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
    create: { status: statusStore, data: dataStore }, 
    update: { status: propertiesUpdateStatus, data: propertiesUpdateData } 
  } } = useAppSelectorBlaBlaBal('bannersCrudReducer') as IServiceRequestTemp;
  
  const handleSubmitCreate = () => {
    dispatch(bannersStoreThunk(banner));
  };
  const handleSubmitUpdate = () => dispatch(bannersUpdateThunk(banner));
  
  React.useEffect(() => {
    /** Create. */
    if (statusStore === 'success' && hasProperty(dataStore, 'result.errors')) {
      dispatch(setStatusStore('idle'));
      snackContext.addMessage({ type: 'warning', message: getMessage({ action: 'store', type: 'errorRequired', model }) });
    }
  
    if (statusStore === 'success' && hasProperty(dataStore, 'status')) {
      const dataStoreTyped = dataStore as IBannerShow;
      dispatch(setStatusStore('idle'));
      if (dataStoreTyped.status === 200) snackContext.addMessage({ type: 'success', message: getMessage({ action: 'store', type: 'success', model }) });
      else snackContext.addMessage({ type: 'error', message: getMessage({ action: 'store', type: 'errorRequest', model }) });
    }
  
    if (statusStore === 'failed') {
      dispatch(setStatusStore('idle'));
      snackContext.addMessage({ type: 'error', message: getMessage({ action: 'store', type: 'errorRequest', model }) });
    }
  
    /** Update. */
    if (propertiesUpdateStatus === 'success' && hasProperty(propertiesUpdateData, 'result.errors')) {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'warning', message: getMessage({ action: 'update', type: 'errorRequired', model }) });
    }
  
    if (propertiesUpdateStatus === 'success' && hasProperty(propertiesUpdateData, 'status')) {
      const propertiesUpdateDataTyped = propertiesUpdateData as IBannerShow;
      dispatch(setStatusUpdate('idle'));
      if (propertiesUpdateDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: getMessage({ action: 'update', type: 'success', model }) });
      else snackContext.addMessage({ type: 'error', message: getMessage({ action: 'update', type: 'errorRequest', model }) });
    }
  
    if (propertiesUpdateStatus === 'failed') {
      dispatch(setStatusUpdate('idle'));
      snackContext.addMessage({ type: 'error', message: getMessage({ action: 'update', type: 'errorRequest', model }) });
    }
  }, [statusStore, propertiesUpdateData]);
  
  React.useEffect(() => {
    if (hasProperty(dataStore, 'banner.data.id') && isCreate) {
      const propertyShow = dataStore as IBannerShow;
      setTimeout(() => {
        navigate(ROUTES.slidesEdit.go({ id: propertyShow.banner.data.id }));
      }, 750);
    }
  }, [dataStore]);

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
    const dataStoreRequired = dataStore as IBannerServiceFieldsRequired;
    if (hasProperty(dataStoreRequired, 'errors')) {
      setErrors({ errors: { ...dataStoreRequired.errors } });
    }
  }, [dataStore]);
  
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
      return <Button data-testid="submit-create-button" fab text="Cadastrar e Avançar" icon={<CloudDoneIcon />} onClick={handleSubmitCreate} loading={(statusStore === 'loading')} />;

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
          <BannerRepresentation banner={banner} hideActions handelSetBanner={(banner) => customSetBanner(banner)} />
        </BannerRepresentationContainer>
      </TabPanel>
      <TabPanel value={activeTab} index={1} dir={theme.direction}>
        <Photos dataProperty={property} banner={banner} handelSetBanner={(banner) => customSetBanner(banner)} />
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
