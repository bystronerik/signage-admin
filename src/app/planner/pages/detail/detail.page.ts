import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, GroupPlaylistsDataSource, GroupService } from '@core/shared/group';
import { AuthService } from '@app/+auth';
import { FindGroupInput, UpdateGroupInput } from '@core/graphql/group';
import { Path } from '@core/enums';
import { ModalService } from '@core/services';
import { AssetList, AssetListService } from '@core/shared/assetlist';
import { FindAssetListInput } from '@core/graphql/assetlist/find-assetlist-input.model';
import { AppAlertService } from '@core/shared/app-alert';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DetailPage implements OnInit {
  group: Group;
  selected: AssetList;
  assetLists: AssetList[];
  loading = false;

  private assetListId: string;

  public settings;
  public source: GroupPlaylistsDataSource;

  constructor(
    private router: Router,
    public authService: AuthService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private assetListService: AssetListService,
    private groupPlaylistsDataSource: GroupPlaylistsDataSource,
    private alertService: AppAlertService
  ) {
    this.source = groupPlaylistsDataSource;
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
        edit: false,
      },
      attr: {
        class: 'datagrid',
      },
      add: {
        addButtonContent: 'Přidat',
      },
      edit: {
        editButtonContent: 'Detail',
      },
      delete: {
        deleteButtonContent: 'Odstranit',
      },
    };
  }

  ngOnInit(): void {
    this.group = new Group();
    this.selected = new AssetList();

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindGroupInput();
        input.id = params.get('id');
        this.source.groupId = input.id;
        this.groupService
          .findGroup(input)
          .result()
          .then(
            (value) => {
              this.group = value.data.findGroup;
              this.source.groupId = this.group.id;

              this.assetListService
                .findAllAssetLists(new FindAssetListInput())
                .result()
                .then(
                  (val) => {
                    this.assetLists = val.data.findAllAssetLists;
                  },
                  (error) => {
                    this.alertService.showError('Chyba načítání', 'Při pokusu o načtení asset listů se objevila chyba');
                  }
                );
            },
            (error) => {
              this.router.navigate([Path.Planner]);
            }
          );
      }
    });
  }

  addAssetList() {
    this.modalService.open('add-assetlist-modal');
  }

  removeAssetList(event) {
    this.assetListId = event.data.id;
  }

  submitAssetListDelete() {
    this.loading = true;

    const input = new UpdateGroupInput();

    input.assetLists = this.group.assetLists.map((value) => value.id);
    delete input.assetLists[this.assetListId];

    this.groupService
      .updateGroup(this.group.id, input)
      .toPromise()
      .then(
        (value) => {
          this.loading = false;
          this.source.refresh();
          this.closeModal();
          this.alertService.showSuccess('Asset list odebrán', 'Asset list byl úspěšně odebrán ze skupiny');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o uložení se vyskytla chyba');
        }
      );
  }

  closeModal() {
    this.modalService.close('add-assetlist-modal');
  }

  submitModal() {
    this.loading = true;

    const input = new UpdateGroupInput();

    input.assetLists = this.group.assetLists.map((value) => value.id);
    input.assetLists.push(this.selected.id);

    this.groupService
      .updateGroup(this.group.id, input)
      .toPromise()
      .then(
        (value) => {
          this.loading = false;
          this.source.refresh();
          this.closeModal();
          this.alertService.showSuccess('Asset list přiřazen', 'Asset list byl úspěšně přiřazen ke skupině');
        },
        (error) => {
          this.loading = false;
          this.alertService.showError('Chyba ukládání', 'Při pokusu o uložení se vyskytla chyba');
        }
      );
  }

  changeAssetList(event) {
    this.selected.id = event.target.value;
  }

  showDelete() {
    this.modalService.open('delete-group-modal');
  }

  submitDelete() {
    this.groupService
      .deleteGroup(this.group.id)
      .toPromise()
      .then(
        (value) => {
          this.router.navigate([Path.Planner]);
          this.alertService.showSuccess('Smazáno', 'Skupina byla úspěšně smazán');
        },
        (error) => {
          this.alertService.showError('Chyba ukládání', 'Při pokusu o smazání se vyskytla chyba');
        }
      );
  }
}
