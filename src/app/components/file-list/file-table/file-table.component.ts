import { Component, OnInit, Input } from '@angular/core';
import { FileModel } from 'src/app/services/file-model';
import { GlobalVariable } from '../../../globals';

@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html'
})
export class FileTableComponent implements OnInit {
  @Input() fileType: string;
  @Input() fileList: FileModel[];
  fileListForPage: FileModel[];

  downloadUrl: string = GlobalVariable.BASE_API_URL + "file/download/";

  constructor() { }

  ngOnInit() {
    this.changePage(1);
  }

  changePage(number: number){
    var sliceNumb = (number - 1) * 10;
    this.fileListForPage = this.fileList.slice(sliceNumb, 10 + sliceNumb);
  }

}
