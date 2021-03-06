import { Component, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
/**
 * És el dialeg que s'obre quan premem el boto en forma de triangle de home.html
 */
export class DialogComponent {

  public submitted: boolean = false;
  public assetId: string;
  public assetOwner: string;
  public currentAddress: string;
  public description: string;

  

  constructor(private dialogRef: MatDialogRef<DialogComponent>, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.assetId = data.assetid;
    this.assetOwner = data.assetowner;
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

  postClaim() {
    this.apiService.postClaim(this.assetId, this.assetOwner, this.description, this.currentAddress);
  }

}
