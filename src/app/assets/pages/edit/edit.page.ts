import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Validity,
  FindAssetInput,
  CreateAssetInput,
  UpdateAssetInput,
  FindStyleInput,
  FindDirectoryInput,
  Style,
  Alert,
  Asset,
  Directory,
  UpdateAssetMutation, CreateAssetMutation
} from '@app/graphql';
import { AssetService } from '@core/shared/asset/asset.service';
import { Path } from '@core/enums';
import { AppAlertService } from '@core/shared/app-alert';
import { StyleService, StyleType } from '@core/shared/style';
import { AlertService } from '@core/shared/alert';
import { DirectoryService } from '@core/shared/directory';
import { FetchResult } from '@apollo/client/core';
import { Observable } from 'rxjs';

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
  alerts: Alert[];
  loading = false;

  rootDirectory: Directory;
  directories: Directory[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assetService: AssetService,
    private appAlertService: AppAlertService,
    private styleService: StyleService,
    private alertService: AlertService,
    private directoryService: DirectoryService
  ) {}

  ngOnInit(): void {
    this.asset = {} as Asset;
    this.asset.showTime = 20;

    this.asset.validity = {} as Validity;
    this.asset.validity.enabled = false;

    this.asset.animationIn = {} as Style;
    this.asset.animationOut = {} as Style;

    this.asset.alert = {} as Alert;
    this.asset.directory = {} as Directory;

    const directoryInput: FindDirectoryInput = {};
    directoryInput.name = '/';
    directoryInput.parentDirectory = 'root';
    this.directoryService
      .find(directoryInput)
      .result()
      .then((val) => {
        this.rootDirectory = val.data.findDirectory;
      });

    this.directoryService.findAll({}).subscribe((directories) => {
      this.directories = directories;
    });

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input: FindAssetInput = {};
        input.id = params.get('id');
        this.assetService
          .find(input)
          .result()
          .then(
            (value) => {
              this.asset = Object.assign({} as Asset, value.data.findAsset);
              if (!this.asset.validity) {
                this.asset.validity = {} as Validity;
                this.asset.validity.enabled = false;
              }

              if (!this.asset.animationIn) {
                this.asset.animationIn = {} as Style;
              }

              if (!this.asset.animationOut) {
                this.asset.animationOut = {} as Style;
              }

              if (!this.asset.alert) {
                this.asset.alert = {} as Alert;
              }

              if (!this.asset.directory) {
                this.asset.directory = {} as Directory;
                this.asset.directory.id = this.rootDirectory.id;
              }
            },
            (error) => {
              this.router.navigate([Path.Assets]);
            }
          );
      }
    });

    const findInput: FindStyleInput = {};
    findInput.type = StyleType.ANIMATION;
    this.styleService.findAll(findInput).subscribe(
      (styles) => {
        this.animations = styles as Style[];
      },
      (error) => {
        this.appAlertService.showError('Chyba načítání', 'Při pokusu o načtení animací se objevila chyba');
      }
    );

    this.alertService.findAll({}).subscribe(
      (alerts) => {
        this.alerts = alerts as Alert[];
      },
      (error) => {
        this.appAlertService.showError('Chyba načítání', 'Při pokusu o načtení informačních zpráv se objevila chyba');
      }
    );
  }

  async onSubmit() {
    this.loading = true;

    const input: UpdateAssetInput|CreateAssetInput = this.asset.id ? {} as UpdateAssetInput : {} as CreateAssetInput;
    input.name = this.asset.name;
    input.validityEnabled = this.asset.validity.enabled;
    input.validFrom = this.asset.validity.from;
    input.validTo = this.asset.validity.to;
    input.animationIn = this.asset.animationIn.id;
    input.animationOut = this.asset.animationOut.id;
    input.showTime = this.asset.showTime;
    input.alert = this.asset.alert.id;
    input.directory = this.asset.directory.id;

    const query: Observable<FetchResult<UpdateAssetMutation | CreateAssetMutation>> = this.asset.id
      ? this.assetService.update(this.asset.id, input as UpdateAssetInput, this.fileToUpload)
      : this.assetService.create(input as CreateAssetInput, this.fileToUpload);
    query.toPromise().then(
      (value) => {
        this.loading = false;
        this.appAlertService.showSuccess('Uloženo', 'Asset byl úspěšně uložen');

        if ('createAsset' in value.data) {
          this.router.navigate([Path.Assets, value.data.createAsset.id]);
        }

        if ('updateAsset' in value.data) {
          this.router.navigate([Path.Assets, value.data.updateAsset.id]);
        }
      },
      (error) => {
        console.log(error);
        this.appAlertService.showError('Chyba ukládání', 'Při ukládání assetu se vyskytla chyba');
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

  changeAlert(event) {
    this.asset.alert.id = event.target.value;
  }

  changeDirectory(event) {
    this.asset.directory.id = event.target.value;
  }
}
