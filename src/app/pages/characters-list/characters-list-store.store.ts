import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  Observable,
  debounce,
  debounceTime,
  filter,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Character } from '@shared/models/character';
import { CharactersDto } from '@shared/models/character-dto';
import { SimpsonsService } from '@shared/services/simpsons.service';

interface CharactersState {
  characters: Character[]; // type character
  limit: number;
  page: number;
  total: number;
  loading?: boolean;
  filterValue?: string;
}

const initialState: CharactersState = {
  characters: [],
  limit: 10,
  page: 1,
  total: 0,
  loading: false,
  filterValue: '',
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
  private readonly filterValue$ = this.select((state) => state.filterValue);

  $vm = this.select(
    this.characters$,
    this.limit$,
    this.page$,
    this.total$,
    this.loading$,
    this.filterValue$,
    (characters, limit, page, total, loading, filterValue) => ({
      characters,
      limit,
      page,
      total,
      loading,
      filterValue,
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

  readonly setFilterValue = this.updater((state, filterValue: string) => ({
    ...state,
    filterValue,
  }));

  readonly fetchCharacters = this.effect(($) =>
    $.pipe(
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

  readonly findCharacters = this.effect((filterValue$: Observable<string>) =>
    filterValue$.pipe(
      debounceTime(500),
      tap((filterValue) => {
        this.setFilterValue(filterValue);
        if (filterValue.length === 0) {
          this.fetchCharacters();
        }
      }),
      filter((filterValue) => filterValue.length > 0),
      tap(() => this.setLoading(true)),
      switchMap((filterValue) =>
        this.simpsonsService.findCharacters(filterValue).pipe(
          tap((characters: Character[]) => {
            this.setLoading(false);
            this.patchState({ ...initialState, characters, filterValue });
          })
        )
      )
    )
  );
}
