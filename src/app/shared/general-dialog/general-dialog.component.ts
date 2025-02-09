import { GeneralDialogData } from '@/_interfaces/dialog.interface';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-general-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './general-dialog.component.html',
  styleUrl: './general-dialog.component.scss'
})
export class GeneralDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: GeneralDialogData) { }

}
