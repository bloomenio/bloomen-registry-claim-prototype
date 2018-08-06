import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { HeroService } from '../services/hero.service';
import { ApiService } from '../services/api.service';
import { DialogComponent } from './../dialog/dialog.component';
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
  public heroes: Object[];
  public valor: string = "";
  private last_cerca: string = "";
  private quant: number;

  private currentAddress: AddressModel;

  private offset: number;
  title = '';

  scrollCallback;


  constructor(
    private quoteService: QuoteService,
    private heroService: HeroService,
    private apiService: ApiService,
    public dialog: MatDialog,
    private addressStore: AddressStore
  ) {
    this.isLoading = false;
    this.offset = 0;
    this.heroes = [];
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
  openDialog() {
    this.dialog.open(DialogComponent);
  }

  /**
   * Cada cop que es prem una tecla al cercador s'encarrega d'invalidar el llistat anterior si no correspon amb
   * l'actual cerca a més permet fer reload de la llista per cada tecla que afegim a la cerca
   */
  checkinput() {
    if (this.valor != this.last_cerca) {
      this.last_cerca = this.valor;
      this.heroes = [];
      this.offset = 0;
    }
  }

  /**
   * S'encarrega de fer la crida al servei per tal d'obtenir el nou llistat en funcio de la cerca
   */
  getStoriesInput() {
    this.searchname.nativeElement.blur();
    /*return new Promise<any>((resolve, reject) => {
      if (this.valor) {
        this.isLoading = true;
        this.last_cerca = this.valor;
        this.heroService.getLatestStoriesInput(this.offset, this.valor)
          .then(
            (result: any) => {
              console.log(result);
              if (result.data.results.length != 0) {
                resolve(this._processData(result, result.data.results.length))
              }
              this.isLoading = false;
            },
            (error) => {
              this.isLoading = false;
              console.error(error);
              reject(error);
            }
          );
      }
      else if (!this.valor){
        this.last_cerca = this.valor;
        this.isLoading = true;
        this.heroService.getLatestStories(this.offset).then((result: any) => {
          console.log(result);
          if (result.data.results.length != 0) {
            resolve(this._processData(result, result.data.results.length))
          }
          this.isLoading = false;
        }, (error) => {
          this.isLoading = false;
          console.error(error);
          reject(error);
        })
      }

    })*/


  }
  

  /**
   * S'encarrega d'incrementar el llistat en funcio del scroll que s'esta fent
   */
  private _processData(news: any, quant: number) {
    this.offset += 4;
    for (let i = 0; i < quant; ++i) {
      this.heroes.push(news.data.results[i])
    }
    return this.heroes;
  }
}
