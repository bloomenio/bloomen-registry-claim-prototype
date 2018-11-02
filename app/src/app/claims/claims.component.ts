//Basic
import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

//Environments
import { environment } from '@env/environment';

//Components
import { ClaimsDialogComponent } from './../claimsdialog/claimsdialog.component';

//Services
import { ClaimsStore } from '../services/stores/claims.store';
import { AddressStore } from '../services/stores/address.store';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-Claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
/**
 * S'encarrega de mostrar uns claims corresponents a una adreça concreta
 */
export class ClaimsComponent implements OnInit {

  public version: string = environment.version;
  public claims: Object[];
  public tasks: Object[];
  public isLoading: boolean;
  private firstime: boolean = true;

  constructor(public dialog: MatDialog,
    private claimsStore: ClaimsStore,
    private apiService: ApiService,
    private addressStore: AddressStore
  ) {
  }

  ngOnInit() {
    this.isLoading = false;
    //Ens subscribim per tal de rebre quan hi ha algun canvi a la llista de claims per tal de actualitzar-la
    this.claimsStore.getListClaims().subscribe(
      (result) => {
        this.isLoading = false;
        this.claims = result;
      },
      (error) => {
        console.log(error);
      });
    this.claimsStore.getListTasks().subscribe(
      (result) => {
        this.isLoading = false;
        this.tasks = result;
      },
      (error) => {
        console.log(error);
      });
    this.addressStore.getCurrentAddress().subscribe(
      (result) => {
        this.claims = [];
        this.isLoading = true;
        this.claimsStore.setListClaims(result);
        this.claimsStore.setListTasks(result);
        this.isLoading = false;

      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * S'encarrega d'obrir el dialeg claimsdialog quan es clicka +/-
   */
  putTask(taskId: string, from: string, to: string) {
    this.dialog.open(ClaimsDialogComponent, {
      data: {
        taskId: taskId,
        to: to,
        from: from
      }
    });
  }

}
