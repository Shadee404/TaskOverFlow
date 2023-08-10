import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {NgbDropdown, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./service/auth.service";
import {RegistrationComponent} from './registration/registration.component';
import {RouterLink, RouterModule, Routes} from "@angular/router";
import {BoardComponent} from './board/board.component';
import {TaskListComponent} from './board/task-list/task-list.component';
import {TaskComponent} from './board/task-list/task/task.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CdkDrag, CdkDragPlaceholder, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";
import {RxStompService} from "./service/rx-stomp.service";
import {rxStompServiceFactory} from "./service/rx-stomp-service-factory";
import {TaskUpdateComponent} from './board/task-list/task/task-update/task-update.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from "@angular-material-components/datetime-picker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import { SidebarComponent } from './board/sidebar/sidebar.component';
import { SidebarAddMemberComponent } from './board/sidebar/sidebar-add-member/sidebar-add-member.component';
import {AngularSvgIconModule} from "angular-svg-icon";
import { SettingsComponent } from './settings/settings.component';
import { PasswordSettingsComponent } from './settings/password-settings/password-settings.component';
import { NotificationSettingsComponent } from './settings/notification-settings/notification-settings.component';
import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'board', component: BoardComponent},
  {path: 'board/:id', component: BoardComponent},
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {path: '', redirectTo: 'account', pathMatch: 'full'},
      {path: 'account', component: AccountSettingsComponent},
      {path: 'password', component: PasswordSettingsComponent},
      {path: 'notifications', component: NotificationSettingsComponent},
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    BoardComponent,
    TaskListComponent,
    TaskComponent,
    TaskUpdateComponent,
    SidebarComponent,
    SidebarAddMemberComponent,
    SettingsComponent,
    PasswordSettingsComponent,
    NotificationSettingsComponent,
    AccountSettingsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RouterLink,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    CdkDropListGroup,
    MatDialogModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    AngularSvgIconModule.forRoot()
  ],
  providers: [
    HttpClient,
    AuthService,
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
    NgbDropdown,
    MatDialog,
    MatDatepickerModule,
    NgxMatNativeDateModule,
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
}
