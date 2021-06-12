import { Component, OnInit } from '@angular/core';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Path } from '@core/enums';
import { Router } from '@angular/router';
import { GroupDataSource, GroupService } from '@core/shared/group';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  public settings;
  public source: DataSource;

  private groupId: string;

  constructor(
    private router: Router,
    groupDataSource: GroupDataSource,
    private groupService: GroupService,
    private modalService: ModalService,
    private alertService: AppAlertService
  ) {
    this.source = groupDataSource;
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
      },
      attr: {
        class: 'datagrid',
      },
      add: {
        addButtonContent: 'Vytvořit skupinu',
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
    await this.router.navigate([Path.Planner, Path.PlannerCreate]);
  }

  async showDetail(event) {
    await this.router.navigate([Path.Planner, event.data.id]);
  }

  showDelete(event) {
    this.groupId = event.data.id;
    this.modalService.open('delete-group-modal');
  }

  submitDelete() {
    this.groupService
      .deleteGroup(this.groupId)
      .toPromise()
      .then(
        (value) => {
          this.source.refresh();
          this.alertService.showSuccess('Smazáno', 'Skupina byla úspěšně odstraněna');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
