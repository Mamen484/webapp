import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfuiBannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: SfuiBannerComponent;
  let fixture: ComponentFixture<SfuiBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfuiBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfuiBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
