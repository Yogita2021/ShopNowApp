import { Component } from '@angular/core';
import {} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showSearchForm: boolean = true; // By default, show the search form
  // my-component.component.ts
  showCustomClass: boolean = true; // You can set this value based on your logic

  constructor(private router: Router) {
    // Check if the current route is the route where you want to hide the search form
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showSearchForm = event.url !== '/';
        this.showCustomClass = false;
      }
    });
  }
}
