import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '@core/enums';
import { AssetService } from '@core/shared/asset';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';
import { EntityComponent, ShowingPlace } from '@core/shared/entity';
import { DirectoryService } from '@core/shared/directory';
import { Directory, FindDirectoryInput } from '@app/graphql';

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
    const input: FindDirectoryInput = {};
    input.name = '/';
    input.parentDirectory = 'root';
    this.directoryService
      .find(input)
      .result()
      .then((val) => {
        this.directory = val.data.findDirectory as Directory;
      });
  }

  async createNew(): Promise<void> {
    await this.router.navigate([Path.Assets, Path.AssetsCreate]);
  }

  async showEdit(id: string): Promise<void> {
    await this.router.navigate([Path.Assets, id, 'edit']);
  }

  async showDetail(id: string): Promise<void> {
    await this.router.navigate([Path.Assets, id]);
  }

  showDelete(id: string): void {
    this.assetId = id;
    this.modalService.open('delete-asset-modal');
  }

  submitDelete(): void {
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
