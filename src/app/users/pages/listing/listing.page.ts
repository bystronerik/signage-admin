import { Component, OnInit } from '@angular/core';
import { Path } from '@core/enums';
import { Router } from '@angular/router';
import { UserService } from '@core/shared/user';
import { ModalService } from '@core/services';
import { AuthService } from '@app/+auth';
import { AppAlertService } from '@core/shared/app-alert';
import { EntityDataLoader } from '@core/shared/entity/entity.data-loader';
import { FindInput } from '@core/graphql/findinput';
import { Observable } from 'rxjs';
import { FindUserInput } from '@core/graphql/user';
import { EntityComponent, ShowingPlace } from '@core/shared/entity';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage extends EntityComponent implements OnInit {
  private userId: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private modalService: ModalService,
    private authService: AuthService,
    private alertService: AppAlertService
  ) {
    super(userService);

    this.name('User')
      .icon(null);

    this.field('id')
      .name('ID');

    this.field('username')
      .name('Uživatelské jméno')
      .showAt(ShowingPlace.DATAGRID);

    this.field('role')
      .name('Role')
      .showAt(ShowingPlace.DATAGRID);
  }

  ngOnInit(): void {}

  async createNew() {
    await this.router.navigate([Path.Users, Path.UsersCreate]);
  }

  async showDetail(event) {
    await this.router.navigate([Path.Users, event.data.id]);
  }

  closeWarning(): void {
    this.modalService.close('self-delete-modal');
  }

  showDelete(event) {
    this.userId = event.data.id;
    if (this.userId === this.authService.userValue.id) {
      this.modalService.open('self-delete-modal');
    } else {
      this.modalService.open('delete-user-modal');
    }
  }

  submitDelete() {
    this.userService
      .delete(this.userId)
      .toPromise()
      .then(
        (value) => {
          this.getEntityDataLoader().refresh();
          this.alertService.showSuccess('Smazáno', 'Uživatel byl úspěšně odstraněn');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
