import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Character } from '../../models/character';

export const CHARACTER_DISPLAYED_COLUMNS = [
  'Nombre',
  'Imagen',
  'Genero',
  'Estado',
  // 'Historia',
  'Ocupacion',
];

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
