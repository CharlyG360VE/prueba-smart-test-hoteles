import { IReservationDetailData } from '@/reservation-management/interface/reservation-management.interface';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-reservation-detail-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './reservation-detail-dialog.component.html',
  styleUrl: './reservation-detail-dialog.component.scss'
})
export class ReservationDetailDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IReservationDetailData[]) {
    console.log(data)
  }

}
