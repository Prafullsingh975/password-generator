import * as Yup from 'yup';

export const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Password length should be minimum of 4')
    .max(26, 'Password length should be of maximum 16')
    .required('Password length should be required'),
});
