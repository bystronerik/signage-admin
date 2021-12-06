import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CreateAlertInput,
  FindAlertInput,
  UpdateAlertInput,
  Style,
  Validity,
  Alert,
  UpdateAlertMutation, CreateAlertMutation
} from '@app/graphql';
import { AlertService } from '@core/shared/alert/alert.service';
import { Path } from '@core/enums';
import { AppAlertService } from '@core/shared/app-alert';
import { AlertPosition } from '@core/shared/alert/alert-position.enum';
import { AlertType } from '@core/shared/alert/alert-type.enum';
import { StyleService, StyleType } from '@core/shared/style';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';

@Component({
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  alert: Alert;
  positions = {};
  loading = false;
  activeStyles = {};
  styles: Style[];

  height: Style[];
  backgrounds: Style[];
  borders: Style[];
  textSize: Style[];
  textColor: Style[];
  textPosition: Style[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private appAlertService: AppAlertService,
    private styleService: StyleService
  ) {
    this.positions[AlertPosition.BOTTOM] = 'dole';
    this.positions[AlertPosition.MIDDLE] = 'uprostřed';
    this.positions[AlertPosition.TOP] = 'nahoře';
  }

  ngOnInit(): void {
    this.alert = {} as Alert;
    this.alert.validity = {} as Validity;
    this.alert.validity.enabled = false;

    this.alert.background = {} as Style;
    this.alert.borders = {} as Style;
    this.alert.height = {} as Style;
    this.alert.textPosition = {} as Style;
    this.alert.textColor = {} as Style;
    this.alert.textSize = {} as Style;
    this.alert.textSize = {} as Style;

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input: FindAlertInput = {};
        input.id = params.get('id');
        this.alertService
          .find(input)
          .result()
          .then(
            (value) => {
              this.alert = Object.assign({} as Alert, value.data.findAlert);
              if (!this.alert.validity) {
                this.alert.validity = {} as Validity;
                this.alert.validity.enabled = false;
              }

              if (!this.alert.background) {
                this.alert.background = {} as Style;
              }

              if (!this.alert.borders) {
                this.alert.borders = {} as Style;
              }

              if (!this.alert.height) {
                this.alert.height = {} as Style;
              }

              if (!this.alert.textPosition) {
                this.alert.textPosition = {} as Style;
              }

              if (!this.alert.textColor) {
                this.alert.textColor = {} as Style;
              }

              if (!this.alert.textSize) {
                this.alert.textSize = {} as Style;
              }

              this.activeStyles['background'] = this.alert.background.value;
              this.activeStyles['borders'] = this.alert.borders.value;
              this.activeStyles['height'] = this.alert.height.value;
              this.activeStyles['textPosition'] = this.alert.textPosition.value;
              this.activeStyles['textColor'] = this.alert.textColor.value;
              this.activeStyles['textSize'] = this.alert.textSize.value;
            },
            (error) => {
              this.router.navigate([Path.Alerts]);
            }
          );
      }
    });

    this.styleService.findAll({}).subscribe(
      (val) => {
        // this.animations = val.data.findAllStyles;
        this.backgrounds = val.filter((item) => item.type === StyleType.BACKGROUND);
        this.borders = val.filter((item) => item.type === StyleType.BORDER);
        this.textSize = val.filter((item) => item.type === StyleType.TEXT_SIZE);
        this.textColor = val.filter((item) => item.type === StyleType.TEXT_COLOR);
        this.textPosition = val.filter((item) => item.type === StyleType.TEXT_ALIGN);
        this.styles = val;
      },
      (error) => {
        this.appAlertService.showError('Chyba načítání', 'Při pokusu o načtení animací se objevila chyba');
      }
    );
  }

  async onSubmit() {
    this.loading = true;

    const input: UpdateAlertInput|CreateAlertInput = this.alert.id ? {} as UpdateAlertInput : {} as CreateAlertInput;
    input.name = this.alert.name;
    input.value = this.alert.value;
    input.type = AlertType.STANDALONE.toString();
    input.position = this.alert.position;
    input.validityEnabled = this.alert.validity.enabled;
    input.validFrom = this.alert.validity.from;
    input.validTo = this.alert.validity.to;
    input.background = this.alert.background.id;
    input.borders = this.alert.borders.id;
    input.height = this.alert.height.id;
    input.textColor = this.alert.textColor.id;
    input.textPosition = this.alert.textPosition.id;
    input.textSize = this.alert.textSize.id;
    input.running = this.alert.running;

    const query: Observable<FetchResult<UpdateAlertMutation|CreateAlertMutation>> = this.alert.id ? this.alertService.update(this.alert.id, input as UpdateAlertInput) : this.alertService.create(input as CreateAlertInput);
    query.toPromise().then(
      (value) => {
        this.loading = false;
        this.appAlertService.showSuccess('Uloženo', 'Informační zpráva byla úspěšně uložena');

        if ('createAlert' in value.data) {
          this.router.navigate([Path.Alerts, value.data.createAlert.id]);
        }

        if ('updateAlert' in value.data) {
          this.router.navigate([Path.Alerts, value.data.updateAlert.id]);
        }
      },
      (error) => {
        this.appAlertService.showError('Chyba ukládání', 'Při ukládání informační zprávy se vyskytla chyba');
        this.loading = false;
      }
    );
  }

  changePosition(event) {
    this.alert.position = event.target.value;
  }

  changeStyle(event, type) {
    this.alert[type].id = event.target.value;
    for (const item of this.styles) {
      if (this.alert[type].id === item.id) {
        this.activeStyles[type] = item.value;
      }
    }
  }

  getStylesClass() {
    return Object.values(this.activeStyles).join(' ');
  }
}
