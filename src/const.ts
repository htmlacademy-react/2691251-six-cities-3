export const Setting = {
  offersCount: 312
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum AppRoute {
  Login = '/login',
  OfferWithId = '/offer/:id',
  Favorites = '/favorites',
  Main = '/',
}
