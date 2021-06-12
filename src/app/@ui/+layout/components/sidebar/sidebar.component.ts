import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SettingsService } from '@core/shared/settings';
import { AuthService } from '@app/+auth';
import { NavGroup, NavItem } from '@core/shared/navigation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SidebarComponent implements OnInit {
  groups: NavGroup[];
  private settingsService: SettingsService;

  constructor(settingsService: SettingsService, public authService: AuthService) {
    this.settingsService = settingsService;

    this.groups = [
      new NavGroup(
        'assets',
        'Databáze obrázků a videii',
        '/assets',
        'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
        [new NavItem('Zobrazit všechny', '/assets'), new NavItem('Vytvořit', '/assets/new')],
        false
      ),
      new NavGroup(
        'planner',
        'Plánovač',
        '/planner',
        'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
        [new NavItem('Zobrazit všechny', '/planner')],
        false
      ),
      new NavGroup(
        'clients',
        'Nájemci',
        '/assetlists/client',
        'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
        [new NavItem('Zobrazit všechny', '/assetlists/client'), new NavItem('Vytvořit', '/assetlists/client/new')],
        false
      ),
      /*new NavGroup('playlists', 'Playlisty', '/assetlists/playlist',
        'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
        [
          new NavItem('Zobrazit všechny', '/assetlists/playlist'),
          new NavItem('Vytvořit', '/assetlists/playlist/new'),
        ], false),*/
      new NavGroup(
        'alerts',
        'Informační zprávy',
        '/alerts',
        'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
        [new NavItem('Zobrazit všechny', '/alerts'), new NavItem('Vytvořit', '/alerts/new')],
        false
      ),
      new NavGroup(
        'groups',
        'Skupiny panelů',
        '/groups',
        'M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z',
        [new NavItem('Zobrazit všechny', '/groups'), new NavItem('Vytvořit', '/groups/new')],
        false
      ),
      new NavGroup(
        'viewers',
        'Panely',
        '/players',
        'M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
        [new NavItem('Zobrazit všechny', '/players'), new NavItem('Vytvořit', '/players/new')],
        true
      ),
      new NavGroup(
        'styles',
        'Vzhled',
        '/styles',
        'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
        [new NavItem('Zobrazit všechny', '/styles'), new NavItem('Vytvořit', '/styles/new')],
        true
      ),
    ];
  }

  ngOnInit(): void {}

  toggleSideMenu() {
    const menu = this.settingsService.settings.menu;
    menu.sideMenuOpened = !menu.sideMenuOpened;

    this.settingsService.save();
  }

  isSideMenuOpen(): boolean {
    return this.settingsService.settings.menu.sideMenuOpened;
  }

  toggleTab(tabId: string) {
    const menu = this.settingsService.settings.menu;
    menu[tabId + 'TabOpened'] = !menu[tabId + 'TabOpened'];
    this.settingsService.save();
  }

  isTabOpened(tabId: string): boolean {
    return this.settingsService.settings.menu[tabId + 'TabOpened'];
  }
}
