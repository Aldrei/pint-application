import * as React from 'react';

import { useParams } from 'react-router-dom';

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepIconProps } from '@mui/material/StepIcon';

import Check from '@mui/icons-material/Check';

import useQuery from '../../../hooks/useQuery';

import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';
import { useAppDispatch } from '../../../stores/hooks';

import { propertiesShowThunk, IPropertiesShowServiceRequest } from '../../../reducers/properties/show';

import Form from './components/Form';

import { PropertiesContainer, QontoConnector, QontoStepIconRoot } from './styles';

const CreateEdit = () => {
  const dispatch = useAppDispatch();

  /**
   * Resolve data property.
  */
  const { code } = useParams();

  React.useEffect(() => {
    if (code) dispatch(propertiesShowThunk(String(code)));
  }, [code]);

  const { data: dataProperty } = useAppSelectorBlaBlaBal('propertiesShowReducer') as IPropertiesShowServiceRequest;

  React.useEffect(() => {
    console.log('DEBUG dataProperty:', dataProperty);
  }, [dataProperty]);

  /**
   * Resolve step.
  */
  const queryParams = useQuery();

  const resolveStepParam = (): number => {
    switch (queryParams.get('step')) {
    case 'map': return 1;
    case 'photos': return 2;
    case 'video': return 3;
    default: return 0;
    }
  };

  const [activeStep] = React.useState<number>(resolveStepParam());
  
  const steps = ['Informações', 'Mapa', 'Fotos', 'Vídeo'];
  
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

  const renderSteppers = () => {
    return (
      <Stack sx={{ width: '100%' }} spacing={4}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
          {steps.map((label) => (
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
        <Form />
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

export default CreateEdit;
