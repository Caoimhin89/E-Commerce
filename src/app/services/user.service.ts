import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAppUser } from '../app-interfaces';
import { Observable } from 'rxjs/Observable';
import { jwt } from 'jsonwebtoken';
import 'rxjs/Rx';

@Injectable()
export class UserService {
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  getUserDetails(userId: string): Observable<any> {
    return this.http.get(`/api/user/details/${userId}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getUserAuth(userId: string): Observable<any> {
    return this.http.get(`/user/sensitive/${userId}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getFullUser(userId: string): Observable<any> {
    return this.http.get(`/user/${userId}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  registerUser(user: IAppUser): Observable<any> {
    const body = JSON.stringify(user);
    return this.http.post('/user', body, {headers: this.headers})
      .map((res: Response) => res.json())
      .catch((err: Response) => Observable.throw(err.json()));
  }

  updateUserDetails(user: IAppUser): Observable<any> {
    return this.http.patch('/user/details', user);
  }

  updateAuthDetails(user: IAppUser): Observable<any> {
    return this.http.put('/user/sensitive', user);
  }

  loginUser(email: string, password: string): Observable<any> {
    const login = {email: email, pwd: password};
    return this.http.post('/auth/login', login);
  }

  logoutUser(userId: string): Observable<any> {
    return this.http.post('/auth/logout', userId);
  }

// Handle any errors from http responses
  private handleError(error: Response) {
    let errMsg: string;
    const body = error.json();
    const err = JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
