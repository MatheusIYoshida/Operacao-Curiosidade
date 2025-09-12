import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListService } from '../../../../services/list.service';
import { ChangeNotificationService } from '../../../../services/change-notification.service';
import { PageNotifyService } from '../../../../services/page-notify.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss'
})
export class ProfilesComponent implements OnInit{
  visibleModal: boolean = false;
  visibleRemoveModal: boolean = false;
  modalTitle!: string;
  modalBtnColor!: string;
  modalBtnText!: string;
  editMode!: boolean;
  emailToEdit: string = '';
  emailToRemove: string = '';
  currentPage: number = 1;
  pageSize: number = 13;
  filter: string | null = null; 
  mainCardTitle: string = 'Profiles';
  thColumns: string[] = ['name', 'email', 'status', 'actions'];
  users: any = [];

  constructor(
    private readonly _listService: ListService,
    private readonly _notificationService: ChangeNotificationService,
    private readonly _pageNotifyService: PageNotifyService
  ){}

  ngOnInit(){
    this.userList();
    this._notificationService.valueChanged().subscribe((response: string | null) => {
      this.filter = response;
      this.currentPage = 1;
      this._pageNotifyService.emitValue(1);
      setTimeout(() => {
        this.userList();
      }, 250);
    })
  }

  userList(){
    let apiUrl = `https://localhost:7160/api/Profile/Pagination?currentPage=${this.currentPage}&pageSize=${this.pageSize}`;
    
    if(this.filter) {
      apiUrl += `&filter=${this.filter}`;
    }
    
    this._listService.get(apiUrl).subscribe({
        next: (data: any) => {
          const pagination = {
            currentPage: data.currentPage,
            totalPages: data.totalPages,
            hasNext: data.hasNext,
            hasPrevious: data.hasPrevious
          }
          localStorage.setItem("profilePagination", JSON.stringify(pagination));
          this.users = data.items;
        },
        error: (error) => console.error('Load profiles error', error)
      })
  }

  openModal(emailToEdit?: string){
    if(emailToEdit){
      this.modalTitle = 'Edit Profile';
      this.modalBtnColor = '#0056b3';
      this.modalBtnText = 'EDIT PROFILE';
      this.emailToEdit = emailToEdit;
      this.editMode = true;  
    }else{
      this.modalTitle = 'Create Profile';
      this.modalBtnColor = '#429a35';
      this.modalBtnText = 'CREAT PROFILE';
      this.editMode = false
    }
    this.visibleModal = true;
  }

  closeModal(){
    this.visibleModal = false;
  }

  openRemoveModal(emailToRemove: string){
    this.visibleRemoveModal = true;
    this.emailToRemove = emailToRemove;
  }

  closeRemoveModal(){
    this.visibleRemoveModal = false;
  }

  setCurrentPage(currentPage: number){
    this.currentPage = currentPage;
    this.userList();
  }
}
