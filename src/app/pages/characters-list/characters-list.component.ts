import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpsonsService } from 'src/app/shared/services/simpsons.service';

import { CharactersListStore } from './characters-list-store.store';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

export const CHARACTER_DISPLAYED_COLUMNS = [
  'Nombre',
  'Genero',
  'Estado',
  'Historia',
  // 'Imagen',
  'Ocupacion',
];

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './characters-list.component.html',
  styles: [],
  providers: [CharactersListStore],
})
export class CharactersListComponent {
  simpsonsService = inject(SimpsonsService);
  store = inject(CharactersListStore);

  displayedColumns = CHARACTER_DISPLAYED_COLUMNS;
  vm$ = this.store.$vm;

  ngOnInit() {
    this.store.fetchCharacters();
  }

  onPageChange(pageEvent: PageEvent) {
    this.store.setPage(pageEvent.pageIndex + 1);
    this.store.fetchCharacters();
  }
}
