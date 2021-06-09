import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Path } from '@core/enums';
import { AuthGuard, NoAuthGuard } from './@core/guards';
import { NotFoundPage } from './public/pages/not-found/not-found.page';
import { InternalServerErrorPage } from '@app/public/pages/internal-server-error/internal-server-error.page';

const routes: Routes = [
  // ===== Uncomment if Path.Home is different from empty =====
  // { path: '', redirectTo: Path.Home, pathMatch: 'full' },

  // Public
  /*{
    path: '',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },*/

  // App
  {
    path: '',
    redirectTo: `${Path.Assets}`,
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: Path.Dashboard,
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: Path.Assets,
        loadChildren: () => import('./assets/assets.module').then((m) => m.AssetsModule),
      },
      {
        path: Path.Players,
        loadChildren: () => import('./players/players.module').then((m) => m.PlayersModule),
      },
      {
        path: Path.Groups,
        loadChildren: () => import('./groups/groups.module').then((m) => m.GroupsModule),
      },
      {
        path: Path.AssetLists,
        loadChildren: () => import('./assetlists/assetlists.module').then((m) => m.AssetListsModule),
      },
      {
        path: Path.Users,
        loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: Path.Alerts,
        loadChildren: () => import('./alerts/alerts.module').then((m) => m.AlertsModule),
      },
      {
        path: Path.Styles,
        loadChildren: () => import('./styles/styles.module').then((m) => m.StylesModule),
      },
    ],
  },

  // Auth
  {
    path: Path.Auth,
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./+auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: Path.InternalServerError,
    component: InternalServerErrorPage,
  },

  // Not found page (must go at the bottom)
  {
    path: '**',
    component: NotFoundPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
