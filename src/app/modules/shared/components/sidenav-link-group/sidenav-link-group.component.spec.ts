import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavLinkGroupComponent } from './sidenav-link-group.component';

describe('SidenavLinkGroupComponent', () => {
  let component: SidenavLinkGroupComponent;
  let fixture: ComponentFixture<SidenavLinkGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavLinkGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavLinkGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
