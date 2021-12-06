import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './+auth';
import { ModalService, SeoService } from '@core/services';
import { DeployService } from '@core/shared/deploy/deploy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private router: Router,
    private seoService: SeoService,
    private authService: AuthService,
    private deployService: DeployService,
    private modalService: ModalService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedInObservable;
  }

  ngOnInit(): void {
    this.seoService.init();

    this.router.events.subscribe((event: NavigationEnd) => {
      window.scroll(0, 0);
    });
  }

  onLogout() {
    this.authService.signOut();
    // this.router.navigate([Path.SignIn]);
  }

  onDeploy() {
    this.deployService
      .deploy()
      .toPromise()
      .then(
        (value) => {
          this.modalService.open('deploy-success-modal');
        },
        (error) => {
          console.log(error);
        }
      );
  }

  closeModal() {
    this.modalService.close('deploy-success-modal');
  }
}
