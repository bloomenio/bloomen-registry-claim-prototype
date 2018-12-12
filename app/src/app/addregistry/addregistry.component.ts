import { Component, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UploadEvent, UploadFile } from 'ngx-file-drop';

@Component({
  selector: 'app-addregistry',
  templateUrl: './addregistry.component.html',
  styleUrls: ['./addregistry.component.css']
})
/**
 * És el dialeg que s'obre quan premem el boto en forma de triangle de home.html
 */
export class AddRegistryComponent {

  public submitted: boolean = false;
  public name: string;
  public author: string;
  public description: string;
  public currentAddress: string;

  public file: UploadFile;

  public dropped(event: UploadEvent) {
    var myfile = '';
    this.file = event.files[0];
    const fileEntry = this.file.fileEntry;
    const reader = new FileReader();
    fileEntry.file(file => {
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(file.name);
        console.log(file.type);
        console.log(reader.result.split(',')[1])
        console.log(atob(reader.result.split(',')[1]))
        //myfile = JSON.parse(reader.result);
        //console.log(myfile);
        //const imageUrl = reader.result;
      };
    })
    /*
    fileEntry.file(info => {
      console.log(info)
    })
    */
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }


  constructor(private dialogRef: MatDialogRef<AddRegistryComponent>, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentAddress = data.currentadd;
  }

  /**
   * S'encarrega de tancar el dialeg obert
   */
  close() {
    this.dialogRef.close();
  }

  /**
   * Quan s'omple el formulari és fa submit les dades es recullen i es mostren al dialeg, a més es fa una crida a l'api a un metode qualsevol
   * ja que aquesta api no es la corresponent
   */
  onSubmit() {
    this.submitted = true;
    this.dialogRef.close();
  }

  addRegistry() {
    this.apiService.addRegistry(/* this.name, this.author, this.description */this.file, this.currentAddress);
  }

}
