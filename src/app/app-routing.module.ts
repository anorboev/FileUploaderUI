import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent, FileListComponent } from './components';

const appRoutes: Routes = [
  { path: '', component: FileUploadComponent },
  { path: 'list', component: FileListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
