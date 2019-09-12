import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from '../autentication.service';
import * as jwt_decode from 'jwt-decode';
import {UserService} from '../user.service';
import {FullUser} from '../../models/fullUser';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-banned.component.html',
  styleUrls: ['./dialog-banned.component.css']
})
export class DialogBannedComponent implements OnInit, AfterViewInit {

  @Input() title: string;
  @Input() message: string;
  private currentUser: FullUser;
  private expiration: Date;


  constructor(private activeModal: NgbActiveModal,
              private authenticationService: AuthenticationService,
              private userService: UserService
  ) {
  }

  async ngOnInit() {
    let token = this.authenticationService.getToken();
    let decode = jwt_decode(token);
    let email = decode['sub'];
    this.userService.getUserByEmail(email).toPromise().then(user => {
      this.currentUser = user;
      this.expiration = this.currentUser.banUntil;
    });

  }

  public dismiss() {
    this.authenticationService.logout();
    this.activeModal.dismiss();
  }

  ngAfterViewInit(): void {
  }

}
