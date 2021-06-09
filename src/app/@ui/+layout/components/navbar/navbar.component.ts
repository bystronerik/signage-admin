import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SettingsService } from '@core/shared/settings';
import { AuthService } from '@app/+auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  @Output() logout = new EventEmitter<void>();
  @Output() deploy = new EventEmitter<void>();
  authService: AuthService;

  constructor(private settingsService: SettingsService, authService: AuthService) {
    this.authService = authService;
  }

  ngOnInit(): void {
    this.refreshThemeElement();
  }

  onClickLogout() {
    if (this.isProfileMenuOpen()) {
      this.toggleProfileMenu();
    }

    this.logout.emit();
  }

  onClickDeploy() {
    this.deploy.emit();
  }

  toggleSideMenu() {
    const menu = this.settingsService.settings.menu;
    menu.sideMenuOpened = !menu.sideMenuOpened;

    this.settingsService.save();
  }

  toggleProfileMenu() {
    const menu = this.settingsService.settings.menu;
    menu.profileMenuOpened = !menu.profileMenuOpened;

    this.settingsService.save();
  }

  isProfileMenuOpen(): boolean {
    return this.settingsService.settings.menu.profileMenuOpened;
  }

  toggleDarkMode() {
    const theme = this.settingsService.settings.theme;
    theme.darkMode = !theme.darkMode;

    this.settingsService.save();
    this.refreshThemeElement();
  }

  isDarkModeEnabled(): boolean {
    return this.settingsService.settings.theme.darkMode;
  }

  private refreshThemeElement() {
    if (this.settingsService.settings.theme.darkMode) {
      document.getElementById('theme').setAttribute('class', 'theme-dark');
      document.getElementById('theme-color').setAttribute('value', '#1a1c23');
    } else {
      document.getElementById('theme').setAttribute('class', null);
      document.getElementById('theme-color').setAttribute('value', '#f9fafb');
    }
  }
}
