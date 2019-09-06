import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserBookService} from '../../services/userBook.service';
import {AuthenticationService} from '../../services/autentication.service';
import {User} from '../../models/user';
import * as jwt_decode from 'jwt-decode';
import {UserService} from '../../services/user.service';
import {DialogEditProfileService} from '../../services/dialog-edit-profile/dialog-edit-profile.service';
import {FullUser} from '../../models/fullUser';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit, OnDestroy {
  private decoded: any;
  private currentUser: FullUser;
  private showBorrowed = false;

  constructor(private userService: UserService,
              private userBookService: UserBookService,
              private authenticationService: AuthenticationService,
              private dialogEditProfileService: DialogEditProfileService) {
  }

  ngOnInit() {
    this.showBorrowed = (localStorage.getItem('showBorrowed') == 'true');
    console.log(this.showBorrowed + 'again');
    const token = this.authenticationService.getToken();
    this.decoded = jwt_decode(token);
    this.userService.getUserByEmail(this.decoded.sub).toPromise()
      .then(t => {
        this.currentUser = t;
        console.log(t)
      });
  }

  showBorrowedBooks() {
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
    this.bannedUserDialog();
  }

  bannedUserDialog() {
    this.dialogEditProfileService.confirm("Edit your profile","Message").then(value => {
      this.userService.getUserByEmail(this.decoded.sub).toPromise()
        .then(t => {
          this.currentUser = t;
        });
    })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
