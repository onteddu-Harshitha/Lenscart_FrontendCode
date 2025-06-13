import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Lenses, LensesService } from 'src/app/services/lenses.service';

@Component({
  selector: 'app-lenses',
  templateUrl: './lenses.component.html',
  styleUrls: ['./lenses.component.css']
})
export class LensesComponent implements OnInit {

  lenses: Lenses[] = [];
  filteredLenses: Lenses[] = [];

  selectedBrand = '';
  selectedColor = '';
  selectedPriceRange = '';

  brands: string[] = [];
  colors: string[] = [];

  constructor(private lensesService: LensesService, private cartservice: CartService, private router: Router) { }

  ngOnInit(): void {
    this.lensesService.getAllLenses().subscribe(data => {
      this.lenses = data;
      this.filteredLenses = [...this.lenses];
      this.brands = [...new Set(this.lenses.map(l => l.brand))];
      this.colors = [...new Set(this.lenses.map(l => l.colour))];
    });
  }

  applyFilters(): void {
    this.filteredLenses = this.lenses.filter(lens => {
      const matchBrand = this.selectedBrand ? lens.brand === this.selectedBrand : true;
      const matchColor = this.selectedColor ? lens.colour === this.selectedColor : true;
      const matchPrice =
        this.selectedPriceRange === 'below1000' ? lens.price < 1000 :
          this.selectedPriceRange === '1000to2000' ? lens.price >= 1000 && lens.price <= 2000 :
            this.selectedPriceRange === 'above2000' ? lens.price > 2000 : true;

      return matchBrand && matchColor && matchPrice;
    });
  }

  // addToCart(lens: Lenses): void {
  //   console.log('Add to cart:', lens);
  //   // Cart logic here later
  // }

  addToCart(lens: Lenses): void {
    const idFromStorage = localStorage.getItem("customerId");
    const customerId = idFromStorage ? Number(idFromStorage) : null;

    if (!customerId) {
      this.router.navigate(['/login']);
      return;
    }

    const cartItem = {
      customerId: customerId,
      productId: lens.lensId,   // or lens.name if that's your product identifier
      quantity: 1,              // default to 1, or allow user to choose
      price: lens.price
    };

    console.log('Adding lens to cart:', cartItem);

    this.cartservice.addToCart(cartItem).subscribe(
      (response) => {
        console.log('Lens added to cart successfully:', response);
        // Optionally show a success message or update cart UI
      },
      (error) => {
        console.error('Error adding lens to cart:', error);
        // Optionally show an error message
      }
    );
  }

}
