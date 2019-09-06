import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthenticationService} from '../autentication.service';
import {ImageResult, ResizeOptions} from 'ng2-imageupload';
import {Image} from '../../models/image';
import {FullUser} from '../../models/fullUser';
import * as jwt_decode from 'jwt-decode';
import {UserService} from '../user.service';
import {ToastrService} from 'ngx-toastr';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-edit-profile.component.html',
  styleUrls: ['./dialog-edit-profile.component.css']
})
export class DialogEditProfileComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  private selectedFile: any;
  private imgURL: string;
  private btnValue: string = 'Select image ( * required )';
  private uploadedImage: Image;
  private user: FullUser;
  private firstName: string;
  private lastName: string;
  private byteBlob: string;


  constructor(private activeModal: NgbActiveModal,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private toastrService: ToastrService) {
  }

  async ngOnInit() {
    let token = this.authenticationService.getToken();
    let decode = jwt_decode(token);
    let email = decode['sub'];
    this.user = await this.userService.getUserByEmail(email).toPromise();
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.selectedFile = this.user.img;
    this.imgURL = 'data:image/jpeg;base64,' + this.user.img.pic;
    this.btnValue = 'Choose another image';
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public accept() {
    this.activeModal.close(true);
  }


  async save() {
    if (this.croppedImage) {
      await fetch(this.selectedFile.base64).then(res => res.blob()).then(() => {
        let splitBlob = this.selectedFile.base64.split(',');
        this.byteBlob = splitBlob[1];
        this.btnValue = 'Choose another image';
      });
      this.uploadedImage = new Image(this.selectedFile.file.name, this.selectedFile.file.type, this.byteBlob);
    } else {
      this.uploadedImage = this.user.img;
    }
    this.user.img = this.uploadedImage;
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    console.log(this.user);
    this.userService.updateUser(this.user).subscribe(() => {
      this.toastrService.success('The profile was updated with success!', 'Congratulation!');
      this.accept();
    }, error => {
      this.toastrService.error(error);
    });
  }


  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.selectedFile = event;
    this.croppedImage = event.base64;
    this.imgURL = event.base64;
  }

  imageLoaded() {
  }

  cropperReady() {
  }

  loadImageFailed() {
    // show message
  }
}
