import { Component, OnInit } from '@angular/core';
import { FileModel } from 'src/app/services/file-model';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  fileList: FileModel[];
  fileListGrouped: {};

  constructor(public fileService: FileService) { }

  ngOnInit() {
    this.fileService.getFileList()
      .subscribe((data: FileModel[]) => {
        this.fileList = data
        this.groupFiles();
      });
  }

  groupFiles() {
    var group = this.fileList.reduce(
      (result, item) => ({
        ...result,
        [item["extension"]]: [
          ...(result[item["extension"]] || []),
          item,
        ],
      }), 
      {}
    );

    this.fileListGrouped = Object.entries(group);
  }
}
