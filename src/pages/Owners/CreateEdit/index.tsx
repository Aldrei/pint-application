import * as React from 'react';

import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';

import InfoIcon from '@mui/icons-material/Info';

import useQuery from '../../../hooks/useQuery';

import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';
import { useAppDispatch } from '../../../hooks/useReducerDispatch';

import { propertiesShowThunk, IPropertiesShowServiceRequest } from '../../../reducers/properties/show';

import { IPropertyData, IPropertyShow } from '../../../types';

import { hasProperty } from '../../../helpers';

import { ROUTES } from '../../../constants/routes';

import Form from './components/Form';

import { PropertiesContainer, WrapperTitle, Title, WrapperTitleCodes } from './styles';

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

  const resolveTitle = () => {
    if (code) {
      if (!property.code) return null;
      return (
        <WrapperTitle>
          {property.nomeImovel && <Title>{property.nomeImovel}</Title>}
          <WrapperTitleCodes>
            <Chip label={`Código: ${property.code || '--'}`} style={{ marginBottom: '5px', marginRight: '3px' }} />
            <Chip label={`Código tipo: ${property.codePretty || '--'}`} />
          </WrapperTitleCodes>
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
    navigate(ROUTES.propertiesEdit.go({ code: property.code, tab: resolveTabByIndex(newValue) }));
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
