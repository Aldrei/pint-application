import { PROPERTIES_DETAIL, PROPERTIES_LIST, PROPERTIES_PHOTOS } from '../mocks';
import { IPropertyData, IPhotoData } from '../types';

import { getPhoto, showDormitorio, showGaragem, showCurrency } from './index';

import { helperDataFormControl, hasFeature } from './index';

interface IDataFormTest {
  desc: string;
  qtd: number;
}

describe('Helper', () => {
  const dataProperty = PROPERTIES_DETAIL.property.data as unknown as IPropertyData;
  const dataFormCompare = { desc: 'desc test' };

  it('helperDataFormControl helper', () => {
    const dataForm = {} as IDataFormTest;
    const newValue = 'desc test';
    const newKey = 'desc';

    const objValues = helperDataFormControl<keyof IDataFormTest, IDataFormTest>(newKey as keyof IDataFormTest, newValue)(dataForm);

    expect(objValues).toEqual(dataFormCompare);
  });

  it('hasFeature helper', () => {
    expect(hasFeature(dataProperty, 'sitePublicarImovel')).toEqual(true);
    expect(hasFeature(dataProperty, 'hasExclusividade')).toEqual(true);
  });

  it('toDateBR helper', () => {
    const date = '2022-10-20';
    expect(date.toDateBR()).toBe('20/10/2022');
  });

  it('toDateBR helper is invalid', () => {
    const date = '2022-40-50';
    expect(date.toDateBR()).toBe('');
  });

  it('toMeter helper', () => {
    const metragem = '12.2';
    expect(metragem.toMeter()).toBe('12.2m');
  });

  it('toMeter helper type square', () => {
    const metragem = '12.2';
    expect(metragem.toMeter('square')).toBe('12.2m²');
  });

  it('toMeter helper is invalid', () => {
    const metragem = '';
    expect(metragem.toMeter()).toBe('');
  });

  it('getPhoto helper', () => {
    const dataPhoto = dataProperty.photo.data as unknown as IPhotoData;
    expect(getPhoto(dataPhoto, 'normal')).toBe('http://aldrei.siteprofissional.com/photos/normal/231fdb12f3a3e6ed6bcf46987a41240f.jpeg');
    expect(getPhoto(dataPhoto, 'thumb')).toBe('http://aldrei.siteprofissional.com/photos/thumb/231fdb12f3a3e6ed6bcf46987a41240f.jpeg');
  });

  it('getPhoto helper when file not exist', () => {
    process.env = Object.assign(process.env, {
      REACT_APP_ENVIRONMENT: 'local',
    });
    const dataPhotoFileNotExist = PROPERTIES_PHOTOS.paginate.data[2] as unknown as IPhotoData;
    expect(getPhoto(dataPhotoFileNotExist, 'normal')).toBe('https://imobmobile.com.br/photos/normal/49394d7220f0d232f6f3a8e3638a90bd.jpeg');
    expect(getPhoto(dataPhotoFileNotExist, 'thumb')).toBe('https://imobmobile.com.br/photos/thumb/49394d7220f0d232f6f3a8e3638a90bd.jpeg');
  });

  it('showDormitorio helper', () => {
    const dataPropertyTerreno = PROPERTIES_LIST.paginate.data[2] as unknown as IPropertyData;
    expect(showDormitorio(dataPropertyTerreno)).toBe('-- dormitório(s)');
    expect(showDormitorio(dataProperty)).toBe('3 dormitório(s)');
  });

  it('showGaragem helper', () => {
    const dataPropertyTerreno = PROPERTIES_LIST.paginate.data[2] as unknown as IPropertyData;
    expect(showGaragem(dataPropertyTerreno)).toBe('-- carro(s)');
    expect(showGaragem(dataProperty)).toBe('4 carro(s)');
  });

  it('showCurrency helper', () => {
    expect(showCurrency(dataProperty, 'valor')).toBe('R$ 3.300.000,00');
  });
});
