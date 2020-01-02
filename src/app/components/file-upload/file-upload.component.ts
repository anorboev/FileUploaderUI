import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileService } from "../../services/file.service";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FileValidation } from '../../services/file-validations.model';
import { fileTypeValidator } from '../../helpers/fileTypeValidator';
import { fileSizeValidator } from 'src/app/helpers/fileSizeValidator';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html'
})

export class FileUploadComponent {
  form: FormGroup;
  progress: number = 0;
  fileValidation: FileValidation;
  fileName = "Choose file";
  uploadSuccess: boolean = false;
  uploadFailed: boolean = false;
  uploadException: string;

  constructor(
    private fb: FormBuilder,
    private fileService: FileService
  ) {
    this.fileService.getFileValidation()
      .subscribe((data: FileValidation) => {
        this.fileValidation = {...data}
        this.buildForm();
      }); 
  }

  ngOnInit() {     
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      file: [File, [
        Validators.required,
        fileSizeValidator(this.fileValidation.allowedFileSize),
        fileTypeValidator(this.fileValidation.allowedFileExtensions)        
      ]]
    })
  }

  get name() { return this.form.get('name'); }
  get file() { return this.form.get('file'); }

  uploadFile(event) {
    var file = (event.target as HTMLInputElement).files[0];
    this.form.controls['file'].setValue(file);

    if (file != null) {
      this.fileName = file.name;
      if (this.form.controls['file'].valid && !this.form.get('name').value)
        this.form.controls['name'].setValue(this.fileName);
    }

    this.form.get('file').markAsTouched();
  }

  submit() {
    this.uploadSuccess = false; 
    if(this.form.valid){
      let name = this.form.value.name;
      let file = this.form.value.file;
      name = name.split(".")[0] + "." + file.name.split(".")[1];
  
      this.fileService.createFile(
        name,
        file
      ).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            this.progress = 10;
            break;
          case HttpEventType.ResponseHeader:
            this.progress = 20;
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            break;
          case HttpEventType.Response:
            this.uploadFailed = false;
            this.uploadSuccess = true;  
            this.progress = 0;
            this.form.markAsPristine();
            this.form.markAsUntouched();
            this.fileName = "Choose file";
            this.form.controls['name'].setValue("");
            break;
        }
        
      }, exception => {
        if(exception){
          this.uploadException = exception;
        } else {
          this.uploadException = "Internal server error";
        }
        this.uploadSuccess = false;  
        this.uploadFailed = true;  
        this.progress = 0;
      })
    }
    else{
      Object.keys(this.form.controls).forEach(field => { // {1}
        const control = this.form.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }
    

    
  }

}