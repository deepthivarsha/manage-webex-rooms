import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { MyGuard } from './guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    pathMatch: 'full'
  },
  {
    path: 'roomcontrol',
    component: CreateRoomComponent,
    canActivate: [MyGuard]
  },
  {
    path: 'addmembers',
    component: AddMembersComponent,
    canActivate: [MyGuard]
  },
  {
    path: 'sendmessage',
    component: SendMessageComponent,
    canActivate: [MyGuard]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
