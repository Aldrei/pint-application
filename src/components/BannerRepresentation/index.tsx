import React, { useEffect, useState } from 'react';

import { Card, CardMedia, CardContent, Typography, CardActions } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import Input from '../../components/Input';
import { getBannerPhoto, helperDataFormControl } from '../../helpers';
import { IBannerData } from '../../types';

import { ActionsContainer, ActionButton } from './styles';

interface IProps {
  mode?: 'create' | 'edit' | 'readonly' | 'onlyform'
  banner: IBannerData | undefined
  handleOnDelete?: (banner: IBannerData | undefined) => void
  handelSetBanner?: (banner: IBannerData) => void
}

const BannerRepresentation = ({ mode, banner, handleOnDelete }: IProps) => {
  const shouldRenderActions = Boolean(mode !== 'create' && mode !== 'readonly');

  const shouldRenderOnlyForm = Boolean(mode === 'onlyform');
  const shouldRenderInputs = Boolean(mode === 'create' || mode !== 'readonly' || shouldRenderOnlyForm);

  const [newBanner, setNewBanner] = useState({} as IBannerData);

  useEffect(() => {
    setNewBanner({
      titulo: banner?.titulo || '',
      descGeral: banner?.descGeral || '',
    } as IBannerData);
  }, [banner]);

  const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { name, value } = e.target;
      const newDataForm = helperDataFormControl<keyof IBannerData, IBannerData>(name as keyof IBannerData, value)(newBanner);

      setNewBanner(newDataForm);
    } catch (error) {
      /* istanbul ignore next */ 
      console.error('handleSetValue error:', error);
    }
  };

  const renderActions = (banner?: IBannerData) => {
    return (
      <ActionsContainer direction="row" spacing={1}>
        <ActionButton 
          size="small" 
          color="error" 
          startIcon={<DeleteIcon className='icon-delete' />}
          onClick={() => handleOnDelete?.(banner)}
          disabled={false}
        >
          Deletar
        </ActionButton>
        {/* <ActionButton 
          size="small" 
          color="primary" 
          startIcon={<FlipCameraIosIcon />} 
          onClick={() => setPhotoUpdate(banner)} 
          disabled={Boolean(photoUpdate)}
        >
          Girar
        </ActionButton> */}
      </ActionsContainer>
    );
  };

  return (
    <Card sx={{ maxWidth: 345, position: 'relative', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ width: '100%' }}>
        {!shouldRenderOnlyForm && <CardMedia
          component="img"
          // alt={banner?.titulo}
          height="140"
          image={getBannerPhoto(banner || {} as IBannerData, 'thumb')}
        />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {shouldRenderInputs ? <Input onChange={handleSetValue} value={newBanner?.titulo} data-testid="titulo" name="titulo" placeholder="Título" /> : banner?.titulo || ''}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {shouldRenderInputs ? <Input onChange={handleSetValue} value={newBanner?.descGeral} data-testid="descGeral" name="descGeral" placeholder="Descrição" type='multiline' /> : banner?.descGeral || ''}
          </Typography>
        </CardContent>
      </div>
      {!shouldRenderOnlyForm && <CardActions>
        {shouldRenderActions && renderActions(banner)}
      </CardActions>}
    </Card>
  );
};

export default BannerRepresentation;