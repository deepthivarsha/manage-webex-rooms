import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { AuthComponent } from './auth/auth.component';
import { CommonModule } from '@angular/common';
import { ButtonModule, SelectModule } from '@momentum-ui/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DialogComponent } from './dialog/dialog.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { SendMessageComponent } from './send-message/send-message.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateRoomComponent,
    AuthComponent,
    SidebarComponent,
    DialogComponent,
    AddMembersComponent,
    SendMessageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    SelectModule,
    NgSelectModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
