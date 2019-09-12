import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FullUser} from '../../models/fullUser';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnChanges {


  @Input() selectedUser: FullUser;
  private enableButton: any;
  private banButton: any;
  private model: any;
  private banUntil: Date;

  constructor(private userService: UserService,
              private toastrService: ToastrService) {
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
    this.banUntil = new Date(this.model.year, this.model.month,this.model.day,12,0,0);
    this.selectedUser.banUntil = this.banUntil;
    this.selectedUser.banned = true;
    this.userService.updateUser(this.selectedUser).toPromise().then(() => {
      this.toastrService.success('The user was banned until: ' + this.selectedUser.banUntil);
      console.log(this.banUntil.toLocaleString())
      this.model = null;
      this.userService.getUserByEmail(this.selectedUser.email).subscribe(user => this.selectedUser = user);
    }, reason => {
      this.toastrService.error(reason);
    });
  }
}
