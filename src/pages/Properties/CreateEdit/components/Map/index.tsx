import * as React from 'react';

import LocationOffIcon from '@mui/icons-material/LocationOff';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';

import { hasFeature, hasProperty } from '../../../../../helpers';

import { IPropertyData, IPropertyShow } from '../../../../../types';

import { propertiesUpdateThunk, IPropertiesUpdateServiceRequest } from '../../../../../reducers/properties/update';
import { setStatus } from '../../../../../reducers/properties/update';

import { useAppDispatch } from '../../../../../hooks/useReducerDispatch';

import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import SnackContext from '../../../../../contexts/SnackContext';
import { messages } from '../../../../../constants/messages';

import mapZoomButtons from '../../../../../assets/map-zoom-buttons.png';
import mapArea from '../../../../../assets/map-area.png';

import Button from '../../../../../components/Button';

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
  ContainerMapInfoColLeft,
  WrapperMap,
  WrapperMapInfo,
  WrapperMapLoading,
  MapLoading,
  WrapperTip,
  TipText
} from './styles';

interface IProps {
  dataProperty?: IPropertyData
}

const Map = ({ dataProperty }: IProps) => {
  const dispatch = useAppDispatch();
  const snackContext = React.useContext(SnackContext);

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
  const { status: propertiesUpdateStatus, data: propertiesUpdateData } = useAppSelectorBlaBlaBal('propertiesUpdateReducer') as IPropertiesUpdateServiceRequest;

  React.useEffect(() => {
    /** Update. */
    if (propertiesUpdateStatus === 'success' && hasProperty(propertiesUpdateData, 'result.errors')) {
      dispatch(setStatus('idle'));
      snackContext.addMessage({ type: 'warning', message: messages.pt.properties.update.errorRequired });
    }

    if (propertiesUpdateStatus === 'success' && hasProperty(propertiesUpdateData, 'status')) {
      const propertiesUpdateDataTyped = propertiesUpdateData as IPropertyShow;
      dispatch(setStatus('idle'));
      if (propertiesUpdateDataTyped.status === 200) snackContext.addMessage({ type: 'success', message: messages.pt.properties.update.success });
      else snackContext.addMessage({ type: 'error', message: messages.pt.properties.update.errorRequest });
    }

    if (propertiesUpdateStatus === 'failed') {
      dispatch(setStatus('idle'));
      snackContext.addMessage({ type: 'error', message: messages.pt.properties.update.errorRequest });
    }
  }, [propertiesUpdateStatus]);

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
  const [position, setPosition] = React.useState<number[]>([0, 0]);
  const [zoom, setZoom] = React.useState<number | undefined>(undefined);

  const hasPosition = (): boolean => Boolean(position[0] !== 0 && position[1] !== 0);

  /** Get current location */
  const [forceRerender, setForceRerender] = React.useState<number>();

  const getMyCordenates = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(curPosition => {
        const { latitude, longitude } = curPosition.coords;
        if (latitude !== position[0] || longitude !== position[1]) {
          console.log('DEBUG latitude, longitude:', latitude, longitude);
          setPosition([latitude, longitude]);
          setZoom(13);
          setForceRerender(Math.random());
        }
      });
    } else {
      /* geolocation IS NOT available */
      console.warn('Geolocation IS NOT available!');
    }
  };

  const LocationFinderDummy = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setForceRerender(Math.random());
      },
      zoom(e) {
        setZoom(e.target._zoom);
        setForceRerender(Math.random());
      },
    });
    return null;
  };

  const resolveLatLon = (): LatLngExpression => {
    if (hasPosition()) return position as LatLngExpression;
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
    if (propertiesUpdateStatus === 'loading' || !hasPosition()) return true;
    return false;
  };

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => setPublicarImovel(checked);

  /**
   * Render.
  */
  const renderButtonPublicarMapa = () => (
    <FormControlLabel
      sx={{
        '& .MuiSwitch-root': {
          marginRight: '-4px'
        }
      }}
      control={
        <MaterialUISwitch icon={<CancelIconCustom />} 
          checkedIcon={<CheckCircleIconCustom />} 
          checked={publicarImovel} 
          color="primary" 
          name="sitePublicarImovel" 
          onChange={handleChangeSwitch} 
        />
      }
      label="Publicar imóvel no site"
    />
  );

  const renderMessageInfo = () => {
    let renderMessage = <React.Fragment>
      <LocationOnIcon /> Mapa configurado e publicado no site.
    </React.Fragment>;

    if (!hasMapSaved())
      renderMessage = <React.Fragment>
        <LocationOffIcon /> O Mapa não foi configurado.
      </React.Fragment>;

    if (hasMapSaved() && !hasFeature(property, 'sitePublicarMapa'))
      renderMessage = <React.Fragment>
        <NotListedLocationIcon /> Mapa configurado mas não publicado no site.
      </React.Fragment>;
      
    return <ContainerMapInfo>
      <ContainerMapInfoColLeft>
        <WrapperMapInfo>{renderMessage}</WrapperMapInfo>
        {renderButtonPublicarMapa()}
      </ContainerMapInfoColLeft>
      <Button icon={<PersonPinCircleIcon />} onClick={getMyCordenates} data-testid="button-get-my-location" color='blue' disabled={false} text='Usar minha região' />
    </ContainerMapInfo>;
  };

  const RenderMapContainer = React.useCallback(() => {
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
  }, [forceRerender, property]);

  const RenderMap = React.useCallback(() => {
    if (hasProperty(property, 'code'))
      return <RenderMapContainer />;
    return (
      <WrapperMapLoading>
        <MapLoading component="div" />
      </WrapperMapLoading>
    );
  }, [forceRerender, property]);

  const resolveMap = () => {
    return (
      <>
        <WrapperTip>
          <Alert sx={{ flexDirection: 'row', '& .MuiAlert-icon': { justifyContent: 'center' } }} variant="outlined" severity="info">
            <TipText sx={{ marginBottom: '-5px' }}>
              Use os botões 
              <img style={{ width: '20px', margin: '0 5px' }} src={mapZoomButtons} alt="Mapa dica - Zoom" /> 
              para dar zoom
            </TipText>
            <TipText>
              e arraste o mapa e clique para marcar a área 
              <img style={{ width: '42px', margin: '0 5px' }} src={mapArea} alt="Mapa dica - Raio" />
              do imóvel.
            </TipText>
          </Alert>
        </WrapperTip>
        <WrapperMap>
          {renderMessageInfo()}
          {RenderMap()}
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