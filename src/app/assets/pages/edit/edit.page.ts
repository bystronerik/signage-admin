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
import { Alert, AlertService } from '@core/shared/alert';
import { FindAlertInput } from '@core/graphql/alert';
import { Directory, DirectoryService } from '@core/shared/directory';
import { FindDirectoryInput } from '@core/graphql/directory';

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
    this.asset = new Asset();
    this.asset.showTime = 20;

    this.asset.validity = new Validity();
    this.asset.validity.enabled = false;

    this.asset.animationIn = new Style();
    this.asset.animationOut = new Style();

    this.asset.alert = new Alert();
    this.asset.directory = new Directory();

    const directoryInput = new FindDirectoryInput();
    directoryInput.name = '/';
    directoryInput.parentDirectory = 'root';
    this.directoryService
      .find(directoryInput)
      .result()
      .then((val) => {
        this.rootDirectory = val.data.findDirectory;
      });

    this.directoryService.findAll(new FindDirectoryInput()).subscribe((directories) => {
      this.directories = directories;
    });

    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindAssetInput();
        input.id = params.get('id');
        this.assetService
          .find(input)
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

              if (!this.asset.alert) {
                this.asset.alert = new Alert();
              }

              if (!this.asset.directory) {
                this.asset.directory = new Directory();
                this.asset.directory.id = this.rootDirectory.id;
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
    this.styleService.findAll(findInput).subscribe(
      (styles) => {
        this.animations = styles as Style[];
      },
      (error) => {
        this.appAlertService.showError('Chyba načítání', 'Při pokusu o načtení animací se objevila chyba');
      }
    );

    this.alertService.findAll(new FindAlertInput()).subscribe(
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

    const input = this.asset.id ? new UpdateAssetInput() : new CreateAssetInput();
    input.name = this.asset.name;
    input.validityEnabled = this.asset.validity.enabled;
    input.validFrom = this.asset.validity.from;
    input.validTo = this.asset.validity.to;
    input.animationIn = this.asset.animationIn.id;
    input.animationOut = this.asset.animationOut.id;
    input.showTime = this.asset.showTime;
    input.alert = this.asset.alert.id;
    input.directory = this.asset.directory.id;

    const query = this.asset.id
      ? this.assetService.update(this.asset.id, input, this.fileToUpload)
      : this.assetService.create(input, this.fileToUpload);
    query.toPromise().then(
      (value) => {
        this.loading = false;
        this.appAlertService.showSuccess('Uloženo', 'Asset byl úspěšně uložen');

        if (value.data.createAsset) {
          this.router.navigate([Path.Assets, value.data.createAsset.id]);
        }

        if (value.data.updateAsset) {
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
