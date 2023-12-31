import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppConfigModule } from '@layout/components/config/app.config.module';
import { AppTopbarModule } from '@layout/components/topbar/app.topbar.module';
import { AppFooterComponent } from '@layout/components/footer/app.footer.component';
import { AppLayoutComponent } from './app.layout.component';

@NgModule({
    declarations: [AppFooterComponent, AppLayoutComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        AppTopbarModule,
        AppConfigModule,
        TranslateModule,
    ],
    exports: [AppLayoutComponent],
})
export class AppLayoutModule {}
