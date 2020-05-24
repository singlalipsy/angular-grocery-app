import { Component } from '@angular/core';

@Component({
  selector: 'gm-root',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
      <a class='navbar-brand'>{{pageTitle}}</a>
      <ul class='navbar-nav'>
        <li class='nav-item'><a class='nav-link' routerLinkActive='active'
              [routerLink]="['/welcome']">Home</a>
        </li>
        <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
        [routerLink]="['/grocery-list']">Items List</a>
        </li>
        <li class='nav-item'><a class='nav-link' routerLinkActive='active' [routerLinkActiveOptions]="{exact: true}"
        [routerLink]="['/grocery/0/edit']">Add Item</a>
        </li>
      </ul>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Grocey Management';
}
