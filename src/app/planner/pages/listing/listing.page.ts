import { Component, OnInit } from '@angular/core';
import { Path } from '@core/enums';
import { Router } from '@angular/router';
import { GroupService } from '@core/shared/group';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';
import { Entity, EntityComponent, ShowingPlace } from '@core/shared/entity';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage extends EntityComponent implements OnInit {
  public settings: Entity;

  private groupId: string;

  constructor(
    private router: Router,
    public groupService: GroupService,
    private modalService: ModalService,
    private alertService: AppAlertService
  ) {
    super(groupService);

    this.name('Group').icon(null);

    this.field('name').name('Název').showAt(ShowingPlace.DATAGRID);
  }

  ngOnInit(): void {}

  async createNew() {
    await this.router.navigate([Path.Planner, Path.PlannerCreate]);
  }

  async showDetail(id: string) {
    await this.router.navigate([Path.Planner, id]);
  }

  showDelete(id: string) {
    this.groupId = id;
    this.modalService.open('delete-group-modal');
  }

  submitDelete() {
    this.groupService
      .delete(this.groupId)
      .toPromise()
      .then(
        (value) => {
          this.getEntityDataLoader().refresh();
          this.alertService.showSuccess('Smazáno', 'Skupina byla úspěšně odstraněna');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
