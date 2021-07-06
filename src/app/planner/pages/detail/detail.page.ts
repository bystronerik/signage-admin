import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, GroupService } from '@core/shared/group';
import { AuthService } from '@app/+auth';
import { FindGroupInput, UpdateGroupInput } from '@core/graphql/group';
import { Path } from '@core/enums';
import { ModalService } from '@core/services';
import { AssetList, AssetListService } from '@core/shared/assetlist';
import { FindAssetListInput } from '@core/graphql/assetlist/find-assetlist-input.model';
import { AppAlertService } from '@core/shared/app-alert';
import { environment } from '@environments/environment';
import { Entity, ShowingPlace } from '@core/shared/entity';
import { EntityDataLoader } from '@core/shared/entity/entity.data-loader';
import { EntityFieldBuilder } from '@core/shared/entity/entity-field.builder';
import { Observable, Observer } from 'rxjs';
import { FindInput } from '@core/graphql/findinput';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DetailPage implements OnInit {
  public playerUrl: string;

  group: Group;
  selected: AssetList;
  assetLists: AssetList[];
  loading = false;

  entity: Entity;
  dataLoader: EntityDataLoader;

  private observer: Observer<AssetList[]>;
  private assetListId: string;

  constructor(
    private router: Router,
    public authService: AuthService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private assetListService: AssetListService,
    private alertService: AppAlertService
  ) {
    this.entity = new Entity();
    this.entity.name = 'Playlisty';
    this.entity.fields.push(new EntityFieldBuilder('name').name('Název').showAt(ShowingPlace.DATAGRID).result());

    const source = new Observable<AssetList[]>((val) => {
      this.observer = val;
    });

    this.dataLoader = new (class extends EntityDataLoader {
      public loadItems(input: FindInput): Observable<any> {
        return source;
      }
    })();
  }

  ngOnInit(): void {
    this.group = new Group();
    this.selected = new AssetList();

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindGroupInput();
        input.id = params.get('id');
        this.groupService
          .find(input)
          .result()
          .then(
            (value) => {
              this.group = value.data.findGroup;
              this.observer.next(this.group.assetLists);
              this.playerUrl = environment.playersUrl + '?token=GID-' + this.group.id;

              const assetListInput = new FindAssetListInput();
              assetListInput.type = 'playlist';

              this.assetListService.findAll(assetListInput).subscribe((assetLists) => {
                this.assetLists = assetLists;
              });
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

  removeAssetList(id: string) {
    this.assetListId = id;
    this.modalService.open('delete-assetassign-modal');
  }

  submitAssetListDelete() {
    this.loading = true;

    const input = new UpdateGroupInput();

    input.assetLists = {
      mergeStrategy: 'REDUCE',
      content: [this.assetListId],
    };

    this.groupService
      .update(this.group.id, input)
      .toPromise()
      .then(
        (value) => {
          this.loading = false;
          this.dataLoader.refresh();
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

    input.assetLists = {
      mergeStrategy: 'EXTEND',
      content: [this.selected.id],
    };

    this.groupService
      .update(this.group.id, input)
      .toPromise()
      .then(
        (value) => {
          this.loading = false;
          this.dataLoader.refresh();
          this.closeModal();
          this.alertService.showSuccess('Asset list přiřazen', 'Asset list byl úspěšně přiřazen ke skupině');
        },
        (error) => {
          this.loading = false;
          this.alertService.showError('Chyba ukládání', 'Při pokusu o uložení se vyskytla chyba');
        }
      );
  }

  showAssetList(type: string, id: string) {
    this.router.navigate(['assetlists', type, id]);
  }

  changeAssetList(event) {
    this.selected.id = event.target.value;
  }

  showDelete() {
    this.modalService.open('delete-group-modal');
  }

  submitDelete() {
    this.groupService
      .delete(this.group.id)
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
