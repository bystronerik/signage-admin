import { Injectable } from '@angular/core';
import { Settings } from './settings.model';
import { BehaviorSubject } from 'rxjs';
import { SettingsTheme } from '@core/shared/settings/settings-theme.model';
import { SettingsMenu } from '@core/shared/settings/settings-menu.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly SETTINGS_ITEM = '_settings';

  private settingsSubject = new BehaviorSubject<Settings>(this._getSettings());

  constructor() {
    if (this.settings == null) {
      const settings = new Settings();

      const menu = new SettingsMenu();
      menu.sideMenuOpened = false;
      menu.profileMenuOpened = false;
      menu.assetsTabOpened = true;
      menu.playlistsTabOpened = true;
      menu.groupsTabOpened = false;
      menu.viewersTabOpened = false;
      menu.clientsTabOpened = false;
      menu.highpriorityTabOpened = false;
      menu.alertsTabOpened = false;
      settings.menu = menu;

      const theme = new SettingsTheme();
      theme.darkMode = true;
      settings.theme = theme;

      this._saveSettings(settings);
    }
  }

  get settings(): Settings {
    return this.settingsSubject?.value;
  }

  save(): void {
    this._saveSettings(this.settings);
  }

  private _getSettings(): Settings {
    return JSON.parse(localStorage.getItem(this.SETTINGS_ITEM)) as Settings;
  }

  private _saveSettings(settings: Settings): void {
    localStorage.setItem(this.SETTINGS_ITEM, JSON.stringify(settings));
    this.settingsSubject.next(settings);
  }
}
