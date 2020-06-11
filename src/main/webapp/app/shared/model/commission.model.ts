export interface ICommission {
  id?: number;
  taux?: string;
}

export class Commission implements ICommission {
  constructor(public id?: number, public taux?: string) {}
}
