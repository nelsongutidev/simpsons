import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Character } from '../../models/character';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CharacterDialogComponent } from '../character-dialog/character-dialog.component';

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
  imports: [CommonModule, MatTableModule, MatDialogModule],
  templateUrl: './characters-table.component.html',
  styles: [],
})
export class CharactersTableComponent {
  dialog: MatDialog = inject(MatDialog);
  displayedColumns = CHARACTER_DISPLAYED_COLUMNS;
  @Input() characters: Character[] = [];

  openDialog(character: Character) {
    this.dialog.open(CharacterDialogComponent, {
      width: '500px',
      data: { character },
      hasBackdrop: true,
    });
  }
}
