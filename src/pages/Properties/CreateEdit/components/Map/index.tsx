import * as React from 'react';

import LocationOffIcon from '@mui/icons-material/LocationOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import FormControlLabel from '@mui/material/FormControlLabel';

import { hasFeature, hasProperty } from '../../../../../helpers';

import { IPropertyData } from '../../../../../types';

import { propertiesUpdateThunk, IPropertiesUpdateServiceRequest } from '../../../../../reducers/properties/update';

import { useAppDispatch } from '../../../../../stores/hooks';

import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

/**
 * Leaflet Maps.
*/
import {
  MapContainer,
  TileLayer,
  Circle,
  useMapEvents,
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

/** Styles */
import {
  MaterialUISwitch,
  CancelIconCustom,
  CheckCircleIconCustom,
} from '../Form/styles';

import {
  ContainerMapInfo,
  WrapperMap,
  WrapperMapInfo,
  WrapperMapLoading,
  MapLoading
} from './styles';

interface IProps {
  dataProperty?: IPropertyData
}

const Map = ({ dataProperty }: IProps) => {
  const dispatch = useAppDispatch();

  /**
   * dataProperty prop.
  */
  const [property, setProperty] = React.useState<IPropertyData>(hasProperty(dataProperty, 'code') ? dataProperty as IPropertyData : {} as IPropertyData);

  React.useEffect(() => {
    if (hasProperty(dataProperty, 'code') && !hasProperty(property, 'code')) {
      setProperty(dataProperty as IPropertyData);
      setPublicarImovel(hasFeature(dataProperty as IPropertyData, 'sitePublicarMapa'));
    }
  }, [dataProperty]);

  /**
   * Update submit.
  */
  const { status: statusSubmitUpdate } = useAppSelectorBlaBlaBal('propertiesUpdateReducer') as IPropertiesUpdateServiceRequest;

  const handleSubmitUpdate = () => {
    if (position || hasFeature(property, 'sitePublicarMapa') !== publicarImovel || zoom) {
      const newProperty = {
        ...property,
        ...(position ? {
          latitude: String(position[0]),
          longitude: String(position[1]),
        } : undefined),
        sitePublicarMapa: publicarImovel ? 1 : 0,
        ...(zoom ? { zoom: String(zoom) } : undefined),
      } as IPropertyData;

      dispatch(propertiesUpdateThunk(newProperty));
    }
  };

  /**
   * Current map state.
  */
  const hasMapSaved = (): boolean => Boolean((property.latitude && property.longitude));

  const [publicarImovel, setPublicarImovel] = React.useState<boolean>(false);
  const [position, setPosition] = React.useState<number[] | null>(null);
  const [zoom, setZoom] = React.useState<number | undefined>(undefined);

  const LocationFinderDummy = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
      zoom(e) {
        setZoom(e.target._zoom);
      },
    });
    return null;
  };

  const resolveLatLon = (): LatLngExpression => {
    if (position) return position as LatLngExpression;
    if (hasMapSaved()) return [Number(property.latitude), Number(property.longitude)];
    // Brasília, Brazil coordinates.
    return [-14.9652451, -50.0663553];
  };

  const resolveZoom = (): number => {
    if (zoom) return zoom;
    if (hasMapSaved() && property.zoom)
      return Number(property.zoom);
    return 4;
  };

  const resolveDisableSubmit = () => {
    if (hasFeature(property, 'sitePublicarMapa') !== publicarImovel || zoom) return false;
    if (statusSubmitUpdate === 'loading' || !position) return true;
    return false;
  };

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => setPublicarImovel(checked);

  /**
   * Render.
  */
  const renderButtonPublicarMapa = () => (
    <FormControlLabel
      control={<MaterialUISwitch icon={<CancelIconCustom />} checkedIcon={<CheckCircleIconCustom />} checked={publicarImovel} color="primary" name="sitePublicarImovel" onChange={handleChangeSwitch} />}
      label="Publicar imóvel no site"
    />
  );

  const renderMessageInfo = () => {
    if (!hasMapSaved())
      return <ContainerMapInfo>
        <WrapperMapInfo><LocationOffIcon /> O Mapa não foi configurado.</WrapperMapInfo>
        {renderButtonPublicarMapa()}
      </ContainerMapInfo>;

    if (hasMapSaved() && !hasFeature(property, 'sitePublicarMapa'))
      return <ContainerMapInfo>
        <WrapperMapInfo><NotListedLocationIcon /> Mapa configurado mas não publicado no site.</WrapperMapInfo>
        {renderButtonPublicarMapa()}
      </ContainerMapInfo>;
      
    return <ContainerMapInfo>
      <WrapperMapInfo><LocationOnIcon /> Mapa configurado e publicado no site.</WrapperMapInfo>
      {renderButtonPublicarMapa()}
    </ContainerMapInfo>;
  };

  const renderMap = () => {
    if (hasProperty(property, 'code'))
      return (
        <MapContainer
          center={resolveLatLon()}
          zoom={resolveZoom()}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Circle
            center={resolveLatLon()}
            fillColor="#829FD9"
            radius={500}
          />
          <LocationFinderDummy />
        </MapContainer>
      );
    return (
      <WrapperMapLoading>
        <MapLoading component="div" />
      </WrapperMapLoading>
    );
  };

  const resolveMap = () => {
    return (
      <>
        <WrapperMap>
          {renderMessageInfo()}
          {renderMap()}
        </WrapperMap>
        <Box style={{ alignItems: 'end', marginTop: '10px' }}>
          <Fab variant="extended" onClick={handleSubmitUpdate} disabled={resolveDisableSubmit()}>
            <CloudDoneIcon sx={{ mr: 1 }} />
            Salvar mapa
          </Fab>
        </Box>
      </>
    );
  };

  return resolveMap();
};

export default Map;