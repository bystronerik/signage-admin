import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/+auth';
import { Path } from '@core/enums';
import { ModalService } from '@core/services';
import { FindStyleInput } from '@core/graphql/style';
import { Style, StyleService } from '@core/shared/style';
import { AppAlertService } from '@core/shared/app-alert';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  style: Style;
  styles: Style[];
  loading = false;

  success = false;
  error: string;

  private styleId: string;

  public settings;

  constructor(
    private router: Router,
    public authService: AuthService,
    private styleService: StyleService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private stylesService: StyleService,
    private alertService: AppAlertService
  ) {}

  ngOnInit(): void {
    this.style = new Style();

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindStyleInput();
        input.id = params.get('id');
        this.styleService
          .findStyle(input)
          .result()
          .then(
            (value) => {
              this.style = value.data.findStyle;
            },
            (error) => {
              if (params.has('type')) {
                this.router.navigate(['styles', params.get('type')]);
              } else {
                this.router.navigate([Path.Dashboard]);
              }
            }
          );
      }
    });
  }

  showDelete() {
    this.modalService.open('delete-style-modal');
  }

  submitDelete() {
    this.styleService
      .deleteStyle(this.style.id)
      .toPromise()
      .then(
        (value) => {
          this.router.navigate(['styles', this.style.type]);
          this.alertService.showSuccess('Smazáno', 'Vzhled byl úspěšně smazán');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }

  valueTypeName(position) {
    switch (position) {
      case 'PURE_CSS':
        return 'čísté CSS';
      case 'TAILWINDCSS':
        return 'TailwindCSS třídy';
      case 'ANIMATECSS':
        return 'Animate.css třídy';
    }
  }

  typeName(position) {
    switch (position) {
      case 'ANIMATION':
        return 'animace';
      case 'BORDER':
        return 'ohraničení';
      case 'BACKGROUND':
        return 'pozadí';
      case 'HEIGHT':
        return 'výška';
      case 'TEXT_COLOR':
        return 'barva textu';
      case 'TEXT_SIZE':
        return 'velikost textu';
      case 'TEXT_ALIGN':
        return 'zarovnání textu';
    }
  }
}
