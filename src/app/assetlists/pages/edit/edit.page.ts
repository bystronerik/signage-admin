import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from '@core/enums';
import { AssetList, AssetListService } from '@core/shared/assetlist';
import { FindAssetListInput } from '@core/graphql/assetlist/find-assetlist-input.model';
import { UpdateAssetListInput } from '@core/graphql/assetlist/update-assetlist-input.model';
import { CreateAssetListInput } from '@core/graphql/assetlist/create-assetlist-input.model';
import { AppAlertService } from '@core/shared/app-alert';
import { FindStyleInput } from '@core/graphql/style';
import { Style, StyleService, StyleType } from '@core/shared/style';
import { Validity } from '@core/shared/asset';

@Component({
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  assetList: AssetList;
  animations: Style[];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assetListService: AssetListService,
    private alertService: AppAlertService,
    private styleService: StyleService
  ) {}

  ngOnInit(): void {
    this.assetList = new AssetList();
    this.assetList.enabled = true;
    this.assetList.validity = new Validity();
    this.assetList.validity.enabled = false;
    this.assetList.animationIn = new Style();
    this.assetList.animationOut = new Style();

    this.route.paramMap.subscribe((params) => {
      if (!params.has('type')) {
        this.router.navigate([Path.Dashboard]);
      } else {
        this.assetList.type = params.get('type');
      }

      if (params.has('id')) {
        const input = new FindAssetListInput();
        input.id = params.get('id');
        this.assetListService
          .find(input)
          .result()
          .then(
            (value) => {
              this.assetList = JSON.parse(JSON.stringify(value.data.findAssetList));
              if (!this.assetList.validity) {
                this.assetList.validity = new Validity();
                this.assetList.validity.enabled = false;
              }

              if (!this.assetList.animationIn) {
                this.assetList.animationIn = new Style();
              }

              if (!this.assetList.animationOut) {
                this.assetList.animationOut = new Style();
              }
            },
            (error) => {
              this.router.navigate(['assetlists', params.get('type')]);
            }
          );
      }
    });

    const findInput = new FindStyleInput();
    findInput.type = StyleType.ANIMATION;
    this.styleService
      .find(findInput)
      .result()
      .then(
        (val) => {
          this.animations = val.data.findAllStyles;
        },
        (error) => {
          this.alertService.showError('Chyba načítání', 'Při pokusu o načtení animací se objevila chyba');
        }
      );
  }

  onSubmit() {
    this.loading = true;

    const input = this.assetList.id ? new UpdateAssetListInput() : new CreateAssetListInput();
    input.name = this.assetList.name;
    input.type = this.assetList.type;

    if (this.assetList.animationIn) {
      input.animationIn = this.assetList.animationIn.id;
    }

    if (this.assetList.animationOut) {
      input.animationOut = this.assetList.animationOut.id;
    }

    input.validityEnabled = this.assetList.validity.enabled;
    input.validFrom = this.assetList.validity.from;
    input.validTo = this.assetList.validity.to;
    input.prioritized = this.assetList.prioritized;
    input.enabled = this.assetList.enabled !== undefined ? this.assetList.enabled : true;

    const query = this.assetList.id
      ? this.assetListService.update(this.assetList.id, input)
      : this.assetListService.create(input);
    query.toPromise().then(
      (value) => {
        this.loading = false;
        this.alertService.showSuccess('Uloženo', 'Asset list byl úspěšně uložen');

        if (value.data.createAssetList) {
          this.router.navigate([Path.AssetLists, value.data.updateAssetList.id]);
        }

        if (value.data.updateAssetList) {
          this.router.navigate([Path.AssetLists, value.data.updateAssetList.id]);
        }
      },
      (error) => {
        this.alertService.showError('Chyba ukládání', 'Při ukládání asset listu se vyskytla chyba');
        this.loading = false;
      }
    );
  }

  changeAnimation(event, type) {
    switch (type) {
      case 'IN':
        this.assetList.animationIn.id = event.target.value;
        break;
      case 'OUT':
        this.assetList.animationOut.id = event.target.value;
        break;
    }
  }
}
