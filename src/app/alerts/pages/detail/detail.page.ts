import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/+auth';
import { Alert, AlertService } from '@core/shared/alert';
import { FindAlertInput } from '@core/graphql/alert';
import { Path } from '@core/enums';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  alert: Alert;

  public settings;

  constructor(
    private router: Router,
    public authService: AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private appAlertService: AppAlertService
  ) {}

  ngOnInit(): void {
    this.alert = new Alert();

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindAlertInput();
        input.id = params.get('id');
        this.alertService
          .findAlert(input)
          .result()
          .then(
            (value) => {
              this.alert = value.data.findAlert;
            },
            (error) => {
              this.router.navigate([Path.Alerts]);
            }
          );
      }
    });
  }

  showDelete() {
    this.modalService.open('delete-alert-modal');
  }

  submitDelete() {
    this.alertService
      .deleteAlert(this.alert.id)
      .toPromise()
      .then(
        (value) => {
          this.router.navigate([Path.Alerts]);
          this.appAlertService.showSuccess('Smazáno', 'Informační zpráva byl úspěšně smazán');
        },
        (error) => {
          this.appAlertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }

  positionName(position) {
    switch (position) {
      case 'BOTTOM':
        return 'dole';
      case 'MIDDLE':
        return 'uprostřed';
      case 'TOP':
        return 'nahoře';
    }
  }

  typeName(position) {
    switch (position) {
      case 'STANDALONE':
        return 'samostatný';
      case 'BOUND':
        return 'připojen k položce';
    }
  }
}
