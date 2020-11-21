import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'https://todoserver1.herokuapp.com';
  }

  get<T>(uri: string) {
    return this.http.get<T>(`${this.ROOT_URL}/${uri}`);
  }

  post<T>(uri: string, payload: Object) {
    return this.http.post<T>(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch<T>(uri: string, payload: Object) {
    return this.http.patch<T>(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete<T>(uri: string) {
    return this.http.delete<T>(`${this.ROOT_URL}/${uri}`);
  }

  login(payload: Object) {
    return this.http.post(`${this.ROOT_URL}/users/login`, payload
      
    , {observe: 'response'})
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users`, {
      email,
      password
    }, {
        observe: 'response'
      });
  }
}
