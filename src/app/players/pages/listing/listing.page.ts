import { Component, OnInit } from '@angular/core';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Router } from '@angular/router';
import { Path } from '@core/enums';
import { PlayerDataSource, PlayerService } from '@core/shared/player';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  public settings;
  public source: DataSource;

  private playerId: string;

  constructor(
    private router: Router,
    playerDataSource: PlayerDataSource,
    private playerService: PlayerService,
    private modalService: ModalService,
    private alertService: AppAlertService
  ) {
    this.source = playerDataSource;
    this.settings = {
      columns: {
        name: {
          title: 'Název',
        },
        token: {
          title: 'Přístupový token',
        },
        group: {
          title: 'Skupina',
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
        addButtonContent: 'Přidat panel',
      },
      edit: {
        editButtonContent: 'Detail',
      },
      delete: {
        deleteButtonContent: 'Smazat',
      },
    };
  }

  ngOnInit(): void {}

  async createNew() {
    await this.router.navigate([Path.Players, Path.PlayersCreate]);
  }

  async showDetail(event) {
    await this.router.navigate([Path.Players, event.data.id]);
  }

  showDelete(event) {
    this.playerId = event.data.id;
    this.modalService.open('delete-player-modal');
  }

  submitDelete() {
    this.playerService
      .deletePlayer(this.playerId)
      .toPromise()
      .then(
        (value) => {
          this.source.refresh();
          this.alertService.showSuccess('Smazáno', 'Panel byl úspěšně odstraněn');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
