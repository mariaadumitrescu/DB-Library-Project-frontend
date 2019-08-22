import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GridBooksComponent} from './pages/grid-books/grid-books.component';
import { BookService } from './services/book.service';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './helpers/auth.gurad';
import {RegisterPageComponent} from './pages/register-page/register-page.component';


const routes: Routes = [
  { path: '', component: GridBooksComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterPageComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [BookService]
})
export class AppRoutingModule { }
