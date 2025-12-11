import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Listing1Page } from './listing1.page';

describe('Listing1Page', () => {
  let component: Listing1Page;
  let fixture: ComponentFixture<Listing1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Listing1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
