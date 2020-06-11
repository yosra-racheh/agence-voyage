import { IEchangeDevise } from 'app/shared/model/echange-devise.model';
import { IAgenceVoyage } from 'app/shared/model/agence-voyage.model';

export interface IDevise {
  id?: number;
  nom?: string;
  code?: string;
  echangedevises?: IEchangeDevise[];
  agencevoyages?: IAgenceVoyage[];
}

export class Devise implements IDevise {
  constructor(
    public id?: number,
    public nom?: string,
    public code?: string,
    public echangedevises?: IEchangeDevise[],
    public agencevoyages?: IAgenceVoyage[]
  ) {}
}
