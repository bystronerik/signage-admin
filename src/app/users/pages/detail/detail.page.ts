import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from '@core/shared/user';
import { FindUserInput } from '@core/graphql/user';
import { Path } from '@core/enums';
import { AuthService } from '@app/+auth';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  user: User;

  constructor(
    private router: Router,
    public authService: AuthService,
    private modalService: ModalService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AppAlertService
  ) {}

  ngOnInit(): void {
    this.user = new User();
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindUserInput();
        input.id = params.get('id');
        this.userService
          .findUser(input)
          .result()
          .then(
            (value) => {
              this.user = value.data.findUser;
            },
            (error) => {
              this.router.navigate([Path.Users]);
            }
          );
      }
    });
  }

  showDelete() {
    this.modalService.open('delete-user-modal');
  }

  submitDelete() {
    this.userService
      .deleteUser(this.user.id)
      .toPromise()
      .then(
        (value) => {
          this.router.navigate([Path.Users]);
          this.alertService.showSuccess('Smazáno', 'Uživatel byl úspěšně smazán');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
