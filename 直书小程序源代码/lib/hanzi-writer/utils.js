export const removeEmptyKeys = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (val !== undefined && val !== null) {
      newObj[key] = val;
    }
  });
  return newObj;
};
