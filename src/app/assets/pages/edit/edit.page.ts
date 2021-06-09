import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asset, Validity } from '@core/shared/asset';
import { FindAssetInput } from '@core/graphql/asset';
import { AssetService } from '@core/shared/asset/asset.service';
import { Path } from '@core/enums';
import { CreateAssetInput, UpdateAssetInput } from '@core/graphql/asset';
import { AppAlertService } from '@core/shared/app-alert';
import { Style, StyleService, StyleType } from '@core/shared/style';
import { FindStyleInput } from '@core/graphql/style';

@Component({
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  asset: Asset;
  fileToUpload: File;
  fileToUploadType: string;
  fileToUploadUrl: any;
  animations: Style[];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assetService: AssetService,
    private alertService: AppAlertService,
    private styleService: StyleService
  ) {}

  ngOnInit(): void {
    this.asset = new Asset();
    this.asset.showTime = 20;

    this.asset.validity = new Validity();
    this.asset.validity.enabled = false;

    this.asset.animationIn = new Style();
    this.asset.animationOut = new Style();

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindAssetInput();
        input.id = params.get('id');
        this.assetService
          .findAsset(input)
          .result()
          .then(
            (value) => {
              this.asset = JSON.parse(JSON.stringify(value.data.findAsset));
              if (!this.asset.validity) {
                this.asset.validity = new Validity();
                this.asset.validity.enabled = false;
              }

              if (!this.asset.animationIn) {
                this.asset.animationIn = new Style();
              }

              if (!this.asset.animationOut) {
                this.asset.animationOut = new Style();
              }
            },
            (error) => {
              this.router.navigate([Path.Assets]);
            }
          );
      }
    });

    const findInput = new FindStyleInput();
    findInput.type = StyleType.ANIMATION;
    this.styleService
      .findAllStyles(findInput)
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

  async onSubmit() {
    this.loading = true;

    const input = this.asset.id ? new UpdateAssetInput() : new CreateAssetInput();
    input.name = this.asset.name;
    input.validityEnabled = this.asset.validity.enabled;
    input.validFrom = this.asset.validity.from;
    input.validTo = this.asset.validity.to;
    input.animationIn = this.asset.animationIn.id;
    input.animationOut = this.asset.animationOut.id;
    input.showTime = this.asset.showTime;

    const query = this.asset.id
      ? this.assetService.updateAsset(this.asset.id, input, this.fileToUpload)
      : this.assetService.createAsset(input, this.fileToUpload);
    query.toPromise().then(
      (value) => {
        this.loading = false;
        this.alertService.showSuccess('Uloženo', 'Asset byl úspěšně uložen');

        if (value.data.createAsset) {
          this.router.navigate([Path.Assets, value.data.createAsset.id]);
        }

        if (value.data.updateAsset) {
          this.router.navigate([Path.Assets, value.data.updateAsset.id]);
        }
      },
      (error) => {
        this.alertService.showError('Chyba ukládání', 'Při ukládání assetu se vyskytla chyba');
        this.loading = false;
      }
    );
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.asset.name = this.fileToUpload.name.split('.')[0];

    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) != null) {
      this.fileToUploadType = 'image';
    }

    if (mimeType.match(/video\/*/) != null) {
      this.fileToUploadType = 'video';
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (event) => {
      this.fileToUploadUrl = reader.result;
    };
  }

  changeAnimation(event, type) {
    switch (type) {
      case 'IN':
        this.asset.animationIn.id = event.target.value;
        break;
      case 'OUT':
        this.asset.animationOut.id = event.target.value;
        break;
    }
  }
}
