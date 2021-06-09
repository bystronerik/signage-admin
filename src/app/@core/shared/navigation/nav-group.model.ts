import { NavItem } from '@core/shared/navigation';
import { RouterLink, RouterLinkActive } from '@angular/router';

export class NavGroup {
  id: string;
  name: string;
  link: string;
  svgIconPath: string;
  items: NavItem[];
  onlyAdmin: boolean;

  constructor(id: string, name: string, link: string, svgIconPath: string, items: NavItem[], onlyAdmin: boolean) {
    this.id = id;
    this.name = name;
    this.link = link;
    this.svgIconPath = svgIconPath;
    this.items = items;
    this.onlyAdmin = onlyAdmin;
  }
}
