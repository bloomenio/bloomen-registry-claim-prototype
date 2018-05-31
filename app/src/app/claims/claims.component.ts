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
import { HeroService } from '../services/hero.service';

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
  public isLoading: boolean;
  private firstime: boolean = true;

  constructor(public dialog: MatDialog,
    private claimsStore: ClaimsStore,
    private heroService: HeroService, 
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
    this.addressStore.getCurrentAddress().subscribe(
      (result) => {
        if (this.firstime){
           this.firstime = false;
        }
        else {
          this.isLoading = true;
          this.claims = [];
        }
          
      },
      (error) => {

      }
    );
  }

  /**
   * S'encarrega d'obrir el dialeg claimsdialog quan es clicka +/-
   */
  openDialog() {
    this.dialog.open(ClaimsDialogComponent);
  }

}
