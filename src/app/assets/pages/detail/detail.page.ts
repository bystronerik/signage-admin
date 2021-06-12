import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/+auth';
import { Asset, AssetService } from '@core/shared/asset';
import { FindAssetInput } from '@core/graphql/asset';
import { Path } from '@core/enums';
import { AssetList, AssetListService } from '@core/shared/assetlist';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  asset: Asset;
  highpriority: AssetList[];
  clients: AssetList[];
  playlists: AssetList[];

  public settings;
  private assetListId: string;

  constructor(
    private router: Router,
    public authService: AuthService,
    private assetService: AssetService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private assetListService: AssetListService,
    private alertService: AppAlertService
  ) {
    this.highpriority = [];
    this.playlists = [];
    this.clients = [];

    this.settings = {
      columns: {
        name: {
          title: 'Název',
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
        editButtonContent: 'Upravit',
      },
      delete: {
        deleteButtonContent: 'Odstranit',
      },
    };
  }

  ngOnInit(): void {
    this.asset = new Asset();

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindAssetInput();
        input.id = params.get('id');
        this.assetService
          .find(input)
          .result()
          .then(
            (value) => {
              this.asset = value.data.findAsset;
              this.highpriority = this.asset.assetLists.filter((val) => val.type === 'highpriority');
              this.playlists = this.asset.assetLists.filter((val) => val.type === 'playlist');
              this.clients = this.asset.assetLists.filter((val) => val.type === 'client');
            },
            (error) => {
              this.router.navigate([Path.Assets]);
            }
          );
      }
    });
  }

  createNew(type: string) {
    this.router.navigate(['assetlists', type]);
  }

  showDetail(type: string, event) {
    this.router.navigate(['assetlists', type, event.data.id]);
  }

  showDelete() {
    this.modalService.open('delete-asset-modal');
  }

  submitDelete() {
    this.assetService
      .delete(this.asset.id)
      .toPromise()
      .then(
        (value) => {
          this.router.navigate([Path.Assets]);
          this.alertService.showSuccess('Smazáno', 'Asset byl úspěšně smazán');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }

  showAssignDelete(event) {
    this.assetListId = event.data.id;
    this.modalService.open('delete-assetassign-modal');
  }

  submitAssignDelete() {
    this.assetListService
      .removeAssetFromAssetList(this.assetListId, this.asset.id)
      .toPromise()
      .then(
        (value) => {
          this.highpriority = this.highpriority.filter((val) => val.id !== this.assetListId);
          this.playlists = this.playlists.filter((val) => val.id !== this.assetListId);
          this.clients = this.clients.filter((val) => val.id !== this.assetListId);
          this.alertService.showSuccess('Smazáno', 'Přiřazení assetu bylo úspěšně odstraněno');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
