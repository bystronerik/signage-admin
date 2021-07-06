import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPage } from './pages/edit/edit.page';
import { DirectoryRoutingModule } from './directory-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditPage],
  imports: [CommonModule, FormsModule, DirectoryRoutingModule],
})
export class DirectoryModule {}
