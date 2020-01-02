import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss']
})
export class TablePaginatorComponent implements OnInit {
  @Input() listSize: number;
  @Output() change = new EventEmitter<number>();
  pages: number[];
  active: number = 1;
  constructor() { }

  ngOnInit() {
    this.pages = Array(Math.ceil(this.listSize / 10)).fill(0).map((x, i) => i + 1);
  }

  pageChange(pageNumber: number){
    if(pageNumber != this.active && pageNumber > 0 && pageNumber <= this.pages.length){
      this.active = pageNumber;
      this.change.emit(pageNumber);
    }    
  }

}
