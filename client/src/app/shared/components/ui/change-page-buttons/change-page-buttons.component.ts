import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../../../services/local-storage.service';

@Component({
  selector: 'app-change-page-buttons',
  templateUrl: './change-page-buttons.component.html',
  styleUrl: './change-page-buttons.component.scss'
})
export class ChangePageButtonsComponent implements AfterViewInit{
  containerNumber: number = 1;
  @Input({required: true}) lsProperties!: string;
  @Output() currentPage = new EventEmitter<number>();
  @ViewChild('firstPage') firstPage!: ElementRef<HTMLElement>;
  @ViewChild('previousPage') previousPage!: ElementRef<HTMLElement>;
  @ViewChild('nextPage') nextPage!: ElementRef<HTMLElement>;
  @ViewChild('lastPage') lastPage!: ElementRef<HTMLElement>;

  constructor(
    private readonly _lsService: LocalStorageService
  ){}

  ngAfterViewInit(){

  }

  goToFirst(){
    this.containerNumber = 1;
    this.currentPage.emit(this.containerNumber);
  }

  goToLast(){
    const logsPagination: any = this._lsService.getItem(this.lsProperties);
    console.log(this.lsProperties)
    this.containerNumber = logsPagination.totalPages;
    this.currentPage.emit(this.containerNumber);
  }

  goToNext(){
    const logsPagination: any = this._lsService.getItem(this.lsProperties);
    if(logsPagination.hasNext){
      this.containerNumber += 1;
      this.currentPage.emit(this.containerNumber);
    }
  }

  goToPrevious(){
    const logsPagination: any = this._lsService.getItem(this.lsProperties);
    if(logsPagination.hasPrevious){
      this.containerNumber -= 1;
      this.currentPage.emit(this.containerNumber);
    }
  }
}
