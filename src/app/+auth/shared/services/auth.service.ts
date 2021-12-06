import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token, User, LoginGQL } from '@app/graphql';
import { Router } from '@angular/router';
import { Path } from '@core/enums';
import { getItem, removeItem, setItem, StorageItem } from '@core/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isLoggedIn$ = new BehaviorSubject<boolean>(!!getItem(StorageItem.Auth));
  private user = new BehaviorSubject<User|null>(getItem(StorageItem.AuthUser) as User);
  private token = new BehaviorSubject<Token|null>(getItem(StorageItem.AuthToken) as Token);

  constructor(private loginGQL: LoginGQL, private router: Router) {}

  get getToken(): Token | null {
    return this.token.getValue();
  }

  get getUser(): User | null {
    return this.user.getValue();
  }

  get isLoggedIn(): boolean {
    if (this.isLoggedIn$.getValue() && this.getToken) {
      if (Date.parse(this.getToken.expiresIn) < Date.now()) {
        this.signOut();
        return false;
      }
    }

    return this.isLoggedIn$.getValue();
  }

  get isLoggedInObservable(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  signIn(userdata: { username: string, password: string }, shortSession: boolean): Promise<void> {
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
          setItem(StorageItem.AuthUser, user);
          setItem(StorageItem.AuthToken, token);
          this.isLoggedIn$.next(true);
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  signOut(): void {
    removeItem(StorageItem.AuthUser);
    this.user.next(null);

    removeItem(StorageItem.AuthToken);
    this.token.next(null);

    removeItem(StorageItem.Auth);
    this.isLoggedIn$.next(false);

    this.router.navigate([`/${Path.SignIn}`]);
  }
}
