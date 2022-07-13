const helperDataFormControl = <W extends keyof XX, XX extends object>(key: W, value: any) => (obj: XX) => {
  obj[key] = value;
  /**
   * NOTE: JSON.parse(JSON.stringify()) prevent bug not-rendering: force a new instance from obj param.
  */
  return JSON.parse(JSON.stringify(obj));
}

export default helperDataFormControl;