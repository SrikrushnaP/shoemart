import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRowComponent } from './products-row.component';

describe('ProductsRowComponent', () => {
  let component: ProductsRowComponent;
  let fixture: ComponentFixture<ProductsRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
