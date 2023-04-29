import * as React from 'react';

import SwipeableViews from 'react-swipeable-views';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InfoIcon from '@mui/icons-material/Info';
import PhotoIcon from '@mui/icons-material/Photo';

import useQuery from '../../../../hooks/useQuery';

import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';

import { IPropertyData, IBannerData } from '../../../../types';

import { hasProperty } from '../../../../helpers';

import BannerRepresentation from '../../../../components/BannerRepresentation';

import Form from './components/Form';
import Photos from './components/Photos';
// import Video from './components/Video';

import { PropertiesContainer, WrapperTitle, Title } from './styles';
import { IPropertySearchServiceRequest } from '../../../../reducers/properties/search';

const property = {} as IPropertyData;
const banner = {} as IBannerData;

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
  const theme = useTheme();

  /**
   * Resolve data property.
  */
  const { propertySelected } = useAppSelectorBlaBlaBal('propertiesSearchReducer') as IPropertySearchServiceRequest;
  console.log('DEBUG CreateEdit propertySelected:', propertySelected);

  const dataProperty = propertySelected?.length ? propertySelected[0] : {} as IPropertyData;

  if (hasProperty(dataProperty, 'id')) {
    console.log('DEBUG CreateEdit dataProperty:', dataProperty);
    banner.titulo = dataProperty.nomeImovel ? dataProperty.nomeImovel : dataProperty.title;
    banner.descGeral = dataProperty.descGeral || '';
  }

  console.log('DEBUG CreateEdit banner:', banner);

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
   * Render.
  */
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
        <Tab icon={<PhotoIcon />} label="Foto" {...a11yProps(1)} disabled={Boolean(!property.code)} />
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
        <BannerRepresentation banner={banner} mode="create" />
      </TabPanel>
      <TabPanel value={activeTab} index={1} dir={theme.direction}>
        <Photos dataProperty={dataProperty} />
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
    </PropertiesContainer>
  );
};

export default CreateEdit;
