import * as yup from "yup"

export const FirstName = () => {
  return yup.string().required().min(2).max(20)
}
export const LastName = () => {
  return yup.string().required().min(2).max(20)
}
export const Title = () => {
  return yup.string().required().min(2).max(20)
}
export const Company = () => {
  return yup.string().required().min(2).max(50)
}
export const Phone = () => {
  return yup.number().required().positive().integer()
}
export const Email = () => {
  return yup.string().required().email()
}
export const textArea = () => {
  return yup.string().required().min(2).max(100)
}
export const Country = () => {
  return yup.string().required()
}
export const CompanyHQ = () => {
  return yup.string().required()
}
export const HearAbout = () => {
  return yup.string().required()
}
export const Revenue = () => {
  return yup.string().required()
}
export const Industry = () => {
  return yup.string().required().min(2).max(20)
}
export const TimeFrame = () => {
  return yup.string().required()
}
export const Marketing = () => {
  return yup.boolean().required()
}
export const Sales = () => {
  return yup.boolean().required()
}