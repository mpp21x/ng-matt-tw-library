export function getNestedProp(nestedProperty: string, taget: unknown) {

  const restOfPropertyNames = nestedProperty.split('.');
  const length = restOfPropertyNames.length;
  let i;
  for (i = 0; i < length; i++) {
    if (!taget || !taget.hasOwnProperty(restOfPropertyNames[i])) {
      return false;
    }
    taget = taget[restOfPropertyNames[i]];
  }
  return taget;
}


export function nestedPropIsExists(nestedProperty: string, obj: { [key: string]: unknown } & any) {

  const restOfPropertyNames = nestedProperty.split('.');
  const length = restOfPropertyNames.length;
  for (let i = 0; i < length; i++) {
    if (!obj || !obj.hasOwnProperty(restOfPropertyNames[i])) {
      return false;
    }
    obj = obj[restOfPropertyNames[i]];
  }
  return true;
}
