import helperDataFormControl from './index';

interface IDataFormTest {
  desc: string;
  qtd: number;
}

describe('Helper dataFormControl', () => {
  const dataFormCompare = { desc: 'desc test' };

  it('Should return object values', () => {
    const dataForm = {} as IDataFormTest;
    const newValue = 'desc test';
    const newKey = 'desc';

    const objValues = helperDataFormControl<keyof IDataFormTest, IDataFormTest>(newKey as keyof IDataFormTest, newValue)(dataForm);

    expect(objValues).toEqual(dataFormCompare);
  });
});
