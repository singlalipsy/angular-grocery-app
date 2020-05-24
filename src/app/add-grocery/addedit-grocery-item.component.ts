import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Product } from '../grocery/product';
import { GroceryService } from '../grocery/grocery.service';


@Component({
  templateUrl: './add-grocery-item.component.html'
})
export class AddEditGroceryItemComponent implements OnInit {
  pageTitle = 'Product Edit';
  errorMessage: string;
  groceryForm: FormGroup;
  product: Product;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private productService: GroceryService) {
  }

  getProduct(id: number): void {
    console.log("Get Grocery for Add/Edit Page "+id);
    this.productService.getProduct(id)
      .subscribe({
        next: (grocery: Product) => this.displayProduct(grocery),
        error: err => this.errorMessage = err
      });
  }
  ngOnInit(): void {
    this.groceryForm = this.fb.group({
      productName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      quantity: [null, Validators.required],
      description: '',
      starRating: [null,Validators.required],
      price: [null,Validators.required],
      releaseDate: [null,Validators.required]
    });
     // Read the Grocery Id from the route parameter for navigating to Add/Edit Page
     this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        console.log(id);
        this.getProduct(id);
      }
    );
  }
  displayProduct(product: Product): void {
    if (this.groceryForm) {
      this.groceryForm.reset();
    }
    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    // Update the data on the form
    this.groceryForm.patchValue({
      productName: this.product.productName,
      quantity: this.product.quantity,
      starRating: this.product.starRating,
      description: this.product.description,
      releaseDate: this.product.releaseDate,
      price: this.product.price
    });
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Are you sure to delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveProduct(): void {
    if (this.groceryForm.valid) {
      if (this.groceryForm.dirty) {
        const p = { ...this.product, ...this.groceryForm.value };

        if (p.id === 0) {
          this.productService.createProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.productService.updateProduct(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.groceryForm.reset();
    this.router.navigate(['/grocery-list']);
  }
}
