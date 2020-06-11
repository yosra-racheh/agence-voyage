import { IDevise } from 'app/shared/model/devise.model';

export interface IEchangeDevise {
  id?: number;
  code1?: string;
  code2?: string;
  tauxchange?: number;
  devise?: IDevise;
}

export class EchangeDevise implements IEchangeDevise {
  constructor(public id?: number, public code1?: string, public code2?: string, public tauxchange?: number, public devise?: IDevise) {}
}
