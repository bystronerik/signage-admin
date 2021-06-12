export enum Path {
  InternalServerError = 'internal-server-error',
  NotFound = '404',

  // Auth
  Auth = '',
  SignIn = 'sign-in',
  SignUp = 'sign-up',
  ForgotPassword = 'forgot-password',
  ForgotPasswordEmailSent = 'forgot-password-email-sent',
  PasswordReset = 'password-reset',
  PasswordResetSucceeded = 'password-reset-succeeded',
  PasswordResetFailed = 'password-reset-failed',

  // Features
  Dashboard = 'statistics',

  Assets = 'assets',
  AssetsListing = '',
  AssetsCreate = 'new',
  AssetsDetail = ':id',
  AssetsEdit = ':id/edit',

  Players = 'players',
  PlayersListing = '',
  PlayersCreate = 'new',
  PlayersDetail = ':id',
  PlayersEdit = ':id/edit',

  Groups = 'groups',
  GroupsCreate = 'new',
  GroupsDetail = ':id',
  GroupsEdit = ':id/edit',
  GroupsListing = '',

  AssetLists = 'assetlists/:type',
  AssetListsListing = '',
  AssetListsDetail = ':id',
  AssetListsCreate = 'new',
  AssetListsEdit = ':id/edit',

  Alerts = 'alerts',
  AlertsListing = '',
  AlertsCreate = 'new',
  AlertsDetail = ':id',
  AlertsEdit = ':id/edit',

  Styles = 'styles',
  StylesListing = '',
  StylesCreate = 'new',
  StylesDetail = ':id',
  StylesEdit = ':id/edit',

  Users = 'users',
  UsersListing = '',
  UsersCreate = 'new',
  UsersDetail = ':id',
  UsersEdit = ':id/edit',

  Planner = 'planner',
  PlannerListing = '',
  PlannerCreate = 'new',
  PlannerDetail = ':id',
  PlannerEdit = ':id/edit',
}
