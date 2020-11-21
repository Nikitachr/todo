import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { WebRequestService } from './web-request.service';
import { shareReplay, tap } from 'rxjs/operators'
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private webService: WebRequestService, private router: Router, private http: HttpClient) { }

login(email: string, password: string) {
  const user: any = {email: email,
  password: password}
  return this.webService.login(user).pipe(
    shareReplay(),
    tap((res: HttpResponse<any>) => {
      this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));

      this.router.navigate(['/lists']);
    })
  )
}

signup(email: string, password: string) {
  return this.webService.signup(email, password).pipe(
    shareReplay(),
    tap((res: HttpResponse<any>) => {
      this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'));
      console.log("Successfully signed up and now logged in!");
      this.router.navigate(['/lists']);
    })
  )
}

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  logout() {
    this.removeSession();

    this.router.navigate(['/login']);
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  getNewAccessToken() {
    return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getUserId()
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token'));
      })
    )
  }

}
