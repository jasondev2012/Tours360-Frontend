import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteListarComponent } from './participante-listar.component';

describe('ParticipanteListarComponent', () => {
  let component: ParticipanteListarComponent;
  let fixture: ComponentFixture<ParticipanteListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipanteListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipanteListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
