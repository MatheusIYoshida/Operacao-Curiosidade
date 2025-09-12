import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import { ChangeNotificationService } from '../../../services/change-notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  @Input() searchEnable: boolean = false;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  profileIcon: string = 'U';
  profileName: string = 'Undefined';
  editModalTitle: string = 'Edit Profile';
  emailToEdit!: string;
  visibleModal: boolean = false;
  timeout: any = 0;

  constructor(
    private readonly _router: Router,
    private readonly _lsService: LocalStorageService,
    private readonly _notificationService: ChangeNotificationService
  ){}

  logout(){
    localStorage.clear();
    this._router.navigate(['/auth/login']);
  }

  ngOnInit(){
    const currentProfile: any = localStorage.getItem('currentProfile');
    const name = JSON.parse(currentProfile).name
    this.profileIcon = name[0].toUpperCase();
    this.profileName = name;
  }

  openModal(){
    const currentProfile = this._lsService.getItem('currentProfile');
    this.emailToEdit = currentProfile.email;
    this.visibleModal = true;
  }

  closeModal(){
    this.visibleModal = false;
  }

  searchList(){
    if(this.searchEnable){
      this.timeout = setTimeout(() => {
        this._notificationService.emitValue(this.searchInput.nativeElement.value);
      })
    }
  }
}