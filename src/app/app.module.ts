import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MainModule } from './main/main.module';
import { UserManagementModule } from './user-management/user.module';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details/project-details.component';

import { ProjectListComponent } from './projectDetails/project-list/project-list.component';
import { AvatarModule } from 'ngx-avatar';
import { DndModule } from 'ngx-drag-drop';
import { ProjectOverviewComponent } from './projectDetails/project-list/project-overview/project-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectDetailsComponent,
    ProjectListComponent,
    ProjectOverviewComponent,
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    MainModule,
    DndModule,
    AvatarModule,
    UserManagementModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }