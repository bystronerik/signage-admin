import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from '@core/shared/alert';
import { CreateAlertInput, FindAlertInput, UpdateAlertInput } from '@core/graphql/alert';
import { AlertService } from '@core/shared/alert/alert.service';
import { Path } from '@core/enums';
import { AppAlertService } from '@core/shared/app-alert';
import { Validity } from '@core/shared/asset';
import { AlertPosition } from '@core/shared/alert/alert-position.enum';
import { AlertType } from '@core/shared/alert/alert-type.enum';
import { Style, StyleService, StyleType } from '@core/shared/style';
import { FindStyleInput } from '@core/graphql/style';

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
    this.alert = new Alert();
    this.alert.validity = new Validity();
    this.alert.validity.enabled = false;

    this.alert.background = new Style();
    this.alert.borders = new Style();
    this.alert.height = new Style();
    this.alert.textPosition = new Style();
    this.alert.textColor = new Style();
    this.alert.textSize = new Style();
    this.alert.textSize = new Style();

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindAlertInput();
        input.id = params.get('id');
        this.alertService
          .find(input)
          .result()
          .then(
            (value) => {
              this.alert = JSON.parse(JSON.stringify(value.data.findAlert));
              if (!this.alert.validity) {
                this.alert.validity = new Validity();
                this.alert.validity.enabled = false;
              }

              if (!this.alert.background) {
                this.alert.background = new Style();
              }

              if (!this.alert.borders) {
                this.alert.borders = new Style();
              }

              if (!this.alert.height) {
                this.alert.height = new Style();
              }

              if (!this.alert.textPosition) {
                this.alert.textPosition = new Style();
              }

              if (!this.alert.textColor) {
                this.alert.textColor = new Style();
              }

              if (!this.alert.textSize) {
                this.alert.textSize = new Style();
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

    this.styleService.findAll(new FindStyleInput()).subscribe(
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

    const input = this.alert.id ? new UpdateAlertInput() : new CreateAlertInput();
    input.name = this.alert.name;
    input.value = this.alert.value;
    input.type = AlertType.STANDALONE;
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

    const query = this.alert.id ? this.alertService.update(this.alert.id, input) : this.alertService.create(input);
    query.toPromise().then(
      (value) => {
        this.loading = false;
        this.appAlertService.showSuccess('Uloženo', 'Informační zpráva byla úspěšně uložena');

        if (value.data.createAlert) {
          this.router.navigate([Path.Alerts, value.data.createAlert.id]);
        }

        if (value.data.updateAlert) {
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
