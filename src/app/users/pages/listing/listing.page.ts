import { Component, OnInit } from '@angular/core';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Path } from '@core/enums';
import { Router } from '@angular/router';
import { UserDataSource, UserService } from '@core/shared/user';
import { ModalService } from '@core/services';
import { AuthService } from '@app/+auth';
import { AppAlertService } from '@core/shared/app-alert';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  public settings;
  public source: DataSource;

  private userId: string;

  constructor(
    private router: Router,
    userDataSource: UserDataSource,
    private userService: UserService,
    private modalService: ModalService,
    private authService: AuthService,
    private alertService: AppAlertService
  ) {
    this.source = userDataSource;
    this.settings = {
      columns: {
        username: {
          title: 'Uživatelské jméno',
        },
        role: {
          title: 'Role',
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
        addButtonContent: 'Vytvořit',
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
      .deleteUser(this.userId)
      .toPromise()
      .then(
        (value) => {
          this.source.refresh();
          this.alertService.showSuccess('Smazáno', 'Uživatel byl úspěšně odstraněn');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
