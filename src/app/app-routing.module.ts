import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GridBooksComponent} from './pages/grid-books/grid-books.component';
import {BookService} from './services/book.service';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './helpers/auth.gurad';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {HomeComponent} from './home/home.component';
import {User} from './models/user';
import {UserComponent} from './user/user.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'grid-books', component: GridBooksComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'user', component: UserComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: 'login'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [BookService]
})
export class AppRoutingModule {
}
