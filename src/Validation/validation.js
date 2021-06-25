import * as yup from "yup"
import { FirstName, LastName, Title, Company, Phone, Email, textArea, Country, CompanyHQ, HearAbout, Revenue, Industry, TimeFrame, Marketing, Sales } from "./Validator";
export const userSchema = yup.object().shape({
  FName: FirstName(),
  LName: LastName(),
  Title: Title(),
  Company: Company(),
  Phone: Phone(),
  Email: Email(),
  textArea: textArea(),
  Country: Country(),
  CompanyHQ: CompanyHQ(),
  HearAbout: HearAbout(),
  Revenue: Revenue(),
  Industry: Industry(),
  TimeFrame: TimeFrame(),
  Marketing: Marketing(),
  Sales: Sales(),

})