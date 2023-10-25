import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensProductService } from '../services/mens-product.service';

@Component({
  selector: 'app-serched-products',
  templateUrl: './serched-products.component.html',
  styleUrls: ['./serched-products.component.css'],
})
export class SerchedProductsComponent implements OnInit {
  searchResult: undefined | any[];

  constructor(
    private activeRoute: ActivatedRoute,
    private mensProduct: MensProductService
  ) {}
  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    console.log(query);
    query &&
      this.mensProduct.serachProductservice(query).subscribe((result: any) => {
        this.searchResult = result;
        console.log(result);
      });
  }
}
