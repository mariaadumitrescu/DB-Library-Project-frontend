import {Component, OnInit} from '@angular/core';

import {FullUser} from '../../models/fullUser';
import {UserService} from '../../services/user.service';
import {UserBookService} from '../../services/userBook.service';
import {AuthenticationService} from '../../services/autentication.service';
import {DialogEditProfileService} from '../../services/dialog-edit-profile/dialog-edit-profile.service';
import {GenreService} from '../../services/genre.service';
import {ToastrService} from 'ngx-toastr';
import {Genre} from '../../models/genre';
import * as jwt_decode from 'jwt-decode';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Router} from '@angular/router';

@Component({
  selector: 'app-preferred-genres-page',
  templateUrl: './preferred-genres-page.component.html',
  styleUrls: ['./preferred-genres-page.component.css'],
})
export class PreferredGenresPageComponent implements OnInit {

  private available = [];
  private selected = [];
  private decoded: any;
  private currentUser: FullUser;

  constructor(private userService: UserService,
              private userBookService: UserBookService,
              private authenticationService: AuthenticationService,
              private dialogEditProfileService: DialogEditProfileService,
              private genreService: GenreService,
              private toastrService: ToastrService,
              private router: Router) {
  }


  async ngOnInit() {
    let setGenre = new Set<string>();
    let list: Array<Genre> = await this.genreService.getAllUnique().toPromise();
    list.forEach(genre => setGenre.add(genre.name));
    setGenre.forEach(genre => this.available.push(genre));
    const token = this.authenticationService.getToken();
    this.decoded = jwt_decode(token);
    this.currentUser = await this.userService.getUserByEmail(this.decoded.sub).toPromise();
    this.currentUser.genres.forEach(genre => this.selected.push(genre.name));
    this.selected.forEach(genre => {
      let index = this.available.indexOf(genre);
      if (index !== -1) {
        this.available.splice(index, 1);
      }
    });
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

  async updatePreferredGenres() {
    this.currentUser.genres = [];
    this.selected.forEach(genre => this.currentUser.genres.push(new Genre(genre)));
    this.currentUser.skipped = true;
    await this.userService.updateUser(this.currentUser).toPromise();
    await this.userService.getUserByEmail(this.currentUser.email).toPromise().then(user => {
      this.currentUser = user;
      this.toastrService.success('Preferred genres list was updated');
      this.router.navigate(['/grid-books']);
    });
  }


  async skip() {
    await this.userService.getUserByEmail(this.currentUser.email).toPromise().then(user => {
      this.currentUser = user;
      this.currentUser.skipped = true;
      this.userService.updateUser(this.currentUser).toPromise().then(() => {
        this.router.navigate(['/grid-books']);
      });
    });
  }
}
