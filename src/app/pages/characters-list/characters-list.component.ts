import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpsonsService } from '@shared/services/simpsons.service';

import { CharactersListStore } from './characters-list-store.store';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CharactersTableComponent } from '@shared/components/characters-table/characters-table.component';
import { CharacterCardComponent } from '@shared/components/character-card/character-card.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
    A11yModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
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
  displayOption: 'list' | 'grid' = 'list';

  ngOnInit() {
    this.store.fetchCharacters();
  }

  onPageChange(pageEvent: PageEvent) {
    this.store.setPage(pageEvent.pageIndex + 1);
    this.store.fetchCharacters();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.store.findCharacters(filterValue);
  }
}
