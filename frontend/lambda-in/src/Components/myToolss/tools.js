export default {
  // prettier-ignore
  mapAndResetKeysValues: object => Object.keys(object).reduce((resetKeys, key) => {
    // eslint-disable-next-line no-param-reassign
    const valueType = tools.typeOf(resetKeys[key]);

    switch (valueType) {
      case '[object Array]':
        // eslint-disable-next-line no-param-reassign
        resetKeys[key] = [];
        break;
      default:
        // eslint-disable-next-line no-param-reassign
        resetKeys[key] = '';
    }


    return resetKeys;
  }, {}),
  typeOf: (item) => Object.prototype.toString.call(item),
};
