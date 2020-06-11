import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDevise } from 'app/shared/model/devise.model';

type EntityResponseType = HttpResponse<IDevise>;
type EntityArrayResponseType = HttpResponse<IDevise[]>;

@Injectable({ providedIn: 'root' })
export class DeviseService {
  public resourceUrl = SERVER_API_URL + 'api/devises';

  constructor(protected http: HttpClient) {}

  create(devise: IDevise): Observable<EntityResponseType> {
    return this.http.post<IDevise>(this.resourceUrl, devise, { observe: 'response' });
  }

  update(devise: IDevise): Observable<EntityResponseType> {
    return this.http.put<IDevise>(this.resourceUrl, devise, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDevise>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDevise[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
