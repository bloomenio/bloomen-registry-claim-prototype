import { Component, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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

  

  constructor(private dialogRef: MatDialogRef<AddRegistryComponent>, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: any)
  {
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
    this.apiService.addRegistry(this.name, this.author, this.description, this.currentAddress);
  }

}
