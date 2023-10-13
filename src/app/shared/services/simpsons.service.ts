import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
const baseUrl = 'https://apisimpsons.fly.dev/api/personajes';

@Injectable({
  providedIn: 'root',
})
export class SimpsonsService {
  constructor(private http: HttpClient) {}

  getCharacters(limit: number = 10, page = 1): Observable<any> {
    return this.http
      .get(baseUrl, {
        params: {
          limit: limit.toString(),
          page: page.toString(),
        },
      })
      .pipe(map((data: any) => data));
  }
}
