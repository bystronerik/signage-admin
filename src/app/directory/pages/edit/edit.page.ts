import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '@core/shared/directory';
import { Path } from '@core/enums';
import { AppAlertService } from '@core/shared/app-alert';
import { Router } from '@angular/router';
import {
  CreateDirectoryInput,
  CreateDirectoryMutation,
  UpdateDirectoryInput,
  UpdateDirectoryMutation,
  Directory,
} from '@app/graphql';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';

@Component({
  selector: 'app-edit.page',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  loading = false;
  directory: Directory;

  constructor(
    private directoryService: DirectoryService,
    private appAlertService: AppAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.directory = {} as Directory;
    this.directory.parentDirectory = {} as Directory;
    this.directory.parentDirectory.id = '60d956342016642a5c3845a1';
  }

  async onSubmit() {
    this.loading = true;

    const input: UpdateDirectoryInput|CreateDirectoryInput = this.directory.id ? {} as UpdateDirectoryInput : {} as CreateDirectoryInput;
    input.name = this.directory.name;
    input.parentDirectory = this.directory.parentDirectory.id;

    const query: Observable<FetchResult<UpdateDirectoryMutation | CreateDirectoryMutation>> = this.directory.id
      ? this.directoryService.update(this.directory.id, input as UpdateDirectoryInput)
      : this.directoryService.create(input as CreateDirectoryInput);

    query.toPromise().then(
      (value) => {
        this.loading = false;
        this.appAlertService.showSuccess('Uloženo', 'Podsložka byla úspěšně uložen');

        this.router.navigate([Path.Assets]);
      },
      (error) => {
        console.log(error);
        this.appAlertService.showError('Chyba ukládání', 'Při ukládání podsložky se vyskytla chyba');
        this.loading = false;
      }
    );
  }
}
