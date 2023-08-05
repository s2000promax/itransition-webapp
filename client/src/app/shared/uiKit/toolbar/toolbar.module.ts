import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarModule as PToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
    declarations: [ToolbarComponent],
    imports: [
        CommonModule,
        PToolbarModule,
        ButtonModule,
        SplitButtonModule,
        FieldsetModule,
    ],
    exports: [ToolbarComponent],
})
export class ToolbarModule {}
