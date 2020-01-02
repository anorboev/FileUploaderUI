import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { 
  FileUploadComponent, 
  FileListComponent, 
  WelcomeComponent, 
  TablePaginatorComponent, 
  FileTableComponent
} from './components';



@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    FileListComponent,
    FileTableComponent,
    TablePaginatorComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
