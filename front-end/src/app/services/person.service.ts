import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private _http: HttpClient) {}

  addPerson(data: any): Observable<any> {

    return this._http.post('http://localhost:8080/api_person/person', data);
  }

  getPersonList(): Observable<any> {

    return this._http.get('http://localhost:8080/api_person/persons');
  }

  deletePerson(id: number): Observable<any>{

	  return this._http.delete(`http://localhost:8080/api_person/${id}`);
  }

  updatePerson(id: number, data: any): Observable<any> {

    return this._http.put(`http://localhost:8080/api_person/${id}`, data);
  }
}
