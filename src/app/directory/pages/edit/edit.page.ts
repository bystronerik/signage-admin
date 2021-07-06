import { Component, OnInit } from '@angular/core';
import { Directory, DirectoryService } from '@core/shared/directory';
import { Path } from '@core/enums';
import { AppAlertService } from '@core/shared/app-alert';
import { Router } from '@angular/router';
import { CreateDirectoryInput, UpdateDirectoryInput } from '@core/graphql/directory';

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
    this.directory = new Directory();
    this.directory.parentDirectory = new Directory();
    this.directory.parentDirectory.id = '60d956342016642a5c3845a1';
  }

  async onSubmit() {
    this.loading = true;

    const input = this.directory.id ? new UpdateDirectoryInput() : new CreateDirectoryInput();
    input.name = this.directory.name;
    input.parentDirectory = this.directory.parentDirectory.id;

    const query = this.directory.id
      ? this.directoryService.update(this.directory.id, input)
      : this.directoryService.create(input);

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
