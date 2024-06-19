import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManangerListComponent } from './mananger-list.component';

describe('ManangerListComponent', () => {
  let component: ManangerListComponent;
  let fixture: ComponentFixture<ManangerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManangerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManangerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
