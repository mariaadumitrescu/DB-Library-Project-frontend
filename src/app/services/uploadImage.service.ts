import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Image} from '../models/image';


@Injectable()
export class UploadImageService {

  constructor(private http: HttpClient) { }

  uploadImage(uploadData: FormData) {
    return  this.http.post('http://localhost:8080/uploadImage', uploadData) as Observable<Image>;
  }
}
