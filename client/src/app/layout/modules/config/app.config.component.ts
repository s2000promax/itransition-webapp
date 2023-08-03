import { Component } from '@angular/core';
import { LayoutService } from '@services/app.layout.service';
import { ThemeStyles } from '@config/styles/themesStyles';
import { ColorStyles } from '@config/styles/colorStyles';
import { Languages } from '@config/language/languages';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html',
})
export class AppConfigComponent {
    protected readonly ThemeStyles = ThemeStyles;
    protected readonly ColorsStyles = ColorStyles;
    protected readonly Languages = Languages;

    constructor(
        public layoutService: LayoutService,
        public translate: TranslateService,
    ) {}

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
        this.layoutService.onConfigUpdate();
    }

    changeTheme(theme: ThemeStyles, colorScheme: ColorStyles): void {
        this.layoutService.changeTheme(theme, colorScheme);
    }

    changeLanguage(newLanguage: Languages): void {
        this.layoutService.changeLanguage(newLanguage);
    }
}
