import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GridBooksComponent} from './pages/grid-books/grid-books.component';
import { BookService } from './services/book.service';
import {AdminDashboardBooksTableComponent} from './admin-dashboard-books-table/admin-dashboard-books-table.component';
import {AuthGuard} from './helpers/auth.gurad';
import { BookPageComponent } from './pages/book-page/book-page.component';
import {HomeComponent} from './home/home.component';
import {BorrowedBooksComponent} from './pages/borrowed-books/borrowed-books.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import {paths} from './app-paths';
import {PathResolveServiceService} from './services/path-resolve-service.service';
import {AdminGuard} from './helpers/admin.guard';
import { PreferredGenresPageComponent } from './pages/preferred-genres-page/preferred-genres-page.component';
import {TopRatedBooksComponent} from './pages/top-rated/top-rated.component';
import {TopBorrowedComponent} from './pages/top-borrowed/top-borrowed.component';
import {BorrowChartComponent} from './admin-dashboard-books-table/borrow-chart/borrow-chart.component';
import {BookChartComponent} from './admin-dashboard-books-table/book-chart/book-chart.component';

const routes: Routes = [
  { path: paths.gridBooks, component: GridBooksComponent, canActivate: [AuthGuard] },
  { path: paths.bookPage, component: BookPageComponent, canActivate: [AuthGuard]},
  { path: '', component: HomeComponent },
  { path: paths.adminTable, component: AdminDashboardBooksTableComponent, canActivate: [AuthGuard,AdminGuard]},
  { path: paths.borrowChart, component: BorrowChartComponent, canActivate: [AuthGuard,AdminGuard]},
  { path: paths.bookStatus, component: BookChartComponent, canActivate: [AuthGuard,AdminGuard]},
  { path: paths.borrowedBooks, component: BorrowedBooksComponent, canActivate: [AuthGuard]},
  { path: paths.topRatedBooks, component: TopRatedBooksComponent, canActivate: [AuthGuard]},
  { path: paths.topBorrowedBooks, component: TopBorrowedComponent, canActivate: [AuthGuard]},
  {path: paths.preferredGenres, component:PreferredGenresPageComponent},
  {path: '**', resolve: { path: PathResolveServiceService },component: NotFoundPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [BookService]
})
export class AppRoutingModule { }
