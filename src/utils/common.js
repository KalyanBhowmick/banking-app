// eslint-disable-next-line import/prefer-default-export
export const validateFields = (fieldsToValidate) => fieldsToValidate.every((field) => Object.values(field)[0] !== '');
