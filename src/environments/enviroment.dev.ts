export const environment = {
    production: false,
    BASE_URL:'http://localhost:3000',
    USER_BASE_URL:'http://localhost:3000/users',
    PG_BASE_URL:'http://localhost:3000/pg',
    TENANT_BASE_URL:'http://localhost:3000/tenant',
    USER:
    {
        GET_USER_LOGIN:'login',
        GET_ALL_USER:'list',
        GET_USER:'search',
        CREATE_USER:'signup',
        UPDATE_USER:'update',
        DELETE_USER:'delete',
        LOGGED_OUT:'logout',
        LOGIN:'isLogin'
    },
    PG:
    {
        GET_ALL_PG:'listPg',
        GET_PG:'searchPg',
        CREATE_PG:'addPg',
        UPDATE_PG:'updatePg',
        DELETE_PG:'deletePg'
    },
    TENANT:
    {
        GET_ALL_TENANT:'listTenant',
        GET_TENANT:'searchTenant',
        CREATE_TENANT:'bookPg',
        UPDATE_TENANT:'updateTenant',
        DELETE_TENANT:'deleteTenant'
    },

  };
  