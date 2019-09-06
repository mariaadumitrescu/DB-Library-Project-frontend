import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from '../autentication.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-banned.component.html',
  styleUrls: ['./dialog-banned.component.css']
})
export class DialogBannedComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  currentRate: any;


  constructor(private activeModal: NgbActiveModal, private authenticationService :AuthenticationService) { }

  ngOnInit() {
  }

  public dismiss() {
    this.authenticationService.logout();
    this.activeModal.dismiss();

  }

}
