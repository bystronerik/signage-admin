import { Component, OnInit } from '@angular/core';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Router } from '@angular/router';
import { Path } from '@core/enums';
import { AssetDataSource, AssetService } from '@core/shared/asset';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  public settings;
  public source: DataSource;

  private assetId: string;

  constructor(
    private modalService: ModalService,
    private router: Router,
    assetDataSource: AssetDataSource,
    private assetService: AssetService,
    private alertService: AppAlertService
  ) {
    this.source = assetDataSource;
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
        addButtonContent: 'Přidat',
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
    await this.router.navigate([Path.Assets, Path.AssetsCreate]);
  }

  async showDetail(event) {
    await this.router.navigate([Path.Assets, event.data.id]);
  }

  showDelete(event) {
    this.assetId = event.data.id;
    this.modalService.open('delete-asset-modal');
  }

  submitDelete() {
    this.assetService
      .deleteAsset(this.assetId)
      .toPromise()
      .then(
        (value) => {
          this.source.refresh();
          this.alertService.showSuccess('Smazáno', 'Asset byl úspěšně odstraněn');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
