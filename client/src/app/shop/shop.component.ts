import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  currentProducts: Product[] = [];
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  shopParams = new ShopParams();
  pageSize = 6;
  selectedSortOption: string = 'name';
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' },
  ];
  totalCount = 0;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
        this.getProductForPaginator(1);
      },
      error: (error) => console.log(error),
    });
  }

  getProductForPaginator(pageNumber: number) {
    let startIndex = (pageNumber - 1) * this.pageSize;
    let endIndex = pageNumber * this.pageSize;
    this.currentProducts = [];
    this.currentProducts = this.products.slice(startIndex, endIndex);
    console.log(startIndex, endIndex);
  }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: (response) => (this.brands = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: (response) => (this.types = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected() {
    if (this.selectedSortOption === 'priceAsc') {
      this.onPriceAsc();
    } else if (this.selectedSortOption === 'priceDesc') {
      this.onPriceDesc();
    } else {
      this.onAlphabetical();
    }

    this.getProductForPaginator(this.shopParams.pageNumber);
  }

  onPageChanged(nextPageNumber: number) {
    if (this.shopParams.pageNumber !== nextPageNumber) {
      this.shopParams.pageNumber = nextPageNumber;
      // this.getProducts();
      this.getProductForPaginator(nextPageNumber);
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    if (this.searchTerm) {
      this.searchTerm.nativeElement.value = '';
      this.shopParams = new ShopParams();
      this.getProducts();
    }
  }

  private onPriceAsc() {
    for (let i = 0; i < this.products.length; i++) {
      for (let j = 0; j < this.products.length; j++) {
        if (this.products[j]?.price > this.products[j + 1]?.price) {
          let p = this.products[j];
          this.products[j] = this.products[j + 1];
          this.products[j + 1] = p;
        }
      }
    }
    // console.log(this.products);
  }

  private onPriceDesc() {
    for (let i = 0; i < this.products.length; i++) {
      for (let j = 0; j < this.products.length; j++) {
        if (this.products[j]?.price < this.products[j + 1]?.price) {
          let p = this.products[j];
          this.products[j] = this.products[j + 1];
          this.products[j + 1] = p;
        }
      }
    }
    // console.log(this.products);
  }

  private onAlphabetical() {
    for (let i = 0; i < this.products.length; i++) {
      for (let j = 0; j < this.products.length; j++) {
        if (this.products[j]?.name > this.products[j + 1]?.name) {
          let p = this.products[j];
          this.products[j] = this.products[j + 1];
          this.products[j + 1] = p;
        }
      }
    }
    // console.log(this.products);
  }
}
