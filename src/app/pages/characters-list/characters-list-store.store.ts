import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs';
import { SimpsonsService } from 'src/app/shared/services/simpsons.service';

interface CharactersState {
  characters: []; // type character
  limit: number;
  page: number;
}

const initialState: CharactersState = {
  characters: [],
  limit: 10,
  page: 1,
};

@Injectable()
export class CharactersListStore extends ComponentStore<CharactersState> {
  constructor(private simpsonsService: SimpsonsService) {
    super(initialState);
  }
  private readonly characters$ = this.select((state) => state.characters);
  private readonly limit$ = this.select((state) => state.limit);
  private readonly page$ = this.select((state) => state.page);

  $vm = this.select(
    this.characters$,
    this.limit$,
    this.page$,
    (characters, limit, page) => ({
      characters,
      limit,
      page,
    })
  );

  readonly setCharacters = this.updater((state, characters: []) => ({
    ...state,
    characters,
  }));

  fetchCharacters = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.simpsonsService.getCharacters().pipe(
          tap((characters: any) => {
            console.log('characters: ', characters);
            this.setCharacters(characters);
          })
        )
      )
    )
  );
}
