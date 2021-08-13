import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, GroupService } from '@core/shared/group';
import { AuthService } from '@app/+auth';
import { FindGroupInput } from '@core/graphql/group';
import { Path } from '@core/enums';
import { ModalService } from '@core/services';
import { Player, PlayerService } from '@core/shared/player';
import { AppAlertService } from '@core/shared/app-alert';
import { FindPlayerInput, UpdatePlayerInput } from '@core/graphql/player';
import { Entity, ShowingPlace } from '@core/shared/entity';
import { EntityDataLoader } from '@core/shared/entity/entity.data-loader';
import { EntityFieldBuilder } from '@core/shared/entity/entity-field.builder';
import { Observable, Observer } from 'rxjs';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DetailPage implements OnInit {
  group: Group;
  selected: Player;
  players: Player[];
  loading = false;

  entity: Entity;
  dataLoader: EntityDataLoader;

  private playerId: string;

  constructor(
    private router: Router,
    public authService: AuthService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private playerService: PlayerService,
    private alertService: AppAlertService
  ) {
    this.entity = new Entity();
    this.entity.name = 'Přehrávače';
    this.entity.fields.push(new EntityFieldBuilder('name').name('Název').showAt(ShowingPlace.DATAGRID).result());

    this.dataLoader = new (class extends EntityDataLoader {
      public loadItems(input: FindPlayerInput): Observable<any> {
        input.group = input.id;
        input.id = null;
        return playerService.findAll(input);
      }
    })();
  }

  ngOnInit(): void {
    this.group = new Group();
    this.selected = new Player();

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindGroupInput();
        input.id = params.get('id');

        this.groupService
          .find(input)
          .result()
          .then(
            (value) => {
              this.group = Object.assign(new Group(), value.data.findGroup);

              this.playerService.findAll(new FindPlayerInput()).subscribe((players) => {
                this.players = players as Player[];
              });
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

  removePlayer(id: string) {
    this.playerId = id;
    this.modalService.open('delete-playerassign-modal');
  }

  submitPlayerDelete() {
    this.loading = true;

    const input = new UpdatePlayerInput();
    input.group = '';

    this.playerService
      .update(this.playerId, input)
      .toPromise()
      .then(
        (value) => {
          this.loading = false;
          this.dataLoader.refresh();
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
      .update(this.selected.id, input)
      .toPromise()
      .then(
        (value) => {
          this.loading = false;
          this.dataLoader.refresh();
          this.closeModal();
          this.alertService.showSuccess('Přehrávač přiřazen', 'Přehrávač byl úspěšně přiřazen ke skupině');
        },
        (error) => {
          this.loading = false;
          this.alertService.showError('Chyba ukládání', 'Při pokusu o uložení se vyskytla chyba');
        }
      );
  }

  changePlayer(id: string) {
    this.router.navigate([Path.Players, id]);
  }

  showDelete() {
    this.modalService.open('delete-group-modal');
  }

  submitDelete() {
    this.groupService
      .delete(this.group.id)
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
