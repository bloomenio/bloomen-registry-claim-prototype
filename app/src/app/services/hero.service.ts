import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

const API_KEY = "49f8c772ecc1243e4355e50e5f494338&hash=22de79b26e11a0b3d7d1d493c3c74058";

@Injectable()
export class HeroService {

  constructor(public http: HttpClient) { }

  getLatestStories(quant: number): Promise<any> {
    return this.http
      .get(`/v1/public/characters?limit=4&offset=${quant}&ts=1022&apikey=${API_KEY}`).toPromise();
  }

  getLatestStoriesInput(quant: number, name: string): Promise<any> {
    return this.http
      .get(`/v1/public/characters?limit=4&offset=${quant}&nameStartsWith=${name}&ts=1022&apikey=${API_KEY}`).toPromise();
  }

  getForm(name: string, alterego: string, power: string): Promise<any> {
    return this.http
      .get(`/v1/public/characters?limit=4&ts=1022&apikey=${API_KEY}`).toPromise();
  }

}