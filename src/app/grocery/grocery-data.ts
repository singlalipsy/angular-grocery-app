import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Product } from './product';

export class GroceryData implements InMemoryDbService {

  createDb() {
    const product: Product[] = [
      {
        "id": 1,
        "productName": "Apple",
        "quantity": "10",
        "releaseDate": "2020-05-18",
        "description": "Kashmiri Apples!",
        "price": 150,
        "starRating": 3.2,
        "imageUrl": "assets/images/apple.jpeg"
      },
      {
        "id": 2,
        "productName": "Orange",
        "quantity": "10",
        "releaseDate": "2020-05-10",
        "description": "Nagpuri Oranges",
        "price": 80,
        "starRating": 4.2,
        "imageUrl": "assets/images/orange.jpeg"
      },
      {
        "id": 3,
        "productName": "Brocoli",
        "quantity": "15",
        "releaseDate": "2020-05-21",
        "description": "Healthy yet tasty salad ingredient",
        "price": 8.9,
        "starRating": 4.8,
        "imageUrl": "assets/images/Brocoli.jpeg"
      },
      {
        "id": 4,
        "productName": "Onion",
        "quantity": "10",
        "releaseDate": "2020-05-08",
        "description": "The basic ingredient!",
        "price": 70,
        "starRating": 3.7,
        "imageUrl": "assets/images/onion.jpeg"
      },
      {
        "id": 5,
        "productName": "Tomato",
        "quantity": "20",
        "releaseDate": "2020-05-08",
        "description": "Roma Tomatoes",
        "price": 50,
        "starRating": 4.6,
        "imageUrl": "assets/images/tomato.jpeg"
      }
    ];
    return { product };
  }
}
