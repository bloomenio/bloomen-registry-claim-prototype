import { Component, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../services/hero.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-claimsdialog',
  templateUrl: './claimsdialog.component.html',
  styleUrls: ['./claimsdialog.component.css']
})
/**
 * És el dialeg que s'obre quan clickem al +/- de claims.
 */
export class ClaimsDialogComponent {


  public submitted: boolean = false;
  public reasons: string;

  constructor(private dialogRef: MatDialogRef<ClaimsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.reasons = "";
  }

  /**
   * S'encarrega de tancar el dialeg
   */
  close() {
    this.dialogRef.close();
  }

  /**
   * S'encarrega de mostrar el valor submitted
   */
  onSubmit() {
    this.submitted = true;
  }

}
