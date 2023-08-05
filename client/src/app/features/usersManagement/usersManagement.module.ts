import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UsersManagementComponent
} from './usersManagement.component';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from '@shared/uiKit/toolbar/toolbar.module';
import {
  ControlledTableModule
} from '@shared/uiKit/controlledTable/controlledTable.module';

@NgModule({
  declarations: [UsersManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
    TableModule,
    ToolbarModule,
    ControlledTableModule,
  ],
  exports: [UsersManagementComponent],
})
export class UsersManagementModule {}
