import { Component, OnInit } from '@angular/core';

import { Product } from '../grocery/product';
import { GroceryService } from '../grocery/grocery.service';

@Component({
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {
  pageTitle = 'Items List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  _selectedGrocery = 0;
  deleteEnabled = false;
  get selectedGrocery(): number {
    return this._selectedGrocery;
    ;
  }
  set selectedGrocery(value: number) {
    this._selectedGrocery = value;
    if(this._selectedGrocery > 0){
      this.deleteEnabled = true;
    }
  }
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(private productService: GroceryService) { }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  deleteGrocery(): void {
    if (confirm(`Are you sure to delete the Grocery with id: ${this._selectedGrocery}?`)) {
      this.productService.deleteProduct(this._selectedGrocery)
        .subscribe({
          next: () => console.log("Deleted"),
          error: err => this.errorMessage = err
        });
    }
    this.loadProducts();
}
loadProducts(): void{
  this.productService.getProducts().subscribe({
    next: products => {
      this.products = products;
      this.filteredProducts = this.products;
    },
    error: err => this.errorMessage = err
  });
}
}