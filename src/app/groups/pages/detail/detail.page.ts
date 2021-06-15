import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, GroupPlaylistsDataSource, GroupService } from '@core/shared/group';
import { AuthService } from '@app/+auth';
import { FindGroupInput, UpdateGroupInput } from '@core/graphql/group';
import { Path } from '@core/enums';
import { ModalService } from '@core/services';
import { Player, PlayerService } from '@core/shared/player';
import { AppAlertService } from '@core/shared/app-alert';
import { FindPlayerInput, UpdatePlayerInput } from '@core/graphql/player';
import { GroupPlayersDataSource } from '@core/shared/group/group-players.data-source';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DetailPage implements OnInit {
  public settings;
  public source: GroupPlayersDataSource;

  group: Group;
  selected: Player;
  players: Player[];
  loading = false;

  private playerId: string;

  constructor(
    private router: Router,
    public authService: AuthService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private playerService: PlayerService,
    private groupPlayersDataSource: GroupPlayersDataSource,
    private alertService: AppAlertService
  ) {
    this.source = groupPlayersDataSource;
    this.settings = {
      columns: {
        name: {
          title: 'Název',
        },
      },
      mode: 'external',
      noDataMessage: 'Nebyly nalezeny žádné záznamy',
      actions: {
        position: 'right',
        columnTitle: '',
        edit: false,
      },
      attr: {
        class: 'datagrid',
      },
      add: {
        addButtonContent: 'Přidat',
      },
      edit: {
        editButtonContent: 'Detail',
      },
      delete: {
        deleteButtonContent: 'Odstranit',
      },
    };
  }

  ngOnInit(): void {
    this.group = new Group();
    this.selected = new Player();

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.source.groupId = params.get('id');
        const input = new FindGroupInput();
        input.id = params.get('id');

        this.groupService
          .findGroup(input)
          .result()
          .then(
            (value) => {
              this.group = value.data.findGroup;

              this.playerService
                .findAllPlayers(new FindPlayerInput())
                .result()
                .then(
                  (val) => {
                    this.players = val.data.findAllPlayers;
                  },
                  (error) => {
                    this.alertService.showError('Chyba načítání', 'Při pokusu o načtení přehrávačů se objevila chyba');
                  }
                );
            },
            (error) => {
              this.router.navigate([Path.Groups]);
            }
          );
      }
    });
  }

  addPlayer() {
    this.modalService.open('add-player-modal');
  }

  removePlayer(event) {
    this.playerId = event.data.id;
    this.modalService.open('delete-playerassign-modal');
  }

  submitPlayerDelete() {
    this.loading = true;

    const input = new UpdatePlayerInput();
    input.group = '';

    this.playerService
      .updatePlayer(this.playerId, input)
      .toPromise()
      .then(
        (value) => {
          this.loading = false;
          this.source.refresh();
          this.closeModal();
          this.alertService.showSuccess('Přehrávač odebrán', 'Přehrávač byl úspěšně odebrán ze skupiny');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o uložení se vyskytla chyba');
        }
      );
  }

  closeModal() {
    this.modalService.close('add-player-modal');
  }

  submitModal() {
    this.loading = true;

    const input = new UpdatePlayerInput();
    input.group = this.group.id;

    this.playerService
      .updatePlayer(this.selected.id, input)
      .toPromise()
      .then(
        (value) => {
          this.loading = false;
          this.source.refresh();
          this.closeModal();
          this.alertService.showSuccess('Přehrávač přiřazen', 'Přehrávač byl úspěšně přiřazen ke skupině');
        },
        (error) => {
          this.loading = false;
          this.alertService.showError('Chyba ukládání', 'Při pokusu o uložení se vyskytla chyba');
        }
      );
  }

  changePlayer(event) {
    this.selected.id = event.target.value;
  }

  showDelete() {
    this.modalService.open('delete-group-modal');
  }

  submitDelete() {
    this.groupService
      .deleteGroup(this.group.id)
      .toPromise()
      .then(
        (value) => {
          this.router.navigate([Path.Groups]);
          this.alertService.showSuccess('Smazáno', 'Skupina byla úspěšně smazán');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
