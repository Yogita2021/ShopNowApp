import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from './cart.service';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {}
  order(data: any) {
    let userId = data.userId;
    this.http
      .post('http://localhost:3000/order/', data, { observe: 'response' })
      .subscribe(
        (result) => {
          // console.log(result);
          if (result.status == 200) {
            // After successful registration
            Swal.fire({
              icon: 'success',
              title: 'Order Placed',

              showConfirmButton: true,
              confirmButtonText: 'Continue', // Customize the confirm button text
            }).then((result) => {
              if (result.isConfirmed) {
                this.removeFromCart(userId);

                this.router.navigate(['myOrder']);
                // Handle the user's confirmation (e.g., navigate to a new page or perform other actions)
              }
            });
          }
        },
        (error) => {
          console.error('An error occurred:', error.error.message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      );
  }

  removeFromCart(userId: string) {
    const url = `http://localhost:3000/cart/${userId}`;

    return this.http.delete(url).subscribe((result) => {
      console.log(result);
      this.cartService.updateCartItemCount(userId);
    });
  }
  orderDetails() {
    return this.http.get<any>('http://localhost:3000/order/orders');
  }
  CancelOrder(Id: string) {
    const url = `http://localhost:3000/order/orders/${Id}`;

    return this.http.delete(url);
  }
}
