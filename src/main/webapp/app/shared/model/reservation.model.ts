import { Moment } from 'moment';
import { IAgenceVoyage } from 'app/shared/model/agence-voyage.model';

export interface IReservation {
  id?: number;
  date?: Moment;
  montant?: number;
  agencevoyage?: IAgenceVoyage;
}

export class Reservation implements IReservation {
  constructor(public id?: number, public date?: Moment, public montant?: number, public agencevoyage?: IAgenceVoyage) {}
}
