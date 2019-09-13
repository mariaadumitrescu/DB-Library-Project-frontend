import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserBookService} from '../../services/userBook.service';
import {AuthenticationService} from '../../services/autentication.service';
import * as jwt_decode from 'jwt-decode';
import {UserService} from '../../services/user.service';
import {DialogEditProfileService} from '../../services/dialog-edit-profile/dialog-edit-profile.service';
import {FullUser} from '../../models/fullUser';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Genre} from '../../models/genre';
import {GenreService} from '../../services/genre.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit, OnDestroy {


  private available = [];
  private selected = [];
  private decoded: any;
  private currentUser: FullUser;
  private showBorrowed = false;
  private showGenreModule = false;

  constructor(private userService: UserService,
              private userBookService: UserBookService,
              private authenticationService: AuthenticationService,
              private dialogEditProfileService: DialogEditProfileService,
              private genreService: GenreService,
              private toastrService: ToastrService) {
  }

  async ngOnInit() {
    let setGenre = new Set<string>();
    let list: Array<Genre> = await this.genreService.getAllUnique().toPromise();
    list.forEach(genre => setGenre.add(genre.name));
    setGenre.forEach(genre => this.available.push(genre));
    this.showBorrowed = (localStorage.getItem('showBorrowed') == 'true');
    console.log(this.showBorrowed + 'again');
    const token = this.authenticationService.getToken();
    this.decoded = jwt_decode(token);
    this.currentUser = await this.userService.getUserByEmail(this.decoded.sub).toPromise();
    this.currentUser.genres.forEach(genre => this.selected.push(genre.name));
    this.selected.forEach(genre => {
      let index = this.available.indexOf(genre);
      if (index !== -1) this.available.splice(index, 1);
    })
  }



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  showBorrowedBooks() {
    this.showGenreModule = false;
    if (localStorage.getItem('showBorrowed') == 'false') {
      localStorage.setItem('showBorrowed', 'true');
    } else {
      localStorage.setItem('showBorrowed', 'false');
    }
    this.showBorrowed = (localStorage.getItem('showBorrowed') == 'true');
  }

  ngOnDestroy(): void {
    localStorage.setItem('showBorrowed', String(this.showBorrowed));
  }

  editAccount() {
    this.editUserDialog();
  }

  editUserDialog() {
    this.dialogEditProfileService.confirm('Edit your profile', 'Message').then(value => {
      this.userService.getUserByEmail(this.decoded.sub).toPromise()
        .then(t => {
          this.currentUser = t;
        });
    })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  showGenreEditModule() {
    this.showGenreModule = !this.showGenreModule;
    this.showBorrowed = false;
  }

  async updatePreferredGenres() {
    this.currentUser.genres = [];
    this.selected.forEach(genre => this.currentUser.genres.push(new Genre(genre)));
    await this.userService.updateUser(this.currentUser).toPromise();
    await this.userService.getUserByEmail(this.currentUser.email).toPromise().then(user => {
      this.currentUser = user;
      this.toastrService.success('Preferred genres list was updated');
    });
  }
}
