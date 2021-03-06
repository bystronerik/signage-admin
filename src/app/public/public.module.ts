import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InternalServerErrorPage } from './pages/internal-server-error/internal-server-error.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [InternalServerErrorPage, NotFoundPage],
  imports: [CommonModule, PublicRoutingModule],
})
export class PublicModule {}
