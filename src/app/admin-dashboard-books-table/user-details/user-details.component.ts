import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ConfirmationDialogService} from '../../services/dialog-confirm/dialog-confirm.service';
import {FullUser} from '../../models/fullUser';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnChanges {


  @Input() selectedUser: FullUser;
  private enableButton: any;
  private banButton: any;
  model: any;

  constructor(private userService: UserService, private confirmationDialogService: ConfirmationDialogService) {
  }

  async activateOrDeactivate() {
    this.selectedUser.enabled = !this.selectedUser.enabled;
    await this.userService.updateUser(this.selectedUser).toPromise();
    this.selectedUser = await this.userService.getUserByEmail(this.selectedUser.email).toPromise();
    this.changeEnableButton(this.selectedUser);
  }

  async ngOnChanges(changes: SimpleChanges) {
    this.selectedUser = await this.userService.getUserByEmail(this.selectedUser.email).toPromise();
    this.enableButton = document.getElementById('enable');
    this.banButton = document.getElementById('banButton');
    this.changeEnableButton(this.selectedUser);
  }

  private changeEnableButton(user: FullUser){
    if (this.enableButton) {
      if (user.enabled) {
        this.enableButton.innerHTML = 'Disable account';
      } else {
        this.enableButton.innerHTML = 'Enable account';
      }
    }
    if (this.banButton) {
      if (!user.banned) {
        this.banButton.innerHTML = 'Ban account';
      } else {
        this.banButton.innerHTML = 'UnBan account';
      }
    }
  }

  async banOrUnBan() {
    this.selectedUser.banned = !this.selectedUser.banned;
    await this.userService.updateUser(this.selectedUser).toPromise();
    this.selectedUser = await this.userService.getUserByEmail(this.selectedUser.email).toPromise();
    this.changeEnableButton(this.selectedUser);
  }

  onDateSelected() {
    console.log(this.model)
  }
}
