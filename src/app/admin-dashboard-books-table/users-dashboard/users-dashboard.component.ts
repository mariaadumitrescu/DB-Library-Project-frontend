import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Subscription} from 'rxjs';
import {ResponsePageList} from '../../models/responsePageList';
import {FullUser} from '../../models/fullUser';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {
  @Output() fullUserEventEmitter: EventEmitter<FullUser> = new EventEmitter<FullUser>();
  @Output() userEmitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  private value: any;
  private users: FullUser[];
  private nrOfElements: any;
  private p: any;
  private subscriptionInit: Subscription;
  private paginatedUsers: ResponsePageList<FullUser>;
  private selectedUser: FullUser;
  private subscriptionPageGridChanged: Subscription;
  private subscriptionInputSearchChanged: Subscription;

  constructor(private userService: UserService) {
  }

  initListOfUsers() {
    this.subscriptionInit = this.userService.getPaginatedUsers('id', 'ASC', '0', '5', '').subscribe(result => {
      this.paginatedUsers = result;
      this.users = this.paginatedUsers.pageList;
      this.selectedUser = this.users[0];
      this.nrOfElements = this.paginatedUsers.nrOfElements;
    });
  }

  ngOnInit() {
    this.p = 0;
    this.initListOfUsers();
  }

  inputSearchChanged() {
    this.subscriptionInputSearchChanged = this.userService.getPaginatedUsers('id', 'ASC', '0', '5', this.value).subscribe(
      p => {
        this.paginatedUsers = p;
        this.users = this.paginatedUsers.pageList;
        this.nrOfElements = this.paginatedUsers.nrOfElements;
      }
    );
  }

  pageGridChanged(event) {
    this.p = event;
    this.subscriptionPageGridChanged = this.userService.getPaginatedUsers('id', 'ASC', (this.p - 1).toString(), '5', '').subscribe(p => {
      this.paginatedUsers = p;
      this.users = this.paginatedUsers.pageList;
      this.nrOfElements = this.paginatedUsers.nrOfElements;
    });
  }

  showDetails(user: FullUser) {
    this.fullUserEventEmitter.emit(user);
    this.userEmitted.emit(true);
  }
}
