import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { switchMap, tap, withLatestFrom } from 'rxjs';
import { Character } from '@shared/models/character';
import { CharactersDto } from '@shared/models/character-dto';
import { SimpsonsService } from '@shared/services/simpsons.service';

interface CharactersState {
  characters: Character[]; // type character
  limit: number;
  page: number;
  total: number;
  loading?: boolean;
}

const initialState: CharactersState = {
  characters: [],
  limit: 10,
  page: 1,
  total: 0,
  loading: false,
};

@Injectable()
export class CharactersListStore extends ComponentStore<CharactersState> {
  constructor(private simpsonsService: SimpsonsService) {
    super(initialState);
  }
  private readonly characters$ = this.select((state) => state.characters);
  private readonly limit$ = this.select((state) => state.limit);
  private readonly page$ = this.select((state) => state.page);
  private readonly total$ = this.select((state) => state.total);
  private readonly loading$ = this.select((state) => state.loading);

  $vm = this.select(
    this.characters$,
    this.limit$,
    this.page$,
    this.total$,
    this.loading$,
    (characters, limit, page, total, loading) => ({
      characters,
      limit,
      page,
      total,
      loading,
    })
  );

  readonly setCharacters = this.updater((state, characters: Character[]) => ({
    ...state,
    characters,
  }));

  readonly setLimit = this.updater((state, limit: number) => ({
    ...state,
    limit,
  }));

  readonly setPage = this.updater((state, page: number) => ({
    ...state,
    page,
  }));

  readonly setTotal = this.updater((state, total: number) => ({
    ...state,
    total,
  }));

  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  fetchCharacters = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.setLoading(true)),
      withLatestFrom(this.limit$, this.page$),
      switchMap(([_, limit, page]) =>
        this.simpsonsService.getCharacters(limit, page).pipe(
          tap((charactersDto: CharactersDto) => {
            const { docs, totalDocs } = charactersDto;

            this.setCharacters(docs);
            this.setTotal(totalDocs);
          })
        )
      ),
      tap(() => this.setLoading(false))
    )
  );
}
