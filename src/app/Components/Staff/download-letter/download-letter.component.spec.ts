import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadLetterComponent } from './download-letter.component';

describe('DownloadLetterComponent', () => {
  let component: DownloadLetterComponent;
  let fixture: ComponentFixture<DownloadLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadLetterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
