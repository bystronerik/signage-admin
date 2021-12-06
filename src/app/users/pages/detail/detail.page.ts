import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@core/shared/user';
import { User, FindUserInput } from '@app/graphql';
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
    this.user = {} as User;
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input: FindUserInput = {};
        input.id = params.get('id');
        this.userService
          .find(input)
          .result()
          .then(
            (value) => {
              this.user = Object.assign({} as User, value.data.findUser);
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
      .delete(this.user.id)
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
