import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FullUser} from '../../models/fullUser';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {UserBook} from '../../models/userBook';
import {ResponsePageList} from '../../models/responsePageList';
import {UserBookService} from '../../services/userBook.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/autentication.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnChanges, OnInit {


  @Input() selectedUser: FullUser;
  private currentUser: FullUser;
  private enableButton: any;
  private banButton: any;
  private model: any;
  private banUntil: Date;


  private borrows: UserBook[];
  private nrOfElements: any;
  private p: any;
  private paginatedBorrows: ResponsePageList<UserBook>;

  constructor(private userService: UserService,
              private toastrService: ToastrService,
              private userBookService: UserBookService,
              private authenticationService: AuthenticationService) {
  }

  async initListOfBorrows() {
    await this.userBookService.getBorrowedBooks('id', 'ASC', '0', '5', String(this.selectedUser.id)).toPromise().then(userBooks => {
      this.paginatedBorrows = userBooks;
      this.borrows = this.paginatedBorrows.pageList;
      this.nrOfElements = this.paginatedBorrows.nrOfElements;
    });
  }


  async ngOnInit() {
    let token = this.authenticationService.getToken();
    let decoded = jwt_decode(token);
    let email = decoded['sub'];
    await this.userService.getUserByEmail(email).toPromise().then(user => this.currentUser = user);
    this.initListOfBorrows();
  }


  pageGridChanged(event) {
    this.p = event;
    this.userBookService.getBorrowedBooks('id', 'ASC', (this.p - 1).toString(), '5', String(this.selectedUser.id)).subscribe(userBooks => {
      this.paginatedBorrows = userBooks;
      this.borrows = this.paginatedBorrows.pageList;
      this.nrOfElements = this.paginatedBorrows.nrOfElements;
    });
  }


  async returnBorrowBook(userBook: UserBook) {
    this.userBookService.returnBorrowBook(userBook).subscribe(() => {
      this.toastrService.success('The book with title: ' + userBook.book.title + ' was returned', 'Returned with success!');
      let nr = Math.floor(this.nrOfElements / 5);
      if (this.nrOfElements % 5 == 0) {
        this.pageGridChanged(nr);
      } else {
        this.pageGridChanged(nr + 1);
      }
    });
  }

  async activate() {
    this.userService.findVerificationTokenByEmail(this.selectedUser.email).subscribe(value => {
      this.userService.registerConfirm(value['token']).subscribe(() => {
        this.toastrService.success('The user with email: ' + this.selectedUser.email + ' was activated');
        this.userService.getUserByEmail(this.selectedUser.email).toPromise().then(v => {
          this.selectedUser = v;
          this.changeEnableButton(this.selectedUser);
        });

      }, error => {
        this.toastrService.error(error);
      });
    });

  }

  async ngOnChanges(changes: SimpleChanges) {
    this.selectedUser = await this.userService.getUserByEmail(this.selectedUser.email).toPromise();
    this.enableButton = document.getElementById('enable');
    this.banButton = document.getElementById('banButton');
    this.model = null;
    this.changeEnableButton(this.selectedUser);
    this.initListOfBorrows();
  }

  private changeEnableButton(user: FullUser) {
    if (this.enableButton) {
      if (user.enabled) {
        this.enableButton.innerHTML = 'Disable account';
      } else {
        this.enableButton.innerHTML = 'Enable account';
      }
    }
  }

  async banOrUnBan() {
    this.selectedUser.banned = !this.selectedUser.banned;
    this.selectedUser.banUntil = null;
    this.userService.updateUser(this.selectedUser).subscribe(() => {
      this.userService.getUserByEmail(this.selectedUser.email).toPromise().then(user => {
        this.selectedUser = user;
        if (this.selectedUser.banned) {
          this.toastrService.success('This user was permanently banned!');
        } else {
          this.toastrService.success('This user was unbanned!');
        }
      }, reason => this.toastrService.error(reason));
    }, error => this.toastrService.error(error));
    this.selectedUser = await this.userService.getUserByEmail(this.selectedUser.email).toPromise();
    this.changeEnableButton(this.selectedUser);
  }

  onDateSelected() {
    this.banUntil = new Date(this.model.year, this.model.month, this.model.day, 12, 0, 0);
    this.selectedUser.banUntil = this.banUntil;
    this.selectedUser.banned = true;
    this.userService.updateUser(this.selectedUser).toPromise().then(() => {
      this.toastrService.success('The user was banned until: ' + this.selectedUser.banUntil);
      console.log(this.banUntil.toLocaleString());
      this.model = null;
      this.userService.getUserByEmail(this.selectedUser.email).subscribe(user => this.selectedUser = user);
    }, reason => {
      this.toastrService.error(reason);
    });
  }
}
