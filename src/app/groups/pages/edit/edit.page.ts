import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '@core/shared/group';
import { GroupService } from '@core/shared/group/group.service';
import { FindGroupInput } from '@core/graphql/group';
import { Path } from '@core/enums';
import { CreateGroupInput, UpdateGroupInput } from '@core/graphql/group';
import { AppAlertService } from '@core/shared/app-alert';
import { Alert, AlertService } from '@core/shared/alert';
import { FindAlertInput } from '@core/graphql/alert';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  group: Group;
  alerts: Observable<Alert[]>;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private alertService: AlertService,
    private appAlertService: AppAlertService
  ) {}

  ngOnInit(): void {
    this.group = new Group();
    this.group.alert = new Alert();

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindGroupInput();
        input.id = params.get('id');
        this.groupService
          .find(input)
          .result()
          .then(
            (value) => {
              this.group = JSON.parse(JSON.stringify(value.data.findGroup));

              if (!this.group.alert) {
                this.group.alert = new Alert();
              }
            },
            (error) => {
              this.router.navigate([Path.Groups]);
            }
          );
      }
    });

    this.alerts = this.alertService.findAll(new FindAlertInput());
  }

  onSubmit() {
    this.loading = true;

    const input = this.group.id ? new UpdateGroupInput() : new CreateGroupInput();
    input.name = this.group.name;
    input.alert = this.group.alert.id;

    const query = this.group.id ? this.groupService.update(this.group.id, input) : this.groupService.create(input);
    query.toPromise().then(
      (value) => {
        this.loading = false;
        this.appAlertService.showSuccess('Uloženo', 'Skupina byla úspěšně uložena');

        if (value.data.createGroup) {
          this.router.navigate([Path.Groups, value.data.createGroup.id]);
        }

        if (value.data.updateGroup) {
          this.router.navigate([Path.Groups, value.data.updateGroup.id]);
        }
      },
      (error) => {
        this.appAlertService.showError('Chyba ukládání', 'Při ukládání skupiny se vyskytla chyba');
        this.loading = false;
      }
    );
  }

  changeAlert(event) {
    this.group.alert.id = event.target.value;
  }
}
