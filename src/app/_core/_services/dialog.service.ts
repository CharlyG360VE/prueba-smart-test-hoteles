import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GeneralDialogComponent } from '@shared/general-dialog/general-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    private readonly _dialog = inject(MatDialog)

    alertDialog(
        textPrimary = '',
        textSecondary = '',
        confirmBtn = false,
        textNotConfirmBtn = 'Aceptar',
        textConfirmBtn = 'Si',
        textCancelBtn = 'No',
        closeBtn = false)
    {
        return this._dialog.open(
            GeneralDialogComponent,
            {
                minWidth: '45vw',
                maxHeight: '30vh',
                enterAnimationDuration: 500,
                exitAnimationDuration: 100,
                disableClose: true,
                hasBackdrop: true,
                autoFocus: true,
                data: {
                    textPrimary,
                    textSecondary,
                    confirmBtn,
                    textConfirmBtn,
                    textCancelBtn,
                    textNotConfirmBtn,
                    closeBtn
                }
            }
        ).afterClosed() as Observable<boolean>
    }

}
