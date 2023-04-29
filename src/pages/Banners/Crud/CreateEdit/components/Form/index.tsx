import * as React from 'react';

import PropertiesAutocomplete from '../../../../../../components/Autocomplete/hocs/PropertiesAutocomplete';

import { hasProperty } from '../../../../../../helpers';

import { IPropertyData } from '../../../../../../types';

import { 
  WrapperInfo,
  BoxInfo,
  DividerSpacingRows,
} from './styles';

interface IProps {
  dataProperty?: IPropertyData
}

const Form = ({ dataProperty }: IProps) => {
  return (
    <React.Fragment>
      <WrapperInfo>
        <BoxInfo>
          <PropertiesAutocomplete defaultValue={hasProperty(dataProperty, 'id') ? dataProperty : {}} />
        </BoxInfo>
      </WrapperInfo>

      <DividerSpacingRows />
    </React.Fragment>
  );
};

export default Form;
