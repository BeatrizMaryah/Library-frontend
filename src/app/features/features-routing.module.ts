import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from '../core/guards/permission.guard';
import { PageNotFoundComponent } from '../core/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: 'books',
    canActivate: [PermissionGuard],
    loadChildren: async () =>
      import('./book/book.module').then((m) => m.BookModule),
  },
  {
    path: 'libraries',
    canActivate: [PermissionGuard],
    loadChildren: async () =>
      import('./library/library.module').then((m) => m.LibraryModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
