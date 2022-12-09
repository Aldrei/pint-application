import { API } from './index';
import { ROUTES } from './routes';

describe('Constants', () => {
  it('ROUTES constant', () => {
    expect(ROUTES.index.go()).toEqual('/');
    expect(ROUTES.login.go()).toEqual('/login');
    expect(ROUTES.dashboard.go()).toEqual('/dashboard');
  });

  it('API constant', () => {
    expect(API.AUTH).toEqual('oauth/access_token');
    expect(API.REVOKE).toEqual('api/oauth/revoke');
    expect(API.PROPERTIES.LIST).toEqual('api/properties');
    expect(API.PROPERTIES.SHOW('123')).toEqual('api/properties/123');
    expect(API.PROPERTIES.PHOTOS.LIST('1234')).toEqual('api/properties/1234/photos?page=1');
  });
});
