import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RandomGeneratorService } from '@core/services';
import { PlayerService } from '@core/shared/player/player.service';
import {
  FindPlayerInput,
  CreatePlayerInput,
  UpdatePlayerInput,
  Group,
  Player,
  UpdatePlayerMutation, CreatePlayerMutation
} from '@app/graphql';
import { Path } from '@core/enums';
import { GroupService } from '@core/shared/group';
import { AppAlertService } from '@core/shared/app-alert';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';

@Component({
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  player: Player;
  groups: Observable<Group[]>;
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
    this.player = {} as Player;
    this.player.group = {} as Group;
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input: FindPlayerInput = {};
        input.id = params.get('id');
        this.playerService
          .find(input)
          .result()
          .then(
            (value) => {
              this.player = Object.assign({} as Player, value.data.findPlayer);
              if (!this.player.group) {
                this.player.group = {} as Group;
              }
            },
            (error) => {
              this.router.navigate([Path.Players]);
            }
          );
      }
    });

    this.groups = this.groupService.findAll({});
  }

  onSubmit() {
    this.loading = true;

    const input: UpdatePlayerInput|CreatePlayerInput = this.player.id ? {} as UpdatePlayerInput : {} as CreatePlayerInput;
    input.name = this.player.name;
    input.token = this.player.token;
    input.group = this.player.group.id;

    const query: Observable<FetchResult<UpdatePlayerMutation|CreatePlayerMutation>> = this.player.id ? this.playerService.update(this.player.id, input as UpdatePlayerInput) : this.playerService.create(input as CreatePlayerInput);
    query.toPromise().then(
      (value) => {
        this.loading = false;
        this.alertService.showSuccess('Uloženo', 'Panel byl úspěšně uložen');

        if ('createPlayer' in value.data) {
          this.router.navigate([Path.Players, value.data.createPlayer.id]);
        }

        if ('updatePlayer' in value.data) {
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
