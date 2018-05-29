import {Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule} from '@angular/core';
import {StyleManager} from '../style-manager/style-manager';
import {ThemeStorage, DocsSiteTheme} from './theme-storage/theme-storage';
import {
  MatButtonModule, MatGridListModule, MatIconModule, MatMenuModule,
  MatTooltipModule
} from '@angular/material';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'theme-picker',
  templateUrl: 'theme-picker.html',
  styleUrls: ['theme-picker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {'aria-hidden': 'true'},
})
export class ThemePicker {
  currentTheme;

  themes = [
    {
      primary: '#05AADB',
      accent: '#FFC107',
      href: 'iris-blue.css',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#2f2f2f',
      accent: '#4CAF50',
      href: 'dark-hawaii-blue.css',
      isDark: true,
    },
  ];

  constructor(
    public styleManager: StyleManager,
    private _themeStorage: ThemeStorage
  ) {
    const currentTheme = this._themeStorage.getStoredTheme();
    if (currentTheme) {
      this.installTheme(currentTheme);
    }
  }

  installTheme(theme: DocsSiteTheme) {
    this.currentTheme = this._getCurrentThemeFromHref(theme.href);

    if (theme.isDefault) {
      this.styleManager.removeStyle('theme');
    } else {
      this.styleManager.setStyle('theme', `assets/${theme.href}`);
    }

    if (this.currentTheme) {
      this._themeStorage.storeTheme(this.currentTheme);
    }
  }

  private _getCurrentThemeFromHref(href: string): DocsSiteTheme {
    return this.themes.find(theme => theme.href === href);
  }
}

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatTooltipModule,
    CommonModule
  ],
  exports: [ThemePicker],
  declarations: [ThemePicker],
  providers: [StyleManager, ThemeStorage],
})
export class ThemePickerModule { }
