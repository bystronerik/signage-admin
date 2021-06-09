import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@ui/+layout/components/footer/footer.component';
import { NavbarComponent } from '@ui/+layout/components/navbar/navbar.component';
import { SidebarComponent } from '@ui/+layout/components/sidebar/sidebar.component';
import { DpDatePickerModule } from 'ng2-date-picker';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent, FooterComponent],
  imports: [CommonModule, RouterModule, DpDatePickerModule],
  exports: [NavbarComponent, SidebarComponent, FooterComponent, DpDatePickerModule],
})
export class LayoutModule {}
