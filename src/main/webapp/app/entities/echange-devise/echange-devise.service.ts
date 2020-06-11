import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEchangeDevise } from 'app/shared/model/echange-devise.model';

type EntityResponseType = HttpResponse<IEchangeDevise>;
type EntityArrayResponseType = HttpResponse<IEchangeDevise[]>;

@Injectable({ providedIn: 'root' })
export class EchangeDeviseService {
  public resourceUrl = SERVER_API_URL + 'api/echange-devises';

  constructor(protected http: HttpClient) {}

  create(echangeDevise: IEchangeDevise): Observable<EntityResponseType> {
    return this.http.post<IEchangeDevise>(this.resourceUrl, echangeDevise, { observe: 'response' });
  }

  update(echangeDevise: IEchangeDevise): Observable<EntityResponseType> {
    return this.http.put<IEchangeDevise>(this.resourceUrl, echangeDevise, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEchangeDevise>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEchangeDevise[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
