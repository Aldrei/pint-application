import { useAppSelectorBlaBlaBal } from './index';

import renderReduxProvider from '../../helpers/test/renderReduxProvider';

import { IAutyState } from '../../reducers/auty';
import { IReducersType } from '../../stores';

interface IPropsComponentTest {
  reducerName: keyof IReducersType;
}

const ComponentTest = ({ reducerName }: IPropsComponentTest): React.ReactElement => {
  const { name } = useAppSelectorBlaBlaBal(reducerName) as IAutyState;
  return <span>{`ReducerName: ${name}`}</span>;
};

describe('Helper dataFormControl', () => {
  it('Should return authReducer data', () => {
    const reducerName = 'authReducer';
    const nodeEl = renderReduxProvider(<ComponentTest reducerName={reducerName} />);
    expect(nodeEl.baseElement).toHaveTextContent(`ReducerName: ${reducerName}`);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should return propertiesListReducer data', () => {
    const reducerName = 'propertiesListReducer';
    const nodeEl = renderReduxProvider(<ComponentTest reducerName={reducerName} />);
    expect(nodeEl.baseElement).toHaveTextContent(`ReducerName: ${reducerName}`);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should return propertiesShowReducer data', () => {
    const reducerName = 'propertiesShowReducer';
    const nodeEl = renderReduxProvider(<ComponentTest reducerName={reducerName} />);
    expect(nodeEl.baseElement).toHaveTextContent(`ReducerName: ${reducerName}`);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should return propertiesPhotosReducer data', () => {
    const reducerName = 'propertiesPhotosReducer';
    const nodeEl = renderReduxProvider(<ComponentTest reducerName={reducerName} />);
    expect(nodeEl.baseElement).toHaveTextContent(`ReducerName: ${reducerName}`);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
