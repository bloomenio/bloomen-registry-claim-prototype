import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(public http: HttpClient) { }

  getAddresses(): Promise<any> {
    return this.http
      .get(`/wallet`).toPromise();
  }

  postAddress(): Promise<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`/wallet`, headers).toPromise();
  }

}