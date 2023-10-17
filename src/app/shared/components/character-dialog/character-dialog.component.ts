import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../models/character';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  character: Character;
}

@Component({
  selector: 'app-character-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-dialog.component.html',
})
export class CharacterDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  character!: Character;

  ngOnInit() {
    this.character = this.data.character;
  }
}
