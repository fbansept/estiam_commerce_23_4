import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly _user: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor() {
    this.login();
  }

  login(jwt?: string | null): void {
    if (jwt) {
      localStorage.setItem('jwt', jwt);
    } else {
      jwt = localStorage.getItem('jwt');
    }

    //si le jwt en parametre est null et qu'il 
    //n'existe pas non plus dans le localstorage
    if (jwt) {
      // const split: string[] = jwt.split('.');
      // const payload: string = split[1];
      // const json = atob(payload);
      // const data = JSON.parse(json);

      const data = JSON.parse(atob(jwt.split('.')[1]));
      this._user.next({ email: data.email, isSeller: data.isSeller });
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    this._user.next(null);
  }
}
