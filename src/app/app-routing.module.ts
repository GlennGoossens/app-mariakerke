import { AdminComponent } from './components/admin/admin.component';
import { IndexComponent } from './components/index/index.component';
import { BookComponent } from './components/book/book.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: IndexComponent
  },
  {
    path: 'book', component: BookComponent
  },
  {
    path: 'admin', component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
