import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {  } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import {User} from './model/user';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs';

@Injectable()
export class DataServiceService {
  constructor(private http: Http) { }

  retrieveMessage(): Observable<string> {
    const url = `http://${location.host}/api/message`;
    return this.http.get(url).map((res) => res.json());
  }

  retrieveUsers(): Observable<Array<User>> {
    const url = `http://${location.host}/api/users`;
    console.log('The url: ', url);
    const resp: Observable<Array<User>>  = this.http.get(url).map((res) => res.json())
      .map((d) => this.extractData(d));
    return resp;
  }

  private extractData(d: Array<any>): Array<User> {
    const users = new Array();
    d.forEach((t) => {
      users.push(new User(t.firstName, t.lastName));
    });
    return users;
  }
}
