import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player, PlayerService } from '@core/shared/player';
import { AuthService } from '@app/+auth';
import { FindPlayerInput } from '@core/graphql/player';
import { Path } from '@core/enums';
import { environment } from '@environments/environment';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  player: Player;
  playerUrl: string;

  constructor(
    private router: Router,
    public authService: AuthService,
    private modalService: ModalService,
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private alertService: AppAlertService
  ) {}

  ngOnInit(): void {
    this.player = new Player();
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindPlayerInput();
        input.id = params.get('id');
        this.playerService
          .find(input)
          .result()
          .then(
            (value) => {
              this.player = Object.assign(new Player(), value.data.findPlayer);
            },
            (error) => {
              this.router.navigate([Path.Players]);
            }
          );
      }
    });
  }

  showDelete() {
    this.modalService.open('delete-player-modal');
  }

  submitDelete() {
    this.playerService
      .delete(this.player.id)
      .toPromise()
      .then(
        (value) => {
          this.router.navigate([Path.Players]);
          this.alertService.showSuccess('Smazáno', 'Panel byl úspěšně smazán');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
