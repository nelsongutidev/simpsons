import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CharactersDto } from '../models/character-dto';
const baseUrl = 'https://apisimpsons.fly.dev/api/personajes';

@Injectable({
  providedIn: 'root',
})
export class SimpsonsService {
  constructor(private http: HttpClient) {}

  getCharacters(limit: number = 10, page = 1): Observable<CharactersDto> {
    return this.http
      .get<CharactersDto>(baseUrl, {
        params: {
          limit: limit.toString(),
          page: page.toString(),
        },
      })
      .pipe(map((data: CharactersDto) => data));
  }
}
