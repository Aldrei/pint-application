import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Card, CardMedia, CardContent, Typography, CardActions } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { ROUTES } from '../../constants/routes';
import Input from '../../components/Input';
import { getBannerPhoto, helperDataFormControl } from '../../helpers';
import { IBannerData } from '../../types';

import { ActionsContainer, ActionButton } from './styles';

interface IProps {
  hideInputs?: boolean
  hideActions?: boolean
  hideMedia?: boolean
  banner: IBannerData | undefined
  handleOnDelete?: (banner: IBannerData | undefined) => void
  handelSetBanner?: (banner: IBannerData) => void
}

const BannerRepresentation = ({ banner, hideInputs, hideActions, hideMedia, handleOnDelete, handelSetBanner }: IProps) => {
  const navigate = useNavigate();
  const [newBanner, setNewBanner] = useState({} as IBannerData);

  useEffect(() => {
    if (banner && !newBanner?.id) {
      setNewBanner({
        ...banner,
        titulo: banner?.titulo || '',
        descGeral: banner?.descGeral || '',
      } as IBannerData);
    }
  }, [banner]);

  useEffect(() => {
    if (banner && newBanner?.id) {
      handelSetBanner?.({
        ...banner,
        titulo: newBanner?.titulo || '',
        descGeral: newBanner?.descGeral || ''
      });
    }
  }, [newBanner]);

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
        <ActionButton 
          size="small" 
          color="primary" 
          startIcon={<EditIcon />} 
          onClick={() => {
            navigate(ROUTES.bannersEdit.go({ bannerId: banner?.id }));
          }} 
          disabled={false}
        >
          Editar
        </ActionButton>
      </ActionsContainer>
    );
  };

  return (
    <Card sx={{ maxWidth: 345, position: 'relative', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ width: '100%' }}>
        {!hideMedia && <CardMedia
          component="img"
          // alt={banner?.titulo}
          height="140"
          image={getBannerPhoto(banner || {} as IBannerData, 'thumb')}
        />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {!hideInputs ? <Input onChange={handleSetValue} value={newBanner?.titulo} data-testid="titulo" name="titulo" placeholder="Título" /> : banner?.titulo || ''}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {!hideInputs ? <Input onChange={handleSetValue} value={newBanner?.descGeral} data-testid="descGeral" name="descGeral" placeholder="Descrição" type='multiline' /> : banner?.descGeral || ''}
          </Typography>
        </CardContent>
      </div>
      {!hideActions && <CardActions>
        {renderActions(banner)}
      </CardActions>}
    </Card>
  );
};

export default BannerRepresentation;