import { IReservationDetail, IReservationDetailData } from '@/reservation-management/interface/reservation-management.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReservationDetailDialogComponent } from '../reservation-detail-dialog/reservation-detail-dialog.component';
import { eMagicNumbers } from '@/_enums/magic-numbers.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hotel-reservation-detail-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule
  ],
  templateUrl: './hotel-reservation-detail-card.component.html',
  styleUrl: './hotel-reservation-detail-card.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate(200)
      ])
    ])
  ]
})
export class HotelReservationDetailCardComponent {

  @Input({ required: true }) reservation!: IReservationDetail;

  private _dialog = inject(MatDialog);

  public openHotelReservation(data: IReservationDetailData[]) {
    this._dialog.open(ReservationDetailDialogComponent, {
      minWidth: '50vw',
      maxWidth: '80vw',
      enterAnimationDuration: eMagicNumbers.N_500,
      exitAnimationDuration: eMagicNumbers.N_100,
      disableClose: true,
      data
    });
  }

}
