import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlledTableComponent
} from './controlledTable.component';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ControlledTableComponent],
  imports: [CommonModule, SharedModule, TableModule, TranslateModule],
  exports: [ControlledTableComponent],
})
export class ControlledTableModule {
}
