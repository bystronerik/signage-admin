import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from '@core/enums';
import { PlayerService } from '@core/shared/player';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';
import { EntityComponent, ShowingPlace } from '@core/shared/entity';

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

    this.name('Style').icon(null);

    this.field('id').name('ID');

    this.field('name').name('Název').showAt(ShowingPlace.DATAGRID);

    this.field('token').name('Přístupový token').showAt(ShowingPlace.DATAGRID);
  }

  ngOnInit(): void {}

  async createNew(): Promise<void> {
    await this.router.navigate([Path.Players, Path.PlayersCreate]);
  }

  async showDetail(id: string): Promise<void> {
    await this.router.navigate([Path.Players, id]);
  }

  async showEdit(id: string): Promise<void> {
    await this.router.navigate([Path.Players, id, 'edit']);
  }

  showDelete(id: string): void {
    this.playerId = id;
    this.modalService.open('delete-player-modal');
  }

  submitDelete(): void {
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
