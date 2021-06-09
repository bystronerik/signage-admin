import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from '@core/enums';
import { StyleDataSource, StyleService } from '@core/shared/style';
import { ModalService } from '@core/services';
import { AppAlertService } from '@core/shared/app-alert';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  public settings;
  public source: StyleDataSource;

  private styleId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    styleDataSource: StyleDataSource,
    private modalService: ModalService,
    private styleService: StyleService,
    private alertService: AppAlertService
  ) {
    this.source = styleDataSource;
    this.settings = {
      columns: {
        name: {
          title: 'Název',
        },
        type: {
          title: 'Typ',
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
    await this.router.navigate([Path.StylesCreate], { relativeTo: this.route });
  }

  async showDetail(event) {
    await this.router.navigate([event.data.id], { relativeTo: this.route });
  }

  showDelete(event) {
    this.styleId = event.data.id;
    this.modalService.open('delete-style-modal');
  }

  submitDelete() {
    this.styleService
      .deleteStyle(this.styleId)
      .toPromise()
      .then(
        (value) => {
          this.source.refresh();
          this.alertService.showSuccess('Smazáno', 'Vzhledová konfigurace byla úspěšně smazána');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
