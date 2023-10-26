import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { concatMap } from 'rxjs/operators';

// ... your code here ...

@Injectable({
  providedIn: 'root',
})
export class MensProductService {
  constructor(private http: HttpClient, private router: Router) {}

  // searchByBrand(query: string): Observable<any> {
  //   // Create an array to hold the results from each collection
  //   const results: any[] = [];

  //   // Perform searches for each collection and push the results to the array
  //   results.push(
  //     this.http.get<any>(
  //       `http://localhost:3000/mens/mens/search?brand=${query}`
  //     )
  //   );

  //   results.push(
  //     this.http.get<any>(
  //       `http://localhost:3000/women/womens/search?brand=${query}`
  //     )
  //   );

  //   results.push(
  //     this.http.get<any>(`http://localhost:3000/kid/kids/search?brand=${query}`)
  //   );

  //   // Combine the results from all collections and return as an observable
  //   return forkJoin(results).pipe(concatMap((arrays) => arrays));
  // }

  // ...

  // ...

  searchByBrand(query: string): Observable<any[]> {
    // Perform searches for each collection
    const mensSearch = this.http.get<any>(
      `http://localhost:3000/mens/mens/search?brand=${query}`
    );
    const womenSearch = this.http.get<any>(
      `http://localhost:3000/women/womens/search?brand=${query}`
    );
    const kidSearch = this.http.get<any>(
      `http://localhost:3000/kid/kids/search?brand=${query}`
    );

    // Use forkJoin to combine the results and return as an observable
    return forkJoin([mensSearch, womenSearch, kidSearch]).pipe(
      // Filter out empty arrays
      filter((results) => results.some((arr) => arr.length > 0))
    );
  }

  getProductById(productId: string) {
    return this.http.get<any>(`http://localhost:3000/mens/mens/${productId}`);
  }
}
