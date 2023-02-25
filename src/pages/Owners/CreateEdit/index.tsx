import * as React from 'react';

import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import InfoIcon from '@mui/icons-material/Info';

import useQuery from '../../../hooks/useQuery';

import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';
import { useAppDispatch } from '../../../hooks/useReducerDispatch';

import { ownersShowThunk, IOwnersShowServiceRequest } from '../../../reducers/owners/show';

import { IOwnerData, IOwnerShow } from '../../../types';

import { hasProperty } from '../../../helpers';

import { ROUTES } from '../../../constants/routes';

import Form from './components/Form';

import { PropertiesContainer, WrapperTitle, Title } from './styles';

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
  const [property, setProperty] = React.useState<IOwnerData>({} as IOwnerData);
  const { id } = useParams();

  React.useEffect(() => {
    if (id !== String(property.id)) dispatch(ownersShowThunk(String(id)));
  }, [id]);

  const { data: dataOwner } = useAppSelectorBlaBlaBal('ownersShowReducer') as IOwnersShowServiceRequest;

  React.useEffect(() => {
    const newDataOwner = dataOwner as unknown as IOwnerShow || {} as IOwnerShow;

    if (id && hasProperty(newDataOwner, 'owner.data.id')) {
      setProperty({ ...newDataOwner.owner.data });
    }
  }, [dataOwner]);

  const resolveTitle = () => {
    if (id) {
      if (!property.id) return null;
      return (
        <WrapperTitle>
          {property.nomeRazao && <Title>{property.nomeRazao}</Title>}
        </WrapperTitle>
      );
    }

    return (
      <WrapperTitle>
        <Title>NOVO CLIENTE</Title>
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
    default: return 0;
    }
  };

  const resolveTabByIndex = (i: number): string => {
    switch (i) {
    case 0: return 'infos';
    default: return '';
    }
  };

  const [activeTab, setActiveTab] = React.useState<number>(resolveTabByParam());

  React.useEffect(() => {
    setActiveTab(resolveTabByParam());
  }, [queryParams]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    navigate(ROUTES.ownersEdit.go({ id: property.id, tab: resolveTabByIndex(newValue) }));
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
        <Form dataOwner={property} />
      </TabPanel>
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
