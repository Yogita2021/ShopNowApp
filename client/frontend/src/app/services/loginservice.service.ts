import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class LoginserviceService {
  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    this.http
      .post('http://localhost:3000/user/login', data, { observe: 'response' })
      .subscribe((result) => {
        console.log(result);
      });
  }
}
