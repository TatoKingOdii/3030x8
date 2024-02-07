import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {Endpoint, ENDPOINT_BASE, EndpointPaths} from "../model/endpoints";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser?: User;

  constructor(private router: Router, private http: HttpClient) { }

  authenticate(user: User, path: string, errHandler: (msg: string) => void) {
    // Validate user
    this.http.get<User[]>(ENDPOINT_BASE + EndpointPaths.get(Endpoint.USERS))
      .subscribe(resp => {
        console.log('Received user list: ' + JSON.stringify(resp));
        console.log('Trying to login: ' + JSON.stringify(user));
        let idx = resp.findIndex(itm => user.user === itm.user && user.pass === itm.pass);
        console.log('User in list: ' + idx);
        if (idx !== -1) {
          this.currentUser = user;
          this.router.navigate([path]);
        } else {
          errHandler('Username / Password does not exist!');
        }
    });
  }

  deauthenticate() {
    this.currentUser = undefined;
  }

  isUserAuthenticated() : boolean {
    return this.currentUser !== undefined;
  }
}
