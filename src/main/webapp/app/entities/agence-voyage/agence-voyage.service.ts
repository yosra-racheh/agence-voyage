import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAgenceVoyage } from 'app/shared/model/agence-voyage.model';

type EntityResponseType = HttpResponse<IAgenceVoyage>;
type EntityArrayResponseType = HttpResponse<IAgenceVoyage[]>;

@Injectable({ providedIn: 'root' })
export class AgenceVoyageService {
  public resourceUrl = SERVER_API_URL + 'api/agence-voyages';

  constructor(protected http: HttpClient) {}

  create(agenceVoyage: IAgenceVoyage): Observable<EntityResponseType> {
    return this.http.post<IAgenceVoyage>(this.resourceUrl, agenceVoyage, { observe: 'response' });
  }

  update(agenceVoyage: IAgenceVoyage): Observable<EntityResponseType> {
    return this.http.put<IAgenceVoyage>(this.resourceUrl, agenceVoyage, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAgenceVoyage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAgenceVoyage[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
