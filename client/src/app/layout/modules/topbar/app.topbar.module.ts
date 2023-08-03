import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { TranslateModule } from '@ngx-translate/core';
import { AppTopBarComponent } from './app.topbar.component';

@NgModule({
    declarations: [AppTopBarComponent],
    imports: [CommonModule, BadgeModule, TranslateModule, RouterModule],
    exports: [AppTopBarComponent],
})
export class AppTopbarModule {}
