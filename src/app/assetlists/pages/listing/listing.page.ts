import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from '@core/enums';
import { AssetListDataSource, AssetListService } from '@core/shared/assetlist';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  public settings;
  public source: AssetListDataSource;
  public assetListsType: string;

  private assetListId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    assetListDataSource: AssetListDataSource,
    private modalService: ModalService,
    private assetListService: AssetListService,
    private alertService: AppAlertService
  ) {
    this.source = assetListDataSource;
    this.settings = {
      columns: {
        name: {
          title: 'Název',
        },
        enabled: {
          title: 'Aktivní',
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
        addButtonContent: 'Přidat seznam',
      },
      edit: {
        editButtonContent: 'Detail',
      },
      delete: {
        deleteButtonContent: 'Smazat',
      },
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (!params.has('type')) {
        this.router.navigate([Path.Dashboard]);
      } else {
        this.assetListsType = params.get('type');

        this.source.assetListsType = params.get('type');
        this.source.refresh();
      }
    });
  }

  async createNew() {
    await this.router.navigate([Path.AssetListsCreate], { relativeTo: this.route });
  }

  async showDetail(event) {
    await this.router.navigate([event.data.id], { relativeTo: this.route });
  }

  showDelete(event) {
    this.assetListId = event.data.id;
    this.modalService.open('delete-assetlist-modal');
  }

  submitDelete() {
    this.assetListService
      .deleteAssetList(this.assetListId)
      .toPromise()
      .then(
        (value) => {
          this.source.refresh();
          this.alertService.showSuccess('Smazáno', 'Asset list byl úspěšne smazán');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
