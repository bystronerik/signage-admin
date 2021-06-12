import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RandomGeneratorService } from '@core/services';
import { User, UserService } from '@core/shared/user';
import { CreateUserInput, FindUserInput, UpdateUserInput } from '@core/graphql/user';
import { Path } from '@core/enums';
import { RoleList } from '@core/shared/role';
import { AppAlertService } from '@core/shared/app-alert';
import { AuthService } from '@app/+auth';

@Component({
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  user: User;
  roles = [RoleList.User, RoleList.Admin];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private generator: RandomGeneratorService,
    public authService: AuthService,
    private router: Router,
    private userService: UserService,
    private alertService: AppAlertService
  ) {}

  ngOnInit(): void {
    this.user = new User();
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input = new FindUserInput();
        input.id = params.get('id');
        this.userService
          .find(input)
          .result()
          .then(
            (value) => {
              this.user = JSON.parse(JSON.stringify(value.data.findUser));
            },
            (error) => {
              this.router.navigate([Path.Users]);
            }
          );
      }
    });
  }

  onSubmit() {
    this.loading = true;

    const input = this.user.id ? new UpdateUserInput() : new CreateUserInput();
    if (this.user.id !== this.authService.userValue.id) {
      input.username = this.user.username;
      input.role = this.user.role;
    } else {
      input.username = this.authService.userValue.username;
      input.role = this.authService.userValue.role;
    }

    input.password = this.user.password;

    const query = this.user.id ? this.userService.update(this.user.id, input) : this.userService.create(input);
    query.toPromise().then(
      (value) => {
        this.loading = false;
        this.alertService.showSuccess('Uloženo', 'Uživatel byl úspěšně uložen');
        this.authService.logout();
      },
      (error) => {
        this.alertService.showError('Chyba ukládání', 'Při ukládání uživatele se vyskytla chyba');
        this.loading = false;
      }
    );
  }

  generatePassword() {
    this.user.password = this.generator.generatePassword();
  }

  changeRole(event) {
    this.user.role = event.target.value;
  }
}
