import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/+auth';
import { Path } from '@app/@core/enums';

@Component({
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  returnUrl: string;
  errorMessage: string;
  loading = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || `/${Path.Dashboard}`;
  }

  ngOnInit(): void {}

  async onSignIn(data) {
    this.loading = true;
    try {
      await this.authService.signIn(data.user, data.shortSession);
      this.router.navigate([this.returnUrl]);
    } catch (err) {
      const message = [401, 403].includes(err.status) ? err.error.message : err.message;

      this.errorMessage = message;
    } finally {
      this.loading = false;
    }
  }
}
