export function getAdminNews(): RequestBlocklistAction {
    return {
        type: Auth.BlocklistReceived,
        types: [Auth.RequestBlocklist, Auth.BlocklistReceived],
        shouldCallApi: (): boolean => true,
        apiParams: {
            url: '/api/account/blocklist',
            method: 'GET'
        }
    };
}
