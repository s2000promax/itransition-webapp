import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { AccessRoutingModule } from './access-routing.module';
import { AccessComponent } from './access.component';
import { RippleModule } from 'primeng/ripple';
import { LogoModule } from '@shared/uiKit/logo/logo.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        AccessRoutingModule,
        ButtonModule,
        RippleModule,
        LogoModule,
        TranslateModule,
    ],
    declarations: [AccessComponent],
})
export class AccessModule {}
