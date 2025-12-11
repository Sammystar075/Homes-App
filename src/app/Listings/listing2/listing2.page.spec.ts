import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Listing2Page } from './listing2.page';

describe('Listing2Page', () => {
  let component: Listing2Page;
  let fixture: ComponentFixture<Listing2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Listing2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
