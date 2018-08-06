//Basic
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObservableMedia } from '@angular/flex-layout';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

//Services
import { AuthenticationService } from '../authentication/authentication.service';
import { I18nService } from '../i18n.service';
import { AddressStore } from '../../services/stores/address.store';

//Models
import { AddressModel } from '../../Models/Address.model';

//Components
import { NewAddressComponent } from '../../newaddress/newaddress.component';


@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  //Adreça actual del usuari
  public currentAddress: AddressModel;

  //Llista d'adreçes que pertanyen a l'usuari
  public listAddress: AddressModel[];

  private isFirst: Boolean = true;

  constructor(private router: Router,
    private titleService: Title,
    private media: ObservableMedia,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService,
    public dialog: MatDialog,
    private addressStore: AddressStore

  ) {
    //Començem a escoltar qualsevol canvi que hi hagi al immutable "currentAddress"
    this.addressStore.getCurrentAddress().subscribe((result) => {
      if (result != undefined) this.currentAddress = result;
    });
    this.addressStore.getListAddress().subscribe((result) => {
      if (result != []) {
        this.listAddress = result;
      }
    })
  }

  ngOnInit() {
    this.listAddress = [];
    //Li donem uns valors als immutables per començar
    this.addressStore.setListAddress();
    this.addressStore.setCurrentAddress(this.listAddress[0]); //quan es fa aquest setCurrentAddress listAddress == [] per tant
    //no fica inicialment a cap currentAddress
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.username : null;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }

  /**
   * Quan es clicki a una adreça s'executarà aquesta funció i canviara el immutable "currentAddress" per 
   * la nova adreça
   */
  public onSelectedAddress($event) {
    this.addressStore.setCurrentAddress($event);
  }

  /**
   * S'encarrega de veure si una adreça està seleccionada
   * @param  $event És l'adreça que volem veure si està seleccionada
   */
  public isSelectedAddress($event) {
    return this.currentAddress === $event;
  }

  /**
   * Quan es clicka el "NEW" button de les adreçes obre el nou dialeg "NewAddress"
   */
  public openDialog() {
    this.dialog.open(NewAddressComponent);
  }

}
