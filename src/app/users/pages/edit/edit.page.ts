import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RandomGeneratorService } from '@core/services';
import { UserData, UserService } from '@core/shared/user';
import { CreateUserInput, CreateUserMutation, FindUserInput, UpdateUserInput, UpdateUserMutation } from '@app/graphql';
import { Path } from '@core/enums';
import { RoleList } from '@core/shared/role';
import { AppAlertService } from '@core/shared/app-alert';
import { AuthService } from '@app/+auth';
import { Observable } from 'rxjs';
import { FetchResult } from '@apollo/client/core';

@Component({
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss']
})
export class EditPage implements OnInit {
  user: UserData;
  roles = [RoleList.User, RoleList.Admin];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private generator: RandomGeneratorService,
    public authService: AuthService,
    private router: Router,
    private userService: UserService,
    private alertService: AppAlertService
  ) {
  }

  ngOnInit(): void {
    this.user = {} as UserData;
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const input: FindUserInput = {};
        input.id = params.get('id');
        this.userService
          .find(input)
          .result()
          .then(
            (value) => {
              this.user = Object.assign({} as UserData, value.data.findUser);
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

    const input: UpdateUserInput | CreateUserInput = this.user.id ? {} as UpdateUserInput : {} as CreateUserInput;
    if (this.user.id !== this.authService.getUser.id) {
      input.username = this.user.username;
      input.role = this.user.role;
    } else {
      input.username = this.authService.getUser.username;
      input.role = this.authService.getUser.role;
    }

    input.password = this.user.password; //TODO potřeba nějak nadefinovat user objekt i s heslem a to pak používat i v auth service

    const query: Observable<FetchResult<UpdateUserMutation | CreateUserMutation>> = this.user.id ? this.userService.update(this.user.id, input as UpdateUserInput) : this.userService.create(input as CreateUserInput);
    query.toPromise().then(
      (value) => {
        this.loading = false;
        this.alertService.showSuccess('Uloženo', 'Uživatel byl úspěšně uložen');
        this.authService.signOut();
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
