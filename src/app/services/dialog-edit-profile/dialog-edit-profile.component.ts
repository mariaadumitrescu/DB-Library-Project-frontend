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
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Genre} from '../../models/genre';
import {GenreService} from '../genre.service';

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
  private imageChangedEvent: any = '';
  private croppedImage: any = '';
  private todo = [];
  private done = [];

  constructor(private activeModal: NgbActiveModal,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private toastrService: ToastrService,
              private genreService: GenreService) {
  }

  async ngOnInit() {
    let setGenre = new Set<string>();
    let list: Array<Genre> = await this.genreService.getAllUnique().toPromise();
    list.forEach(genre => setGenre.add(genre.name));
    setGenre.forEach(genre => this.todo.push(genre));

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


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    console.log(this.done);
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
