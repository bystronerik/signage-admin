import { Injectable } from '@angular/core';
import { Settings } from './settings.model';
import { BehaviorSubject } from 'rxjs';
import { SettingsTheme } from '@core/shared/settings/settings-theme.model';
import { SettingsMenu } from '@core/shared/settings/settings-menu.model';
import { getItem, setItem, StorageItem } from '@core/utils';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  private settingsSubject = new BehaviorSubject<Settings | null>(getItem(StorageItem.Settings) as Settings);

  constructor() {
    if (this.getSettings == null) {
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

      this.saveSettings(settings);
    }
  }

  get getSettings(): Settings | null {
    return this.settingsSubject.getValue();
  }

  save(): void {
    this.saveSettings(this.getSettings);
  }

  private saveSettings(settings: Settings): void {
    setItem(StorageItem.Settings, settings);
    this.settingsSubject.next(settings);
  }
}
