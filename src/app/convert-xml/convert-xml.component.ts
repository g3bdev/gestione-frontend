import {Component} from '@angular/core';
import {DataService} from "../data.service";
import {faArrowLeft, faFileAlt} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";
import {CommonService} from "../common.service";

@Component({
  selector: 'app-convert-xml',
  templateUrl: './convert-xml.component.html',
  styleUrls: ['./convert-xml.component.css']
})
export class ConvertXmlComponent {

  constructor(private dataService: DataService, private common: CommonService) {
  }

  file: File | undefined;
  selected = false;
  fa_arrowLeft = faArrowLeft;
  fa_file = faFileAlt;
  fa_size: SizeProp = 'xl';

  onChange(event: any) {
    this.file = event.target.files[0];
    if (this.file?.name.split('.')[1] !== 'xml') {
      this.common.openSnackBar('File non valido.');
      this.selected = false;
      return;
    } else {
      this.selected = true;
    }
  }

  onUpload() {
    if (this.file) {
      this.dataService.uploadFile(this.file).subscribe({
        next: (data) => {
          let binaryData = [];
          binaryData.push(data);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: 'blob'}));
          let filename = this.file!.name.split('.')[0];
          downloadLink.setAttribute('download', filename + '.csv');
          document.body.appendChild(downloadLink);
          downloadLink.click();
        }, error: (error) => {
          console.log(error);
          this.common.openSnackBar('Errore durante la conversione del file.')
        }
      });
    }
  }

  protected readonly faArrowLeft = faArrowLeft;
  protected readonly window = window;
}
