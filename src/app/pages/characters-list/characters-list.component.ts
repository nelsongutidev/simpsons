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
import { CharactersTableComponent } from 'src/app/shared/components/characters-table/characters-table.component';
import { CharacterCardComponent } from 'src/app/shared/components/character-card/character-card.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    CharactersTableComponent,
    CharacterCardComponent,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: './characters-list.component.html',
  host: {
    class: 'flex justify-center items-center',
  },
  providers: [CharactersListStore],
})
export class CharactersListComponent {
  simpsonsService = inject(SimpsonsService);
  store = inject(CharactersListStore);

  vm$ = this.store.$vm;
  displayOption = 'table';

  ngOnInit() {
    this.store.fetchCharacters();
  }

  onPageChange(pageEvent: PageEvent) {
    this.store.setPage(pageEvent.pageIndex + 1);
    this.store.fetchCharacters();
  }
}
