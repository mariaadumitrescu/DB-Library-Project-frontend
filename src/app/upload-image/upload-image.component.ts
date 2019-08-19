import {Component, EventEmitter,Output} from '@angular/core';
import {ImageResult, ResizeOptions} from 'ng2-imageupload';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {

  @Output() emittedForm: EventEmitter<FormData> = new EventEmitter<FormData>();

  private resizeOptions: ResizeOptions = {resizeMaxHeight: 1024, resizeMaxWidth: 1024};
  private selectedFile: any;
  private imgURL: string;
  private flag: boolean;
  private btnValue: string = 'Chose file';

  constructor() {}

  selected(imageResult: ImageResult) {
    fetch(imageResult.resized.dataURL).then(res => res.blob()).then(blob => {
      this.selectedFile = blob
      this.imgURL = imageResult.resized.dataURL;
      document.getElementById('btnUpload').className = 'btn btn-success btn-file';
      this.flag = true;
      this.btnValue = 'Replace file';

      const uploadData = new FormData();
      uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
      this.emittedForm.emit(uploadData);
      this.flag = false;
    });

  }
}
