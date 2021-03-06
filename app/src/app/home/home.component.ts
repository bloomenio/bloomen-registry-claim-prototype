import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { DialogComponent } from './../dialog/dialog.component';
import { AddRegistryComponent } from './../addregistry/addregistry.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HttpModule } from '@angular/http';
import { QuoteService } from './quote.service';
import { InfiniteScrollerDirective } from './infinite-scroller.directive';
import { BehaviorSubject } from 'rxjs';

import { AddressStore } from '../services/stores/address.store';
import { AddressModel } from '../Models/Address.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


/**
 * S'encarrega de mostrar un llistat en funcio de la busqueda que es faci al cercador
 */
export class HomeComponent implements OnInit {

  @ViewChild('searchname') searchname;
  public isLoading: boolean;
  public songs: Object[];
  public valor: string = "";
  private last_cerca: string = "";
  private quant: number;

  private currentAddress: AddressModel;

  private offset: number;
  title = '';

  scrollCallback;


  constructor(
    private quoteService: QuoteService,
    private apiService: ApiService,
    public dialog: MatDialog,
    private addressStore: AddressStore
  ) {
    this.isLoading = false;
    this.offset = 0;
    this.songs = [];
    this.title = 'Angular Infinite Scroller with RxJS';
    this.scrollCallback = this.getStoriesInput.bind(this);
  }

  ngOnInit() {
    this.addressStore.getCurrentAddress().subscribe((result) => {
      this.currentAddress = result; 
    });
  }

  /**
   * S'encarrega d'obrir el dialeg quan es clicka el button en forma de triangle
   */
  postClaim(assetId: string, assetOwner: string) {
    this.dialog.open(DialogComponent, {data: {
      assetid: assetId,
      assetowner: assetOwner,
      currentadd: this.currentAddress.id
    }});
  }

  addRegistry() {
    this.dialog.open(AddRegistryComponent, {data: {
      currentadd: this.currentAddress.id
    }});
  }

  /**
   * Cada cop que es prem una tecla al cercador s'encarrega d'invalidar el llistat anterior si no correspon amb
   * l'actual cerca a més permet fer reload de la llista per cada tecla que afegim a la cerca
   */
  checkinput() {
    if (this.valor != this.last_cerca) {
      this.last_cerca = this.valor;
      this.songs = [];
      this.offset = 0;
    }
  }

  /**
   * S'encarrega de fer la crida al servei per tal d'obtenir el nou llistat en funcio de la cerca
   */
  getStoriesInput() {
    this.searchname.nativeElement.blur();
    return new Promise<any>((resolve, reject) => {
      if (this.valor) {
        this.isLoading = true;
        this.last_cerca = this.valor;
        this.apiService.searchMusic(this.valor, this.offset)
          .then(
            (result: any) => {
              if (result.length != 0) {
                resolve(this._processData(result, result.length))
              }
              this.isLoading = false;
              resolve();
            },
            (error) => {
              this.isLoading = false;
              console.error(error);
              reject(error);
            }
          );
      }
    })
  }
  

  /**
   * S'encarrega d'incrementar el llistat en funcio del scroll que s'esta fent
   */
  private _processData(news: any, quant: number) {
    this.offset += 4;
    for (let i = 0; i < quant; ++i) {
      this.songs.push(news[i])
    }
    return this.songs;
  }

  isnotmine(add: string){
    if (this.currentAddress.id != undefined) {
      if (add == this.currentAddress.id) 
          return false;
      else {
        return true;
      }
    }
  }

}
