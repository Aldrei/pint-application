import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';

import PhotoIcon from '@mui/icons-material/Photo';

import useQuery from '../../../hooks/useQuery';

import { ROUTES } from '../../../constants/routes';

import BannersListDelete from '../../Banners/Crud/ListDelete';

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

  /**
   * Resolve tab.
  */
  const queryParams = useQuery();

  const resolveTabByParam = (): number => {
    switch (queryParams.get('tab')) {
    case 'Banners': return 0;
    default: return 0;
    }
  };

  const [activeTab, setActiveTab] = React.useState<number>(resolveTabByParam());

  React.useEffect(() => {
    setActiveTab(resolveTabByParam());
  }, [queryParams]);

  const handleChange = () => {
    navigate(ROUTES.slidesEdit.go({}));
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
        <Tab icon={<PhotoIcon />} label="Banners" {...a11yProps(0)} />
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
        <BannersListDelete />
      </TabPanel>
    </SwipeableViews>
  );

  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      {renderTabs()}
      {renderTabsContent()}
    </PropertiesContainer>
  );
};

export default CreateEdit;
