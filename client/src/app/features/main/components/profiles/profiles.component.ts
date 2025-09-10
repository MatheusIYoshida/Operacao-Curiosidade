import { Component, OnInit } from '@angular/core';
import { ListService } from '../../../../services/list.service';
import { ChangeNotificationService } from '../../../../services/change-notification.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss'
})
export class ProfilesComponent implements OnInit{
  visibleModal: boolean = false;
  createModalTitle: string = 'Create Profile';
  currentPage: number = 1;
  pageSize: number = 15;
  filter: string | null = null; 
  mainCardTitle: string = 'Profiles';
  thColumns: string[] = ['name', 'email', 'status', 'actions'];
  users: any = [];

  constructor(
    private readonly _listService: ListService,
    private readonly _notificationService: ChangeNotificationService
  ){}

  ngOnInit(){
    this.userList();
    this._notificationService.valueChanged().subscribe(() => {
      this.userList();
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
          localStorage.setItem("ProfilePagination", JSON.stringify(pagination));
          this.users = data.items;
          //* FIX ERROR */
        },
        error: (error) => console.error('Load profiles error')
      })
  }

  openModal(){
    this.visibleModal = true;
  }

  closeModal(){
    this.visibleModal = false;
  }
}
