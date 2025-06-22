import * as yup from 'yup';

export const registerSchema = yup
  .object({
    displayName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export const appointmentSchema = yup.object().shape({
  adress: yup.string().required(),
  phone: yup
    .string()
    .matches(/^[+][0-9]+$/, 'must be in format <+380...>')
    .min(13)
    .max(13)
    .required(),
  age: yup.string().required(),
  time: yup.string().required(),
  email: yup.string().email().required(),
  parentName: yup.string().required("parent's name is required field"),
  comment: yup.string().required(),
});
