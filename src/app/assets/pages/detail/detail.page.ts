import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/+auth';
import { Asset, AssetService } from '@core/shared/asset';
import { FindAssetInput } from '@core/graphql/asset';
import { Path } from '@core/enums';
import { AssetList, AssetListService } from '@core/shared/assetlist';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';
import { EntityDataLoader } from '@core/shared/entity/entity.data-loader';
import { FindInput } from '@core/graphql/findinput';
import { Observable, Observer } from 'rxjs';
import { Entity, ShowingPlace } from '@core/shared/entity';
import { EntityFieldBuilder } from '@core/shared/entity/entity-field.builder';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  asset: Asset;
  playlists: Observable<AssetList[]>;

  entity: Entity;
  dataLoader: EntityDataLoader;

  private observer: Observer<AssetList[]>;
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
    this.entity = new Entity();
    this.entity.name = 'Playlisty';
    this.entity.fields.push(new EntityFieldBuilder('name').name('Název').showAt(ShowingPlace.DATAGRID).result());

    const source = new Observable<AssetList[]>((val) => {
      this.observer = val;
    });

    this.dataLoader = new (class extends EntityDataLoader {
      public loadItems(input: FindInput): Observable<any> {
        return source;
      }
    })();
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
              this.asset = Object.assign(new Asset(), value.data.findAsset);
              this.observer.next(this.asset.assetLists.filter((val) => val.type === 'playlist'));
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

  showDetail(type: string, id: string) {
    this.router.navigate(['assetlists', type, id]);
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

  showAssignDelete(type: string, id: string) {
    this.router.navigate(['assetlists', type, id]);
  }
}
