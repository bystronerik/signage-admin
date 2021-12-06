import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '@core/shared/group/group.service';
import {
  CreateGroupInput,
  UpdateGroupInput,
  Alert,
  FindGroupInput,
  Group,
  UpdateGroupMutation,
  CreateGroupMutation
} from '@app/graphql';
import { Path } from '@core/enums';
import { AppAlertService } from '@core/shared/app-alert';
import { AlertService } from '@core/shared/alert';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';

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
    this.group = {} as Group;
    this.group.alert = {} as Alert;

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input: FindGroupInput = {};
        input.id = params.get('id');
        this.groupService
          .find(input)
          .result()
          .then(
            (value) => {
              this.group = Object.assign({} as Group, value.data.findGroup);

              if (!this.group.alert) {
                this.group.alert = {} as Alert;
              }
            },
            (error) => {
              this.router.navigate([Path.Planner]);
            }
          );
      }
    });

    this.alerts = this.alertService.findAll({}) as Observable<Array<Alert>>;
  }

  onSubmit() {
    this.loading = true;

    const input: UpdateGroupInput|CreateGroupInput = this.group.id ? {} as UpdateGroupInput : {} as CreateGroupInput;
    input.name = this.group.name;
    input.alert = this.group.alert.id;

    const query: Observable<FetchResult<CreateGroupMutation|UpdateGroupMutation>> = this.group.id ? this.groupService.update(this.group.id, input as UpdateGroupInput) : this.groupService.create(input as CreateGroupInput);
    query.toPromise().then(
      (value) => {
        this.loading = false;
        this.appAlertService.showSuccess('Uloženo', 'Skupina byla úspěšně uložena');

        if ('createGroup' in value.data) {
          this.router.navigate([Path.Planner, value.data.createGroup.id]);
        }

        if ('updateGroup' in value.data) {
          this.router.navigate([Path.Planner, value.data.updateGroup.id]);
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
