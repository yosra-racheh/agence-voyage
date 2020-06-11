import { IReservation } from 'app/shared/model/reservation.model';
import { ICommission } from 'app/shared/model/commission.model';
import { IDevise } from 'app/shared/model/devise.model';

export interface IAgenceVoyage {
  id?: number;
  nom?: string;
  lieu?: string;
  ville?: string;
  reservations?: IReservation[];
  commission?: ICommission;
  devises?: IDevise[];
}

export class AgenceVoyage implements IAgenceVoyage {
  constructor(
    public id?: number,
    public nom?: string,
    public lieu?: string,
    public ville?: string,
    public reservations?: IReservation[],
    public commission?: ICommission,
    public devises?: IDevise[]
  ) {}
}
