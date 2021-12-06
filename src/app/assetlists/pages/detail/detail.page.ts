import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/+auth';
import { Path } from '@core/enums';
import { AssetService } from '@core/shared/asset';
import { ModalService } from '@core/services';
import { FindStyleInput, AssetAssignInput, FindAssetListInput, Directory, AssetList, Style, Asset } from '@app/graphql';
import { AssetListService } from '@core/shared/assetlist';
import { AppAlertService } from '@core/shared/app-alert';
import { DirectoryService } from '@core/shared/directory';
import { Observable } from 'rxjs';
import { Entity, ShowingPlace } from '@core/shared/entity';
import { EntityDataLoader } from '@core/shared/entity/entity.data-loader';
import { EntityFieldBuilder } from '@core/shared/entity/entity-field.builder';
import { map } from 'rxjs/operators';
import { StyleService, StyleType } from '@core/shared/style';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  assetList: AssetList;
  assets: Observable<Asset[]>;
  directories: Observable<Directory[]>;
  animations: Observable<Style[]>;
  assetEntry: AssetAssignInput;
  selectedAsset: Asset;
  loading = false;

  entity: Entity;
  dataLoader: EntityDataLoader;

  private assetId: string;

  constructor(
    private router: Router,
    public authService: AuthService,
    private assetListService: AssetListService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private assetsService: AssetService,
    private alertService: AppAlertService,
    private directoryService: DirectoryService,
    private styleService: StyleService
  ) {
    this.entity = new Entity();
    this.entity.name = 'Přiřazený obsah';
    this.entity.fields.push(new EntityFieldBuilder('path').name('Náhled').showAt(ShowingPlace.DATAGRID).result());
    this.entity.fields.push(new EntityFieldBuilder('name').name('Název').showAt(ShowingPlace.DATAGRID).result());
    this.entity.fields.push(new EntityFieldBuilder('validity').name('Validita').showAt(ShowingPlace.DATAGRID).result());
    this.entity.fields.push(
      new EntityFieldBuilder('animationIn').name('Animace').showAt(ShowingPlace.DATAGRID).result()
    );
    this.entity.fields.push(new EntityFieldBuilder('showTime').name('Čas').showAt(ShowingPlace.DATAGRID).result());

    this.dataLoader = new (class extends EntityDataLoader {
      public loadItems(input: FindAssetListInput): Observable<any> {
        return assetListService.find(input).valueChanges.pipe(
          map((val) => {
            return val.data.findAssetList.assets.map((item) => {
              return {
                id: item.id,
                name: item.asset.name,
                path: item.asset.path,
                validity: item.validity.enabled ? item.validity.from + ' - ' + item.validity.to : '-',
                animationIn: item.animationIn ? item.animationIn.name : '-',
                showTime: (item.showTime ?? 20) + ' s',
              };
            });
          })
        );
      }
    })();
  }

  ngOnInit(): void {
    this.assetList = {} as AssetList;
    this.assetEntry = {} as AssetAssignInput;
    this.assetEntry.validityEnabled = false;

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input: FindAssetListInput = {};
        input.id = params.get('id');
        this.assetListService
          .find(input)
          .result()
          .then(
            (value) => {
              this.assetList = Object.assign({} as AssetList, value.data.findAssetList);

              this.assets = this.assetsService.findAll({});

              this.directories = this.directoryService.findAll({});

              const findInput: FindStyleInput = {};
              findInput.type = StyleType.ANIMATION;
              this.animations = this.styleService.findAll(findInput);
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
    if (this.assetEntry.asset.includes('dir-')) {
      this.selectedAsset = null;
    } else {
      this.assets.forEach((val) =>
        val.forEach((item) => {
          if (item.id === this.assetEntry.asset) {
            this.selectedAsset = item;
          }
        })
      );
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
          this.dataLoader.refresh();
          this.closeModal();
          this.alertService.showSuccess('Asset přiřazen', 'Obsah byl úspěšně přiřazen k playlistu');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o uložení se vyskytla chyba');
        }
      );
  }

  addAsset() {
    this.modalService.open('add-asset-modal');
  }

  editEntry(id: string) {
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
      .delete(this.assetList.id)
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

  showDeleteEntry(id: string) {
    this.assetId = id;
    this.modalService.open('delete-assetlist-asset-modal');
  }

  submitDeleteEntry() {
    this.assetListService
      .removeAssetFromAssetList(this.assetList.id, this.assetId)
      .toPromise()
      .then(
        (value) => {
          this.dataLoader.refresh();
          this.alertService.showSuccess('Smazáno', 'Přiřazení assetu bylo úspěšně odstraněno');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }

  changeAnimation(event, type) {
    switch (type) {
      case 'IN':
        this.assetEntry.animationIn = event.target.value;
        break;
      case 'OUT':
        this.assetEntry.animationOut = event.target.value;
        break;
    }
  }
}
