import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { RemoveProfileService } from '../../../services/remove-profile.service';
import { Router } from '@angular/router';
import { ChangeNotificationService } from '../../../services/change-notification.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  @Input({required: true}) emailToRemove!: string;
  @Output() closeModalEmitter = new EventEmitter<Boolean>();

  constructor(
    private readonly _lsService: LocalStorageService,
    private readonly _removeService: RemoveProfileService,
    private readonly _router: Router,
    private readonly _notificationService: ChangeNotificationService
  ){}

  onCloseModal(){
    this.closeModalEmitter.emit(true);
  }

  removeProfile(){
    const currentProfile: any = this._lsService.getItem('currentProfile');
    this._removeService.delete(currentProfile, this.emailToRemove).subscribe({
      next: (response) => {
        if(currentProfile.email == this.emailToRemove){
          localStorage.removeItem('token');
          localStorage.removeItem('currentProfile');
          this._router.navigate(['/auth/login']);
        }else{
          this.onCloseModal();
          this._notificationService.emitValue(true);
        }
      },
      error: (error) => console.error('Delete profile error', error)
    })
  }
}
