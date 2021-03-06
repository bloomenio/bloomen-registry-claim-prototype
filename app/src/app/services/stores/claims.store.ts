//Basic
import { Injectable } from "@angular/core";

//Observers
import { BehaviorSubject, Observable } from "rxjs";

//STORE
import { AddressStore } from './address.store';

//Services
import { ApiService } from '../../services/api.service';

//Models
import { AddressModel } from "../../Models/Address.model";

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
    private listTasks: BehaviorSubject<Object[]>;
    private offset: number;


    constructor(private apiService: ApiService,
        private addressStore: AddressStore) {
        this.offset = 0;
        this.listClaims = new BehaviorSubject<Object[]>([]);
        this.listTasks = new BehaviorSubject<Object[]>([]);
    }

    /**
     * It is the method that return the whole list of addresses
     */
    //Permet que per exemple desde claims.component.ts estiguem escoltant qualsevol canvi que hi hagi a la llista
    //de claims
    public getListClaims(): Observable<Object[]> {
        return this.listClaims;
    }

    public getListTasks(): Observable<Object[]> {
        return this.listTasks;
    }

    /**
     * Set the list address attribute in the store
     * @param listaddress is not necessary in case you call the right api
     */
    public setListClaims(currentadd: AddressModel): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.apiService.getClaims(currentadd.id).then(
                (result) => {
                    let s: Object[] = [];
                    for (let i = 0; i < result.length; ++i) {
                        this.apiService.getAsset(result[i].assetId, result[i].assetOwner).then(
                            (resultat) => {
                                let ob: Object = {
                                    data: result[i],
                                    song: resultat
                                }
                                s.push(ob);
                            })
                    }
                    this.listClaims.next(s);
                    resolve();
                }, (error) => {
                    console.log(error);
                    reject(error);
                }
            );
        })
    }

    public setListTasks(currentadd: AddressModel): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.apiService.getTask(currentadd.id).then(
                (result) => {
                    this.listTasks.next(result);
                    resolve();
                }, (error) => {
                    console.log(error);
                    reject(error);
                }
            );
        })
    }
}