import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import {
    UsersManagementModule
} from '@features/usersManagement/usersManagement.module';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
      CommonModule,
        DashboardsRoutingModule,
      UsersManagementModule,
    ],
    exports: [],
})
export class DashboardModule {}
