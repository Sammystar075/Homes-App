import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Listing3Page } from './listing3.page';

describe('Listing3Page', () => {
  let component: Listing3Page;
  let fixture: ComponentFixture<Listing3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Listing3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
