import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { GroceryData } from './grocery-data';

import { GroceryListComponent } from '../grocery-list/grocery-list.component';
import { GroceryItemDetailComponent } from '../grocery-detail/grocery-item-detail.component';
import { AddEditGroceryItemComponent } from '../add-grocery/addedit-grocery-item.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(GroceryData),
    RouterModule.forChild([
      { path: 'grocery-list', component: GroceryListComponent },
      { path: 'grocery/:id', component: GroceryItemDetailComponent },
      {
        path: 'grocery/:id/edit',
        component: AddEditGroceryItemComponent
      }
    ])
  ],
  declarations: [
    GroceryListComponent,
    GroceryItemDetailComponent,
    AddEditGroceryItemComponent
  ]
})
export class GroceryModule { }
