//Basic
import { Injectable } from "@angular/core";

//Observers
import { BehaviorSubject, Observable } from "rxjs";

//STORE
import { AddressStore } from './address.store';

//Services
import { HeroService } from "../../services/hero.service";

/**
 * It is the store of the claims 
 */
@Injectable()
export class ClaimsStore {

    /**
    * List claims of the store
    */
    //És la llista de Claims que tenim al Controller claims.component.ts
    private listClaims: BehaviorSubject<Object[]>;
    private offset: number;


    constructor(private heroService: HeroService,
        private addressStore: AddressStore) {
        this.offset = 0;
        this.listClaims = new BehaviorSubject<Object[]>([]);
        //Volem que la llista de Claims canvii cada cop que canvii el "currentAddress" per tant és subscribim
        //a l'esdeveniment que controla quan hi ha un canvi al currentAddress
        this.addressStore.getCurrentAddress().subscribe((result) => {
            //Si agafa el valor de currentAddress undefined quan aquest s'inicialitzi el currentAddress es carregaria 
            //2 listclaims 
            if (result != undefined) {    
                this.setListClaims(this.offset);
                this.offset += 4;
            }

        })
    }

    /**
     * It is the method that return the whole list of addresses
     */
    //Permet que per exemple desde claims.component.ts estiguem escoltant qualsevol canvi que hi hagi a la llista
    //de claims
    public getListClaims(): Observable<Object[]> {
        return this.listClaims;
    }

    /**
     * Set the list address attribute in the store
     * @param listaddress is not necessary in case you call the right api
     */
    private setListClaims(offset: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.heroService.getLatestStories(offset).then(
                (result) => {
                    this.listClaims.next(result.data.results);
                    resolve();
                }, (error) => {
                    console.log(error);
                    reject(error);
                }
            );
        })
    }
}