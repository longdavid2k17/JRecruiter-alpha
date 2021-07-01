import {Company} from "./Company";

export class JobOffer
{
  id:number=0;
  positionTitle:string="";
  positionDescription:string="";
  lowEndPaymentRange:number=0;
  highEndPaymentRange:number=0;
  contractType:string="";
  creationDate:Date=new Date();
  company:Company=new Company();
}
