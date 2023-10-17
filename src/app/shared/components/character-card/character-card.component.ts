import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '@shared/models/character';
import { MatDialog } from '@angular/material/dialog';
import { CharacterDialogComponent } from '../character-dialog/character-dialog.component';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-card.component.html',
  host: {
    class:
      'md:w-80 w-72 h-96 rounded overflow-hidden shadow-lg space-y-2 px-4 hover:bg-gray-100 cursor-pointer',
    '(click)': 'openDialog(character)',
  },
})
export class CharacterCardComponent {
  dialog: MatDialog = inject(MatDialog);
  @Input({ required: true }) character!: Character;

  openDialog(character: Character) {
    this.dialog.open(CharacterDialogComponent, {
      width: '500px',
      data: { character },
      hasBackdrop: true,
    });
  }
}
