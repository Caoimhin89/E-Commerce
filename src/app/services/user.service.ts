import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppUser } from '../app-interfaces';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class UserService {

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
    return this.http.post('/user', user);
  }

  updateUserDetails(user: IAppUser): Observable<any> {
    return this.http.patch('/user/details', user);
  }

  updateAuthDetails(user: IAppUser): Observable<any> {
    return this.http.patch('/user/sensitive', user);
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
