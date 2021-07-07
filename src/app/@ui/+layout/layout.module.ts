import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@ui/+layout/components/footer/footer.component';
import { NavbarComponent } from '@ui/+layout/components/navbar/navbar.component';
import { SidebarComponent } from '@ui/+layout/components/sidebar/sidebar.component';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, SidebarComponent, FooterComponent],
})
export class LayoutModule {}
