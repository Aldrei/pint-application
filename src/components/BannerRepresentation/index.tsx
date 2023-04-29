import React, { useState } from 'react';

import { Card, CardMedia, CardContent, Typography, CardActions } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import Input from '../../components/Input';
import { getBannerPhoto, helperDataFormControl } from '../../helpers';
import { IBannerData } from '../../types';

import { ActionsContainer, ActionButton } from './styles';

interface IProps {
  mode?: string
  banner: IBannerData | undefined
  handleOnDelete?: (banner: IBannerData | undefined) => void
}

const BannerRepresentation = ({ mode, banner, handleOnDelete }: IProps) => {

  console.log('DEBUG banner:', banner);

  const isCreate = Boolean(mode === 'create');
  const shouldRenderActions = Boolean(mode !== 'create');

  const [form, setForm] = useState({} as IBannerData);

  const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { name, value } = e.target;
      const newDataForm = helperDataFormControl<keyof IBannerData, IBannerData>(name as keyof IBannerData, value)(form);

      setForm(newDataForm);
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
        <CardMedia
          component="img"
          alt={banner?.titulo}
          height="140"
          image={getBannerPhoto(banner || {} as IBannerData, 'thumb')}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {isCreate ? <Input onChange={handleSetValue} value={banner?.titulo} data-testid="titulo" name="titulo" placeholder="Título" /> : banner?.titulo || ''}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {isCreate ? <Input onChange={handleSetValue} value={banner?.descGeral} data-testid="descGeral" name="descGeral" placeholder="Descrição" type='multiline' /> : banner?.descGeral || ''}
          </Typography>
        </CardContent>
      </div>
      <CardActions>
        {shouldRenderActions && renderActions(banner)}
      </CardActions>
    </Card>
  );
};

export default BannerRepresentation;