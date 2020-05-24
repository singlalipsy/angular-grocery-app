import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../grocery/product';
import { GroceryService } from '../grocery/grocery.service';



@Component({
  templateUrl: './grocery-item-detail.component.html',
  styleUrls: ['./grocery-item-detail.component.css']
})
export class GroceryItemDetailComponent implements OnInit {
  pageTitle = 'Item Detail';
  errorMessage = '';
  product: Product | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: GroceryService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/grocery-list']);
  }

}
