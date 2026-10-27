import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroiListaComponent } from './heroi-lista.component';

describe('HeroiListaComponent', () => {
  let component: HeroiListaComponent;
  let fixture: ComponentFixture<HeroiListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroiListaComponent]
    });
    fixture = TestBed.createComponent(HeroiListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
