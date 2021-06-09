import { Component, OnInit } from '@angular/core';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Router } from '@angular/router';
import { Path } from '@core/enums';
import { AlertDataSource, AlertService } from '@core/shared/alert';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  public settings;
  public source: DataSource;

  private alertId: string;

  constructor(
    private modalService: ModalService,
    private router: Router,
    alertDataSource: AlertDataSource,
    private appAlertService: AppAlertService,
    private alertService: AlertService
  ) {
    this.source = alertDataSource;
    this.settings = {
      columns: {
        name: {
          title: 'Název',
        },
        type: {
          title: 'Typ',
        },
      },
      mode: 'external',
      noDataMessage: 'Nebyly nalezeny žádné záznamy',
      actions: {
        position: 'right',
        columnTitle: '',
      },
      attr: {
        class: 'datagrid',
      },
      add: {
        addButtonContent: 'Vytvořit',
      },
      edit: {
        editButtonContent: 'Detail',
      },
      delete: {
        deleteButtonContent: 'Smazat',
      },
    };
  }

  ngOnInit(): void {}

  async createNew() {
    await this.router.navigate([Path.Alerts, Path.AlertsCreate]);
  }

  async showDetail(event) {
    await this.router.navigate([Path.Alerts, event.data.id]);
  }

  showDelete(event) {
    this.alertId = event.data.id;
    this.modalService.open('delete-alert-modal');
  }

  submitDelete() {
    this.alertService
      .deleteAlert(this.alertId)
      .toPromise()
      .then(
        (value) => {
          this.source.refresh();
          this.appAlertService.showSuccess('Smazáno', 'Alert byl úspěšně odstraněn');
        },
        (error) => {
          this.appAlertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
