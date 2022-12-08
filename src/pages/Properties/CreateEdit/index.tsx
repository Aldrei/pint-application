import * as React from 'react';

import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InfoIcon from '@mui/icons-material/Info';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoIcon from '@mui/icons-material/Photo';

import useQuery from '../../../hooks/useQuery';

import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';
import { useAppDispatch } from '../../../hooks/useReducerDispatch';

import { propertiesShowThunk, IPropertiesShowServiceRequest } from '../../../reducers/properties/show';

import { IPropertyData, IPropertyShow } from '../../../types';

import { hasProperty } from '../../../helpers';

import { ROUTES } from '../../../constants/routes';

import Form from './components/Form';
import Map from './components/Map';
import Photos from './components/Photos';
import Video from './components/Video';

import { PropertiesContainer } from './styles';

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
  const navigate = useNavigate();

  const theme = useTheme();
  const dispatch = useAppDispatch();

  /**
   * Resolve data property.
  */
  const [property, setProperty] = React.useState<IPropertyData>({} as IPropertyData);
  const { code } = useParams();

  React.useEffect(() => {
    if (code !== String(property.code)) dispatch(propertiesShowThunk(String(code)));
  }, [code]);

  const { data: dataProperty } = useAppSelectorBlaBlaBal('propertiesShowReducer') as IPropertiesShowServiceRequest;

  React.useEffect(() => {
    const newDataProperty = dataProperty as unknown as IPropertyShow || {} as IPropertyShow;

    if (code && hasProperty(newDataProperty, 'property.data.id')) {
      setProperty({ ...newDataProperty.property.data });
    }
  }, [dataProperty]);

  /**
   * Resolve step.
  */
  const queryParams = useQuery();

  const resolveStepByParam = (): number => {
    switch (queryParams.get('step')) {
    case 'infos': return 0;
    case 'map': return 1;
    case 'photos': return 2;
    case 'video': return 3;
    default: return 0;
    }
  };

  const resolveStepByIndex = (i: number): string => {
    switch (i) {
    case 0: return 'infos';
    case 1: return 'map';
    case 2: return 'photos';
    case 3: return 'video';
    default: return 'infos';
    }
  };

  const [activeStep, setActiveStep] = React.useState<number>(resolveStepByParam());

  React.useEffect(() => {
    setActiveStep(resolveStepByParam());
  }, [queryParams]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(ROUTES.propertiesEdit.go({ code: property.code, tab: resolveStepByIndex(newValue) }));
  };

  const handleChangeIndex = (index: number) => {
    setActiveStep(index);
  };

  /**
   * Render.
  */
  const renderSteppers = () => {
    return (
      <Tabs
        sx={{ '& .MuiTabs-flexContainer': { flexDirection: 'row' } }}
        value={activeStep}
        onChange={handleChange}
        indicatorColor="secondary"
        variant="fullWidth"
        aria-label="Property create-edit"
      >
        <Tab icon={<InfoIcon />} label="Infos" {...a11yProps(0)} />
        <Tab icon={<LocationOnIcon />} label="Mapa" {...a11yProps(1)} disabled={Boolean(!property.code)} />
        <Tab icon={<PhotoIcon />} label="Fotos" {...a11yProps(2)} disabled={Boolean(!property.code)} />
        <Tab icon={<SmartDisplayIcon />} label="Vídeo" {...a11yProps(3)} disabled={Boolean(!property.code)} />
      </Tabs>
    );
  };

  const renderStepContent = () => (
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleChangeIndex}
    >
      <TabPanel value={activeStep} index={0} dir={theme.direction}>
        <Form dataProperty={property} />
      </TabPanel>
      <TabPanel value={activeStep} index={1} dir={theme.direction}>
        <Map dataProperty={property} />
      </TabPanel>
      <TabPanel value={activeStep} index={2} dir={theme.direction}>
        <Photos dataProperty={property} />
      </TabPanel>
      <TabPanel value={activeStep} index={3} dir={theme.direction}>
        <Video dataProperty={property} />
      </TabPanel>
    </SwipeableViews>
  );

  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      {renderSteppers()}
      {renderStepContent()}
    </PropertiesContainer>
  );
};

export default CreateEdit;
