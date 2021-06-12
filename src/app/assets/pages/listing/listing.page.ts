import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Path} from '@core/enums';
import {AssetService} from '@core/shared/asset';
import {ModalService} from '@core/services';
import {AppAlertService} from '@core/shared/app-alert';
import { Entity, EntityComponent, ShowingPlace } from '@core/shared/entity';


@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage extends EntityComponent implements OnInit {
  private assetId: string;

  constructor(
    private modalService: ModalService,
    private router: Router,
    public assetService: AssetService,
    private alertService: AppAlertService,
  ) {
    super(assetService);

    this.name('Asset')
      .icon(null);

    this.field('name')
      .name('Název')
      .showAt(ShowingPlace.DATAGRID);

    this.field('path')
      .name('Obrázek')
      .showAt(ShowingPlace.DATAGRID);

    this.field('type')
      .name('Typ')
      .showAt(ShowingPlace.DATAGRID);
  }

  ngOnInit(): void {
  }

  async createNew() {
    await this.router.navigate([Path.Assets, Path.AssetsCreate]);
  }

  async showDetail(id: string) {
    await this.router.navigate([Path.Assets, id]);
  }

  showDelete(id: string) {
    this.assetId = id;
    this.modalService.open('delete-asset-modal');
  }

  submitDelete() {
    this.assetService
      .delete(this.assetId)
      .toPromise()
      .then(
        (value) => {
          this.getEntityDataLoader().refresh();
          this.alertService.showSuccess('Smazáno', 'Asset byl úspěšně odstraněn');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
