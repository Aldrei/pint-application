import * as React from 'react';

import List from '@mui/material/List';
// import LocationOffIcon from '@mui/icons-material/LocationOff';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

/**
 * Leaflet Maps.
 */
// import {
//   MapContainer,
//   TileLayer,
//   Circle,
// } from 'react-leaflet';

// import { useAppDispatch } from '../../../stores/hooks';
// import { propertiesShowThunk, IPropertiesShowServiceRequest } from '../../../reducers/properties/create';

// import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';
// import { useBreakpoints } from '../../../hooks/useBreakpoints';

// import { IPropertyData } from '../../../types';

// import { hasProperty } from '../../../helpers';

// import PropertyDetailItemSkeleton from './components/Skeleton';
import Info from './components/Info';

import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

import Check from '@mui/icons-material/Check';

import { PropertiesContainer } from './styles';

const PropertiesCreate = () => {
  // const [goSm, goMd, goLg, goXl] = useBreakpoints();

  // const propertiesShowReducerData = useAppSelectorBlaBlaBal('propertiesShowReducer') as IPropertiesShowServiceRequest;
  // const PROPERTIES_STATUS = propertiesShowReducerData.status;
  // const PROPERTIES_DETAIL = propertiesShowReducerData.data as IPropertyShow;

  // const propertiesPhotosReducerData = useAppSelectorBlaBlaBal('propertiesPhotosReducer') as IPropertiesPhotosServiceRequest;
  // const PROPERTIES_PHOTOS = propertiesPhotosReducerData.data as IPaginateDefault;
  // const PROPERTIES_PHOTOS_STATUS = propertiesPhotosReducerData.status;

  // const dispatch = useAppDispatch();

  React.useEffect(() => {
    // dispatch(propertiesShowThunk(paginate.code));
    // dispatch(propertiesPhotosThunk(paginate.code));
  }, []);

  // const resolveGrid = () => {
  //   if (goXl) return 6;
  //   if (goLg) return 5;
  //   if (goMd) return 4;
  //   if (goSm) return 2;
  //   return 1;
  // };


  /**
   * Steps.
  */
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#784af4',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));
  
  const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
      color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
      display: 'flex',
      flexDirection: 'row',
      height: 22,
      alignItems: 'center',
      ...(ownerState.active && {
        color: '#784af4',
      }),
      '& .QontoStepIcon-completedIcon': {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
      },
      '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
      },
    }),
  );
  
  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
  
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  const [activeStep] = React.useState(0);
  
  const steps = ['Informações', 'Mapa', 'Fotos', 'Vídeo'];

  const renderSteppers = () => {
    return (
      <Stack sx={{ width: '100%' }} spacing={4}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
          {steps.map((label, i) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    );
  };

  const renderStepContent = () => (
    <List style={{ width: '100%', marginTop: '20px' }}>
      <React.Fragment>
        <Info />
      </React.Fragment>
    </List>
  );

  return (
    <PropertiesContainer data-testid='propertiesList-container'>
      {renderSteppers()}
      {renderStepContent()}
    </PropertiesContainer>
  );
};

export default PropertiesCreate;