//Basic
import { Component, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//Services
import { HeroService } from '../services/hero.service';
import { AddressStore } from '../services/stores/address.store';

//Models
import { AddressModel } from '../Models/Address.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-newaddress',
  templateUrl: './newaddress.component.html',
  styleUrls: ['./newaddress.component.css']
})
/**
 * És el component que correspon al dialeg per tal de crear una nova adreça
 */
export class NewAddressComponent {


  list: AddressModel[];
  submitted: boolean = false;
  hero: any;
  newadd: string;

  listAddressSubscription: Subscription

  constructor(private dialogRef: MatDialogRef<NewAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private addressStore: AddressStore
  ) {
    this.newadd = "";
    this.listAddressSubscription = this.addressStore.getListAddress().subscribe(
      (result) => {
        this.list = result;
      }, (error) => {
        console.log(error);
      })
  }

  /**
   * S'encarrega de tancar el dialeg
   */
  close() {
    this.dialogRef.close();
  }

  /**
   * Quan es clicka el "Submit" l'atribut "submitted" a true i per tal es mostra el <div *ngIf=submitted>
   * a més, s'agafa l'ultima llista de claims i li fem un push del valor de la nova adreça i actualitzem la llista
   * de claims
   */
  onSubmit() {
    this.submitted = true;
    let i: boolean = true;
    for (let j = 0; j < this.list.length; ++j){
      if (this.list[j].name == this.newadd) {
        i = false;
      }
    }
    //Agafem l'ultima llista de adreçes i l'afegim la nova adreça i actualitzem la llista d'adreçes
    //Aquest subscribe i unsubscribe esta ben col·locat al "onSubmit()"?? funciona pero potser no esta be
    if (i) {
      this.list.push({ name: this.newadd});
      this.addressStore.setListAddress(this.list);
    }
  }

  ngOnDestroy() {
    this.listAddressSubscription.unsubscribe();
  }

}
