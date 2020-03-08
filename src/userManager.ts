/* eslint-disable @typescript-eslint/camelcase */
import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
    client_id: 'keyteki',
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
    }/callback`,
    response_type: 'code',
    scope: 'openid profile api1',
    authority: 'https://localhost:7001',
    silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
    }/silent_renew.html`,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
