import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../../model/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private _book = new Subject<Book>();

  private baseUrl = `${environment.baseUrl}/books`

  constructor(private http: HttpClient) {}

  getOne(id: number){
    return this.http.get<Book>(`${this.baseUrl}/${id}`)
  }

  all(){
    return this.http.get<Book[]>(this.baseUrl);
  }

  upsert(book: Book){
    book.cost = Number(book.cost);
    book.idLibrary = Number(book.idLibrary);
    book.isBorrowed = Boolean(book.isBorrowed);

    if(book.id){
      return this.http.patch<Book>(`${this.baseUrl}/${book.id}`, book);
    } else {
      return this.http.post<Book>(this.baseUrl, book);
    }
  }

  delete(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getBook(): Observable<Book> {
    return this._book.asObservable();
  }

  setBook(book: Book){
    this._book.next(book);
  }
}
