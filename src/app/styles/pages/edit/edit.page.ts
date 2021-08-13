import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Style, StyleService, StyleType, StyleValueType } from '@core/shared/style';
import { FindStyleInput } from '@core/graphql/style/find-style-input.model';
import { UpdateStyleInput } from '@core/graphql/style/update-style-input.model';
import { CreateStyleInput } from '@core/graphql/style/create-style-input.model';
import { AppAlertService } from '@core/shared/app-alert';
import { Path } from '@core/enums';

@Component({
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  style: Style;
  loading = false;

  types = {};
  valueTypes = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private styleService: StyleService,
    private alertService: AppAlertService
  ) {
    this.valueTypes[StyleValueType.PURE_CSS] = 'čísté CSS';
    this.valueTypes[StyleValueType.TAILWINDCSS] = 'TailwindCSS třídy';
    this.valueTypes[StyleValueType.ANIMATECSS] = 'Animate.css třídy';

    this.types[StyleType.ANIMATION] = 'animace';
    this.types[StyleType.BACKGROUND] = 'pozadí';
    this.types[StyleType.HEIGHT] = 'výška';
    this.types[StyleType.BORDER] = 'ohraničení';
    this.types[StyleType.TEXT_ALIGN] = 'zarovnání textu';
    this.types[StyleType.TEXT_COLOR] = 'barva textu';
    this.types[StyleType.TEXT_SIZE] = 'velikost textu';
  }

  ngOnInit(): void {
    this.style = new Style();
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindStyleInput();
        input.id = params.get('id');
        this.styleService
          .find(input)
          .result()
          .then(
            (value) => {
              this.style = Object.assign(new Style(), value.data.findStyle);
            },
            (error) => {
              this.router.navigate(['styles']);
            }
          );
      }
    });
  }

  onSubmit() {
    this.loading = true;

    const input = this.style.id ? new UpdateStyleInput() : new CreateStyleInput();
    input.name = this.style.name;
    input.type = this.style.type;
    input.value = this.style.value;
    input.valueType = this.style.valueType;

    const query = this.style.id ? this.styleService.update(this.style.id, input) : this.styleService.create(input);
    query.toPromise().then(
      (value) => {
        this.loading = false;
        this.alertService.showSuccess('Uloženo', 'Vzhled byl úspěšně uložen');

        if (value.data.createStyle) {
          this.router.navigate([Path.Styles, value.data.createStyle.id]);
        }

        if (value.data.updateStyle) {
          this.router.navigate([Path.Styles, value.data.updateStyle.id]);
        }
      },
      (error) => {
        this.alertService.showError('Chyba ukládání', 'Při ukládání vzhledu se vyskytla chyba');
        this.loading = false;
      }
    );
  }

  changeType(event) {
    this.style.type = event.target.value;
  }

  changeValueType(event) {
    this.style.valueType = event.target.value;
  }
}
