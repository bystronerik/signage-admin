import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@app/+auth';
import {Path} from '@core/enums';
import {Asset, AssetService} from '@core/shared/asset';
import {ModalService} from '@core/services';
import {FindAssetInput} from '@core/graphql/asset';
import {AssetList, AssetListAssetsDataSource, AssetListService} from '@core/shared/assetlist';
import {AssetAssignInput} from '@core/graphql/assetlist/asset-assign-input.model';
import {FindAssetListInput} from '@core/graphql/assetlist/find-assetlist-input.model';
import {AppAlertService} from '@core/shared/app-alert';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  assetList: AssetList;
  assets: Asset[];
  assetEntry: AssetAssignInput;
  selectedAsset: Asset;
  loading = false;

  private assetId: string;

  public settings;
  public source: AssetListAssetsDataSource;

  constructor(
    private router: Router,
    public authService: AuthService,
    private assetListService: AssetListService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private assetsService: AssetService,
    private assetListAssetsDataSource: AssetListAssetsDataSource,
    private alertService: AppAlertService
  ) {
    this.source = assetListAssetsDataSource;
    this.settings = {
      columns: {
        assetId: {
          title: 'ID',
        },
        assetName: {
          title: 'Název',
        },
        validityEnabled: {
          title: 'Omezená validita',
        },
        validFrom: {
          title: 'Validní od',
        },
        validTo: {
          title: 'Validní do',
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
    this.assetList = new AssetList();
    this.assetEntry = new AssetAssignInput();
    this.assetEntry.validityEnabled = false;

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindAssetListInput();
        input.id = params.get('id');
        this.source.assetListId = input.id;
        this.assetListService
          .findAssetList(input)
          .result()
          .then(
            (value) => {
              this.assetList = value.data.findAssetList;

              this.assetsService
                .findAllAssets(new FindAssetInput())
                .result()
                .then(
                  (val) => {
                    this.assets = val.data.findAllAssets;
                  },
                  (error) => {
                    this.alertService.showError('Chyba načítání', 'Při pokusu o načtení assetů se objevila chyba');
                  }
                );
            },
            (error) => {
              if (params.has('type')) {
                this.router.navigate(['assetlists', params.get('type')]);
              } else {
                this.router.navigate([Path.Dashboard]);
              }
            }
          );
      }
    });
  }

  changeAsset(event) {
    this.assetEntry.asset = event.target.value;
    for(const item of this.assets) {
      if(item.id === this.assetEntry.asset) {
        this.selectedAsset = item;
        return;
      }
    }
  }

  submitModal() {
    this.loading = true;
    this.assetListService
      .assignAssetToAssetList(this.assetList.id, this.assetEntry)
      .toPromise()
      .then(
        (value) => {
          this.loading = false;
          this.source.refresh();
          this.closeModal();
          this.alertService.showSuccess('Asset přiřazen', 'Asset byl úspěšně přiřazen k asset listu');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o uložení se vyskytla chyba');
        }
      );
  }

  addAsset() {
    this.modalService.open('add-asset-modal');
  }

  editValidity(event) {
    this.assetEntry.asset = event.data.assetId;
    this.assetEntry.validityEnabled = event.data.validityEnabled;
    this.assetEntry.validTo = event.data.validTo;
    this.assetEntry.validFrom = event.data.validFrom;
    this.modalService.open('add-asset-modal');
  }

  closeModal() {
    this.modalService.close('add-asset-modal');
  }

  showDelete() {
    this.modalService.open('delete-assetlist-modal');
  }

  submitDelete() {
    this.assetListService
      .deleteAssetList(this.assetList.id)
      .toPromise()
      .then(
        (value) => {
          this.router.navigate(['assetlists', this.assetList.type]);
          this.alertService.showSuccess('Smazáno', 'Asset list byl úspěšně smazán');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }

  showDeleteEntry(event) {
    this.assetId = event.data.assetId;
    this.modalService.open('delete-assetlist-asset-modal');
  }

  submitDeleteEntry() {
    this.assetListService
      .removeAssetFromAssetList(this.assetList.id, this.assetId)
      .toPromise()
      .then(
        (value) => {
          this.source.refresh();
          this.alertService.showSuccess('Smazáno', 'Přiřazení assetu bylo úspěšně odstraněno');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
