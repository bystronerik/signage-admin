import { Injectable } from '@angular/core';
import { User } from '@core/shared/user';
import { BehaviorSubject } from 'rxjs';
import { Token } from '../interfaces';
import { LoginGQL } from '@core/graphql';
import { Router } from '@angular/router';
import { Path } from '@core/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_ITEM = '_user';
  private readonly TOKEN_ITEM = '_token';

  private userSubject = new BehaviorSubject<User>(this._getUser());
  private tokenSubject = new BehaviorSubject<Token>(this._getToken());

  isLoggedIn = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private loginGQL: LoginGQL, private router: Router) {}

  get userValue(): User {
    return this.userSubject?.value;
  }

  get tokenValue(): Token {
    return this.tokenSubject?.value;
  }

  private get loggedIn(): boolean {
    const user = this.userSubject?.value;
    const token = this.tokenSubject?.value;
    return !!(user && token);
  }

  signIn(userdata: User, shortSession: boolean): Promise<any> {
    return this.loginGQL
      .mutate({
        username: userdata.username,
        password: userdata.password,
        shortSession,
      })
      .toPromise()
      .then(
        ({ data }) => {
          const { user, token } = data.login;
          this._saveUser(user);
          this._saveToken(token);
          this.isLoggedIn.next(true);
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  beginPasswordReset(email: string) {
    // return super.post({ email }, 'begin-password-reset');
  }

  resetPassword(username: string, password: string, token: string) {
    // return super.post({ username, password, token }, 'reset-password');
  }

  logout() {
    localStorage.removeItem(this.USER_ITEM);
    localStorage.removeItem(this.TOKEN_ITEM);
    this.userSubject.next(null);
    this.tokenSubject.next(null);
    this.isLoggedIn.next(false);

    this.router.navigate([`/${Path.SignIn}`]);
  }

  private _getUser(): User {
    return JSON.parse(localStorage.getItem(this.USER_ITEM)) as User;
  }

  private _getToken(): Token {
    return JSON.parse(localStorage.getItem(this.TOKEN_ITEM)) as Token;
  }

  private _saveUser(user: User): void {
    localStorage.setItem(this.USER_ITEM, JSON.stringify(user));
    this.userSubject.next(user);
  }

  private _saveToken(token: Token): void {
    localStorage.setItem(this.TOKEN_ITEM, JSON.stringify(token));
    this.tokenSubject.next(token);
  }
}
