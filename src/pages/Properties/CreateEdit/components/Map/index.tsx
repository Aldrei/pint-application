import * as React from 'react';

// import LocationOffIcon from '@mui/icons-material/LocationOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';

import { hasProperty } from '../../../../../helpers';

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

import {
  WrapperMap,
  WrapperMapInfo,
  WrapperMapLoading,
} from './styles';

interface IProps {
  dataProperty?: IPropertyData
}

const Map = ({ dataProperty }: IProps) => {
  const dispatch = useAppDispatch();

  const { data: dataSubmitUpdate, status: statusSubmitUpdate } = useAppSelectorBlaBlaBal('propertiesUpdateReducer') as IPropertiesUpdateServiceRequest;
  console.log('DEBUG-Map dataSubmitUpdate:', dataSubmitUpdate);

  const handleSubmitUpdate = () => {
    if (position) {
      const newProperty = {
        ...property,
        latitude: String(position[0]),
        longitude: String(position[1]),
        ...(zoom ? { zoom: String(zoom) } : undefined),
      } as IPropertyData;

      dispatch(propertiesUpdateThunk(newProperty));
    }
  };

  const [property, setProperty] = React.useState<IPropertyData>(hasProperty(dataProperty, 'code') ? dataProperty as IPropertyData : {} as IPropertyData);

  const [position, setPosition] = React.useState<number[] | null>(null);
  const [zoom, setZoom] = React.useState<number | undefined>(undefined);
  const LocationFinderDummy = () => {
    useMapEvents({
      click(e) {
        console.log('DEBUG position:', position);
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
      zoom(e) {
        console.log('DEBUG zoom:', zoom);
        setZoom(e.target._zoom);
      },
    });
    return null;
  };

  React.useEffect(() => {
    console.log('position:', position);
    console.log('zoom:', zoom);
  }, [position, zoom]);

  /**
   * dataProperty prop.
  */
  React.useEffect(() => {
    if (hasProperty(dataProperty, 'code') && !hasProperty(property, 'code')) {
      setProperty(dataProperty as IPropertyData);
    }
  }, [dataProperty]);

  const resolveLatLon = (): LatLngExpression => {
    if (position) return position as LatLngExpression;
    if (property.latitude && property.longitude) return [Number(property.latitude), Number(property.longitude)];
    // Brasília, Brazil coordinates.
    return [-14.9652451, -50.0663553];
  };
  console.log('DEBUG-Map latlon:', resolveLatLon());

  const resolveZoom = (): number => {
    if (zoom) return zoom;
    if (property.latitude && property.longitude && property.zoom)
      return Number(property.zoom);
    return 4;
  };
  console.log('DEBUG-Map resolveZoom():', resolveZoom());

  const resolveDisableSubmit = () => {
    if (statusSubmitUpdate === 'loading' || !position) return true;   
  };

  const renderMap = () => {
    if (hasProperty(property, 'code'))
      return <MapContainer
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
      </MapContainer>;
    return <WrapperMapLoading>
      <Typography>Carregando mapa...</Typography>
    </WrapperMapLoading>;
  };

  console.log('DEBUG-Map property:', property);

  const resolveMap = () => {
    return (
      <>
        <WrapperMap>
          {property.sitePublicarMapa !== 1
            ? (<WrapperMapInfo><NotListedLocationIcon /> Mapa configurado mas não publicado no site.</WrapperMapInfo>)
            : (<WrapperMapInfo><LocationOnIcon /> Mapa configurado e publicado no site.</WrapperMapInfo>)
          }
          {renderMap()}
        </WrapperMap>
        <Box style={{ alignItems: 'end', marginTop: '10px' }}>
          <Fab variant="extended" onClick={handleSubmitUpdate} disabled={resolveDisableSubmit()}>
            <CloudDoneIcon sx={{ mr: 1 }} />
            Salvar
          </Fab>
        </Box>
      </>
    );
  };

  return resolveMap();
};

export default Map;