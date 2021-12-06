import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from '@core/enums';
import { AssetListService } from '@core/shared/assetlist';
import {
  FindAssetListInput,
  UpdateAssetListInput,
  CreateAssetListInput,
  FindStyleInput,
  UpdateAssetListMutation,
  CreateAssetListMutation,
  AssetList,
  Style,
  Validity
} from '@app/graphql';
import { AppAlertService } from '@core/shared/app-alert';
import { StyleService, StyleType } from '@core/shared/style';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';

@Component({
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  assetList: AssetList;
  animations: Observable<Style[]>;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assetListService: AssetListService,
    private alertService: AppAlertService,
    private styleService: StyleService
  ) {}

  ngOnInit(): void {
    this.assetList = {} as AssetList;
    this.assetList.enabled = true;
    this.assetList.validity = {} as Validity;
    this.assetList.validity.enabled = false;
    this.assetList.animationIn = {} as Style;
    this.assetList.animationOut = {} as Style;

    this.route.paramMap.subscribe((params) => {
      if (!params.has('type')) {
        this.router.navigate([Path.Dashboard]);
      } else {
        this.assetList.type = params.get('type');
      }

      if (params.has('id')) {
        const input: FindAssetListInput = {};
        input.id = params.get('id');
        this.assetListService
          .find(input)
          .result()
          .then(
            (value) => {
              this.assetList = Object.assign({} as AssetList, value.data.findAssetList);
              if (!this.assetList.validity) {
                this.assetList.validity = {} as Validity;
                this.assetList.validity.enabled = false;
              }

              if (!this.assetList.animationIn) {
                this.assetList.animationIn = {} as Style;
              }

              if (!this.assetList.animationOut) {
                this.assetList.animationOut = {} as Style;
              }
            },
            (error) => {
              this.router.navigate(['assetlists', params.get('type')]);
            }
          );
      }
    });

    const findInput: FindStyleInput = {};
    findInput.type = StyleType.ANIMATION;
    this.animations = this.styleService.findAll(findInput);
  }

  onSubmit() {
    this.loading = true;

    const input: UpdateAssetListInput|CreateAssetListInput = this.assetList.id ? {} as UpdateAssetListInput : {} as CreateAssetListInput;
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

    const query: Observable<FetchResult<UpdateAssetListMutation|CreateAssetListMutation>> = this.assetList.id
      ? this.assetListService.update(this.assetList.id, input as UpdateAssetListInput)
      : this.assetListService.create(input as CreateAssetListInput);
    query.toPromise().then(
      (value) => {
        this.loading = false;
        this.alertService.showSuccess('Uloženo', 'Asset list byl úspěšně uložen');

        if ('createAssetList' in value.data) {
          this.router.navigate([Path.AssetLists, value.data.createAssetList.id]);
        }

        if ('updateAssetList' in value.data) {
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
