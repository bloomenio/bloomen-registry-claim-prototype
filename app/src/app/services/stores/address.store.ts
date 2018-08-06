//Basic
import { Injectable } from "@angular/core";

//Models
import { AddressModel } from "../../Models/Address.model";

//Observers
import { BehaviorSubject, Observable } from "rxjs";

//Services
import { HeroService } from "../../services/hero.service";
import { ApiService } from "../../services/api.service";

/**
 * It is the store of the addresses 
 */
@Injectable()
export class AddressStore {
    /**
    * Current address of the store
    */
    private currentAddress: BehaviorSubject<AddressModel>

    /**
    * List address of the store
    */
    private listAddress: BehaviorSubject<AddressModel[]>


    constructor(private apiService: ApiService, private heroService: HeroService) {
        //El BehaviorSubject permet donar-li un valor inicial a diferencia del Subject
        this.currentAddress = new BehaviorSubject<AddressModel>(undefined);
        this.listAddress = new BehaviorSubject<AddressModel[]>([]);
    }

    /**
     * It is the method that returns the current address
     */
    //Aquest getCurrentAddress retorna el BehaviorSubject (cal retornar-lo com si fos un Observable) i això
    //permetrà a un Controller, un altre Store ... subscriure's al esdeveniment "currentAddress" fent un subscribe
    public getCurrentAddress(): Observable<AddressModel> {
        return this.currentAddress;
    }

    /**
     * It is the method that return the whole list of addresses
     */
    public getListAddress(): Observable<AddressModel[]> {
        return this.listAddress;
    }

    /**
     * Set the current address attribute in the store
     * @param currentaddress is not necessary in case you call the right api
     */
    //Aqui donem valor al "currentAddress" normalment no tindria parametre i enlloc de 
    //de "this.heroService.getLatestStories(10)" aniria la crida a l'api o el que sigui que ens retornaria la 
    //currentaddress i llavors fariem this.currentAddress.next(result); per exemple
    public setCurrentAddress(currentaddress: AddressModel): Promise<any> {
        //Fem una Promise perquè és async i ens permet veure si hi hagut errors o tot ha anat be
        return new Promise<any>((resolve, reject) => {
            this.currentAddress.next(currentaddress);
            resolve();
        })
    }

    /**
     * Set the list address attribute in the store
     * @param listaddress is not necessary in case you call the right api
     */
    public setListAddress(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.apiService.getAddresses().then((result) => {
                this.listAddress.next(result);
                resolve();
            }, (error) => {
                reject(error);
            })
        })
    }

    public newAddress(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.apiService.postAddress().then((result) => {
                this.listAddress.next(result);
                resolve();
            }), (error) => {
                reject(error);
            }
        })
    }
}