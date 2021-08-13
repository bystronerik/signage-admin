import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from '@core/enums';
import { StyleService } from '@core/shared/style';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';
import { EntityComponent, ShowingPlace } from '@core/shared/entity';
import { EntityDataLoader } from '@core/shared/entity/entity.data-loader';
import { FindStyleInput } from '@core/graphql/style';
import { FindInput } from '@core/graphql/findinput';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage extends EntityComponent implements OnInit {
  private styleId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    public styleService: StyleService,
    private alertService: AppAlertService
  ) {
    super(styleService);

    this.name('Style').icon(null);

    this.field('id').name('ID');

    this.field('name').name('Název').showAt(ShowingPlace.DATAGRID);

    this.field('type').name('Typ').showAt(ShowingPlace.DATAGRID);
  }

  ngOnInit(): void {}

  async createNew() {
    await this.router.navigate([Path.StylesCreate], { relativeTo: this.route });
  }

  async showDetail(id: string) {
    await this.router.navigate([id], { relativeTo: this.route });
  }

  async showEdit(id: string) {
    await this.router.navigate([Path.Styles, id, 'edit']);
  }

  showDelete(id: string) {
    this.styleId = id;
    this.modalService.open('delete-style-modal');
  }

  submitDelete() {
    this.styleService
      .delete(this.styleId)
      .toPromise()
      .then(
        (value) => {
          this.getEntityDataLoader().refresh();
          this.alertService.showSuccess('Smazáno', 'Vzhledová konfigurace byla úspěšně smazána');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
