import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RandomGeneratorService } from '@core/services';
import { Player } from '@core/shared/player';
import { PlayerService } from '@core/shared/player/player.service';
import { FindPlayerInput } from '@core/graphql/player';
import { Path } from '@core/enums';
import { CreatePlayerInput, UpdatePlayerInput } from '@core/graphql/player';
import { Group, GroupService } from '@core/shared/group';
import { FindGroupInput } from '@core/graphql/group';
import { AppAlertService } from '@core/shared/app-alert';

@Component({
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  player: Player;
  groups: Group[];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService,
    private groupService: GroupService,
    private generator: RandomGeneratorService,
    private alertService: AppAlertService
  ) {}

  ngOnInit(): void {
    this.player = new Player();
    this.player.group = new Group();
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindPlayerInput();
        input.id = params.get('id');
        this.playerService
          .find(input)
          .result()
          .then(
            (value) => {
              this.player = JSON.parse(JSON.stringify(value.data.findPlayer));
              if (!this.player.group) {
                this.player.group = new Group();
              }
            },
            (error) => {
              this.router.navigate([Path.Players]);
            }
          );
      }
    });

    this.groupService
      .find(new FindGroupInput())
      .result()
      .then(
        (value) => {
          this.groups = value.data.findAllGroups;
        },
        (error) => {
          this.alertService.showError('Chyba načítání', 'Při pokusu o načtení skupin se objevila chyba');
        }
      );
  }

  onSubmit() {
    this.loading = true;

    const input = this.player.id ? new UpdatePlayerInput() : new CreatePlayerInput();
    input.name = this.player.name;
    input.token = this.player.token;
    input.group = this.player.group.id;

    const query = this.player.id
      ? this.playerService.update(this.player.id, input)
      : this.playerService.create(input);
    query.toPromise().then(
      (value) => {
        this.loading = false;
        this.alertService.showSuccess('Uloženo', 'Panel byl úspěšně uložen');

        if (value.data.createPlayer) {
          this.router.navigate([Path.Players, value.data.createPlayer.id]);
        }

        if (value.data.updatePlayer) {
          this.router.navigate([Path.Players, value.data.updatePlayer.id]);
        }
      },
      (error) => {
        this.alertService.showError('Chyba ukládání', 'Při ukládání panelu se vyskytla chyba');
        this.loading = false;
      }
    );
  }

  generateToken() {
    this.player.token = this.generator.generateToken();
  }

  changeGroup(event) {
    this.player.group.id = event.target.value;
  }
}
