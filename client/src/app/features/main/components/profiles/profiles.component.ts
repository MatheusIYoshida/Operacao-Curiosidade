import { Component, OnInit } from '@angular/core';
import { ListService } from '../../../../services/list.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss'
})
export class ProfilesComponent implements OnInit{
  currentPage: number = 1;
  pageSize: number = 15;
  filter: string | null = null; 
  mainCardTitle: string = 'Profiles';
  thColumns: string[] = ['Name', 'Email', 'Status', 'Actions'];
  users: any = [];

  constructor(private readonly _listService: ListService){}

  ngOnInit(){
    this.userList();
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
          this.users = data.items
          console.log(this.users)
          //* FIX ERROR */
        },
        error: (error) => console.error('Load profiles error')
      })
  }
}
