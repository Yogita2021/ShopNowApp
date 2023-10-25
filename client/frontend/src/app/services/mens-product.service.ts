import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MensProductService {
  constructor(private http: HttpClient, private router: Router) {}

  serachProductservice(query: string) {
    return this.http.get<any>(
      `http://localhost:3000/mens/mens/search?brand=${query}`
    );
  }
  getProductById(productId: string) {
    return this.http.get<any>(`http://localhost:3000/mens/mens/${productId}`);
  }
}
