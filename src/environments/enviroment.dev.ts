export const environment = {
    production: false,
    BASE_URL:'http://localhost:3000',
    USER_BASE_URL:'http://localhost:3000/users',
    PG_BASE_URL:'http://localhost:3000/pg',
    TENANT_BASE_URL:'http://localhost:3000/tenant',
    TICKET_BASE_URL:'http://localhost:3000/ticket',
    USER:
    {
        GET_USER_LOGIN:'login',
        GET_ALL_USER:'list',
        GET_USER:'search',
        CREATE_USER:'signup',
        UPDATE_USER:'update',
        DELETE_USER:'delete',
        LOGGED_OUT:'logout',
        LOGIN:'isLogin',
        FORGOT:'forgotPassword'
    },
    PG:
    {
        GET_ALL_PG:'listPg',
        GET_PG:'searchPg',
        CREATE_PG:'addPg',
        UPDATE_PG:'updatePg',
        DELETE_PG:'deletePg',
        PG_BY_LOCATION:'searchLocation',
        // PG_BY_RENT:'searchRent',
    },
    TENANT:
    {
        GET_MY_TENANT:'listTenant',
        BOOK_PG:'bookPg',
        MY_BOOKINGS:'mybookings',
        CANCEL_BOOKING:'cencelbooking'
    },
    PHONE:
    {
        SEND_CODE:'verify',
        CHECK_CODE:'verifycode'
    },
    TICKET:{
        CREATE_TICKET:'createTicket',
        GET_TICKET:'getTicket',
        MY_TICKET:'myTicket',
        UPDATE_TICKET:'updateTicket'
    }

  };
  