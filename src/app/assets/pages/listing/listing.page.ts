import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '@core/enums';
import { AssetService } from '@core/shared/asset';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';
import { Entity, EntityComponent, ShowingPlace } from '@core/shared/entity';
import { EntityDataLoader } from '@core/shared/entity/entity.data-loader';
import { FindInput } from '@core/graphql/findinput';
import { Observable } from 'rxjs';
import { FindAssetInput } from '@core/graphql/asset';
import { Directory, DirectoryService } from '@core/shared/directory';
import { CreateDirectoryInput, FindDirectoryInput } from '@core/graphql/directory';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage extends EntityComponent implements OnInit {
  public directory: Directory;
  private assetId: string;

  constructor(
    private modalService: ModalService,
    private router: Router,
    public assetService: AssetService,
    private alertService: AppAlertService,
    private directoryService: DirectoryService
  ) {
    super(assetService);

    this.name('Asset').icon(null);

    this.field('name').name('Název').showAt(ShowingPlace.DATAGRID);

    this.field('path').name('Obrázek').showAt(ShowingPlace.DATAGRID);

    this.field('type').name('Typ').showAt(ShowingPlace.DATAGRID);
  }

  ngOnInit(): void {
    const input = new FindDirectoryInput();
    input.name = '/';
    input.parentDirectory = 'root';
    this.directoryService
      .find(input)
      .result()
      .then((val) => {
        this.directory = val.data.findDirectory;
      });
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
