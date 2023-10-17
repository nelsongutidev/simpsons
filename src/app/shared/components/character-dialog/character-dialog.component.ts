import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '@shared/models/character';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  character: Character;
}

@Component({
  selector: 'app-character-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-dialog.component.html',
  host: {
    class: 'block p-6 md:max-h-full max-h-[32rem] overflow-y-auto',
  },
})
export class CharacterDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  character!: Character;

  ngOnInit() {
    this.character = this.data.character;
  }
}
