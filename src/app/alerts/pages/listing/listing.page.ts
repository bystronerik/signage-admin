import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '@core/enums';
import { AlertService } from '@core/shared/alert';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';
import { EntityComponent, ShowingPlace } from '@core/shared/entity';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage extends EntityComponent implements OnInit {
  private alertId: string;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private appAlertService: AppAlertService,
    public alertService: AlertService
  ) {
    super(alertService);

    this.name('Alert').icon(null);

    this.field('name').name('Název').showAt(ShowingPlace.DATAGRID);

    this.field('type').name('Typ').showAt(ShowingPlace.DATAGRID);
  }

  ngOnInit(): void {}

  async createNew() {
    await this.router.navigate([Path.Alerts, Path.AlertsCreate]);
  }

  async showDetail(id: string) {
    await this.router.navigate([Path.Alerts, id]);
  }

  async showEdit(id: string) {
    await this.router.navigate([Path.Alerts, id, 'edit']);
  }

  showDelete(id: string) {
    this.alertId = id;
    this.modalService.open('delete-alert-modal');
  }

  submitDelete() {
    this.alertService
      .delete(this.alertId)
      .toPromise()
      .then(
        (value) => {
          this.getEntityDataLoader().refresh();
          this.appAlertService.showSuccess('Smazáno', 'Informační zpráva byla úspěšně odstraněna');
        },
        (error) => {
          this.appAlertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
