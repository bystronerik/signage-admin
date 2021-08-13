import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from '@core/enums';
import { AssetListService } from '@core/shared/assetlist';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';
import { Entity, EntityComponent, ShowingPlace } from '@core/shared/entity';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage extends EntityComponent implements OnInit {
  public assetListsType: string;

  private assetListId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    public assetListService: AssetListService,
    private alertService: AppAlertService
  ) {
    super(assetListService);

    this.name('AssetList').icon(null);

    this.field('name').name('Název').showAt(ShowingPlace.DATAGRID);

    this.field('enabled').name('Aktivní').showAt(ShowingPlace.DATAGRID);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (!params.has('type')) {
        this.router.navigate([Path.Dashboard]);
      } else {
        this.assetListsType = params.get('type');
      }
    });
  }

  async createNew() {
    await this.router.navigate([Path.AssetListsCreate], { relativeTo: this.route });
  }

  async showDetail(id: string) {
    await this.router.navigate([id], { relativeTo: this.route });
  }

  async showEdit(id: string) {
    await this.router.navigate([Path.AssetLists, id, 'edit']);
  }

  showDelete(id: string) {
    this.assetListId = id;
    this.modalService.open('delete-assetlist-modal');
  }

  submitDelete() {
    this.assetListService
      .delete(this.assetListId)
      .toPromise()
      .then(
        (value) => {
          this.getEntityDataLoader().refresh();
          this.alertService.showSuccess('Smazáno', 'Asset list byl úspěšne smazán');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
