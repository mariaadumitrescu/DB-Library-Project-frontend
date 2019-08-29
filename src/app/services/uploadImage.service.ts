import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Image} from '../models/image';
import {AuthenticationService} from './autentication.service';


@Injectable()
export class UploadImageService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  uploadImage(uploadData: FormData) {
    return  this.http.post('http://localhost:8080/uploadImage', uploadData,{
      headers: {
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      }
    }) as Observable<Image>;
  }

  removeImage(id: number){
    return this.http.delete('http://localhost:8080/removeImage/' + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authenticationService.getToken()
      }
    });
  }
}
