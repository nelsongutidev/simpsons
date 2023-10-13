import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Character } from '../../models/character';
import { CHARACTER_DISPLAYED_COLUMNS } from 'src/app/pages/characters-list/characters-list.component';

@Component({
  selector: 'app-characters-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './characters-table.component.html',
  styles: [],
})
export class CharactersTableComponent {
  displayedColumns = CHARACTER_DISPLAYED_COLUMNS;
  @Input() characters: Character[] = [];
}
