import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '@core/enums';
import { PlayerService } from '@core/shared/player';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';
import { Entity, EntityComponent, ShowingPlace } from '@core/shared/entity';
import { EntityDataLoader } from '@core/shared/entity/entity.data-loader';
import { FindInput } from '@core/graphql/findinput';
import { Observable } from 'rxjs';
import { FindStyleInput } from '@core/graphql/style';
import { FindPlayerInput } from '@core/graphql/player';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage extends EntityComponent implements OnInit {
  private playerId: string;

  constructor(
    private router: Router,
    public playerService: PlayerService,
    private modalService: ModalService,
    private alertService: AppAlertService
  ) {
    super(playerService);

    this.name('Style')
      .icon(null);

    this.field('id')
      .name('ID');

    this.field('name')
      .name('Název')
      .showAt(ShowingPlace.DATAGRID);

    this.field('token')
      .name('Přístupový token')
      .showAt(ShowingPlace.DATAGRID);
  }

  ngOnInit(): void {}

  async createNew() {
    await this.router.navigate([Path.Players, Path.PlayersCreate]);
  }

  async showDetail(id: string) {
    await this.router.navigate([Path.Players, id]);
  }

  showDelete(id: string) {
    this.playerId = id;
    this.modalService.open('delete-player-modal');
  }

  submitDelete() {
    this.playerService
      .delete(this.playerId)
      .toPromise()
      .then(
        (value) => {
          this.getEntityDataLoader().refresh();
          this.alertService.showSuccess('Smazáno', 'Panel byl úspěšně odstraněn');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
