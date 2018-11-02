import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AddressModel } from '@app/Models/Address.model';

@Injectable()
export class ApiService {

  constructor(public http: HttpClient) { }

  getAddresses(): Promise<any> {
    return this.http
      .get(`wallet`).toPromise();
  }

  postAddress(): Promise<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`wallet`, headers).toPromise();
  }

  searchMusic(query: string, offset: number): Promise<any> {
    return this.http.get(`search?q=${query}&limit=4&offset=${offset}`).toPromise();
  }

  getClaim(currentadd: string, claimid: string) {
    return this.http.get(`wallet/${currentadd}/claim/${claimid}`).toPromise();
  }

  getClaims(currentadd: string): Promise<any> {
    return this.http.get(`wallet/${currentadd}/claim`).toPromise();
  }

  postClaim(assetId: string, assetOwner: string, description: string, currentadd: String): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(`wallet/${currentadd}/claim`,
      {
        assetId: assetId,
        assetOwner: assetOwner,
        description: description
      }, httpOptions).toPromise();
  }

  addRegistry(name: String, author: string, description: string, currentadd: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(`wallet/${currentadd}/registry`,
      {
        name: name,
        author: author,
        description: description
      }, httpOptions).toPromise();
  }

  getTask(currentadd: string): Promise<any> {
    return this.http.get(`wallet/${currentadd}/tasks`).toPromise();
  }

  putTask(currentadd: string, taskId: string, description: string, to: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.put(`wallet/${currentadd}/tasks/${taskId}`,
      {
        description: description,
        to: to
      }, httpOptions).toPromise();
  }

  getAsset(assetid: string, assetowner: string): Promise<any> {
    return this.http.get(`wallet/${assetowner}/registry/${assetid}`).toPromise();
  }

}
