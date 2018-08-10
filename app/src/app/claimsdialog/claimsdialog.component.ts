import { Component, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ClaimsStore } from '../services/stores/claims.store';
import { AddressModel } from "../Models/Address.model";

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
  private to: string;
  private from: string;
  private issueId: string;

  constructor(private dialogRef: MatDialogRef<ClaimsDialogComponent>, private claimsStore: ClaimsStore, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.reasons = "";
    this.to = data.to;
    this.from = data.from;
    this.issueId = data.issueid;
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

  putTask() {
    this.apiService.putTask(this.to, this.issueId, this.reasons, this.from).then(
      () => this.claimsStore.setListTasks({id: this.to})
    ).then(
      () => { this.dialogRef.close(); }
    );
  }

}
