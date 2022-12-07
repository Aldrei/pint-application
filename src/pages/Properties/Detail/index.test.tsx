import React from 'react';

import { render } from '@testing-library/react';

import { createMatchMedia } from '../../../helpers/test';
import renderThemeProvider from '../../../helpers/test/renderThemeProvider';

import { PROPERTIES_PHOTOS_REDUCER, PROPERTY_SHOW_REDUCER } from '../../../mocks/constants';

import { IPropertiesShowServiceRequest } from '../../../reducers/properties/show';
import { IPropertiesPhotosServiceRequest } from '../../../reducers/properties/photos/list';

import { useAppSelectorBlaBlaBal } from '../../../hooks/useReducerSelector';

import PropertyDetail from './index';

jest.mock('../../../components/Lightbox');

jest.mock('react-leaflet', () => ({
  MapContainer: jest.fn(),
  TileLayer: jest.fn(),
  Circle: jest.fn(),
}));

jest.mock('../../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn()
}));

jest.mock('../../../hooks/useReducerDispatch', () => ({
  useAppDispatch: jest.fn
}));

describe('Property detail page', () => {
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;

  beforeAll(() => {
    jest.resetAllMocks();
  });

  it('Should render correctly', () => {
    const dataDeep = JSON.parse(JSON.stringify(PROPERTY_SHOW_REDUCER));
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(dataDeep as unknown as IPropertiesShowServiceRequest);

    const dataPhotoMock = PROPERTIES_PHOTOS_REDUCER as unknown as IPropertiesPhotosServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(JSON.parse(JSON.stringify(dataPhotoMock)));

    const nodeEl = render(<PropertyDetail />);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should check match window to SM', () => {
    const dataMock = PROPERTY_SHOW_REDUCER as unknown as IPropertiesShowServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(JSON.parse(JSON.stringify(dataMock)));

    const dataPhotoMock = PROPERTIES_PHOTOS_REDUCER as unknown as IPropertiesPhotosServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(JSON.parse(JSON.stringify(dataPhotoMock)));

    window.matchMedia = createMatchMedia(600);

    const nodeEl = renderThemeProvider(<PropertyDetail />);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should check match window to MD', () => {
    const dataMock = PROPERTY_SHOW_REDUCER as unknown as IPropertiesShowServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(JSON.parse(JSON.stringify(dataMock)));

    const dataPhotoMock = PROPERTIES_PHOTOS_REDUCER as unknown as IPropertiesPhotosServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(JSON.parse(JSON.stringify(dataPhotoMock)));

    window.matchMedia = createMatchMedia(900);

    const nodeEl = renderThemeProvider(<PropertyDetail />);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should check match window to LG', () => {
    const dataMock = PROPERTY_SHOW_REDUCER as unknown as IPropertiesShowServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(JSON.parse(JSON.stringify(dataMock)));

    const dataPhotoMock = PROPERTIES_PHOTOS_REDUCER as unknown as IPropertiesPhotosServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(JSON.parse(JSON.stringify(dataPhotoMock)));

    window.matchMedia = createMatchMedia(1200);

    const nodeEl = renderThemeProvider(<PropertyDetail />);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should check match window to XL', () => {
    const dataMock = PROPERTY_SHOW_REDUCER as unknown as IPropertiesShowServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(JSON.parse(JSON.stringify(dataMock)));

    const dataPhotoMock = PROPERTIES_PHOTOS_REDUCER as unknown as IPropertiesPhotosServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(JSON.parse(JSON.stringify(dataPhotoMock)));

    window.matchMedia = createMatchMedia(1536);

    const nodeEl = renderThemeProvider(<PropertyDetail />);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should render when there is no map', () => {
    const dataDeep = JSON.parse(JSON.stringify(PROPERTY_SHOW_REDUCER));
    dataDeep.data.property.data.latitude = '';
    dataDeep.data.property.data.longitude = '';
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(dataDeep as unknown as IPropertiesShowServiceRequest);

    const dataPhotoMock = PROPERTIES_PHOTOS_REDUCER as unknown as IPropertiesPhotosServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(JSON.parse(JSON.stringify(dataPhotoMock)));

    const nodeEl = render(<PropertyDetail />);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should render when map is not published', () => {
    const dataDeep = JSON.parse(JSON.stringify(PROPERTY_SHOW_REDUCER));
    dataDeep.data.property.data.sitePublicarMapa = null;
    dataDeep.data.property.data.zoom = 0;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(dataDeep as unknown as IPropertiesShowServiceRequest);

    const dataPhotoMock = PROPERTIES_PHOTOS_REDUCER as unknown as IPropertiesPhotosServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(JSON.parse(JSON.stringify(dataPhotoMock)));

    const nodeEl = render(<PropertyDetail />);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should render when not found data property', () => {
    const dataMock = { status: 'idle', data: '' } as unknown as IPropertiesShowServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(dataMock);

    const dataPhotoMock = { data: '' } as unknown as IPropertiesPhotosServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(dataPhotoMock);

    const nodeEl = render(<PropertyDetail />);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should render loading', () => {
    const dataMock = { status: 'loading', data: '' } as unknown as IPropertiesShowServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(dataMock);

    const dataPhotoMock = { data: '' } as unknown as IPropertiesPhotosServiceRequest;
    useAppSelectorBlaBlaBalMocked.mockReturnValueOnce(dataPhotoMock);

    const nodeEl = render(<PropertyDetail />);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
