import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Library } from '../../model/library';

@Injectable({
  providedIn: 'root'
})
export class LibrariesService {

  private _library = new Subject<Library>();

  private baseUrl = `${environment.baseUrl}/libraries`

  constructor(private http: HttpClient) {}

  getOne(id: number){
    return this.http.get<Library>(`${this.baseUrl}/${id}`);
  }

  all(){
    return this.http.get<Library[]>(this.baseUrl);
  }

  upsert(library: Library){

    if(library.id){
      return this.http.patch<Library>(`${this.baseUrl}/${library.id}`, library);
    } else {
      return this.http.post<Library>(this.baseUrl, library);
    }
  }

  delete(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getLibrary(): Observable<Library> {
    return this._library.asObservable();
  }

  setLibrary(library: Library){
    this._library.next(library);
  }
}
