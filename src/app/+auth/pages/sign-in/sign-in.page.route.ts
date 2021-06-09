import { Route } from '@angular/router';
import { Path } from '@app/@core/enums';
import { SignInPage } from './sign-in.page';

export const SIGN_IN_ROUTE: Route = {
  path: Path.SignIn,
  component: SignInPage,
  data: {
    title: 'Přihlášení',
    description: 'Přihlášení do administrace Signage softwaru OC Frýdy.',
    robots: 'noindex, nofollow',
  },
};
