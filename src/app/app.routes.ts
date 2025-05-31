import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./upload/upload.page').then(m => m.UploadPage)
  }
];
