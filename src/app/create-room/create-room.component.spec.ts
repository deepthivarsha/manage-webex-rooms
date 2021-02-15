import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateRoomComponent } from './create-room.component';
import { DialogComponent } from '../dialog/dialog.component';
import { WebexService } from '../services/webex.service';
import { FormsModule } from '@angular/forms';

describe('WebexComponent', () => {
  let component: CreateRoomComponent;
  let fixture: ComponentFixture<CreateRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      providers: [WebexService],
      declarations: [CreateRoomComponent, DialogComponent]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CreateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create createRoomComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Create room section should contain the expected title', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#create-room-header').textContent).toEqual('Create a new room');
  });
});
