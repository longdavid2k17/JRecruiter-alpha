import {Company} from "./Company";

export interface JobOffer
{
  id:number;
  positionTitle:string;
  positionDescription:string;
  lowEndPaymentRange:number;
  highEndPaymentRange:number;
  contractType:string;
  creationDate:Date;
  company:Company;
}
