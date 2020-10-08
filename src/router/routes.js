const routesPath = {
  login: '/auth/login',
  users: "/users",
  createUser: "/users/create",
};
const routes = [
  {
    path: routesPath.login,
    exact: true,
    component: 'login',
    protected: false
  },
  {
    path: routesPath.users,
    exact: true,
    component: "users",
    protected: true
  },
  {
    path: routesPath.createUser,
    exact: true,
    component: "users",
    protected: true
  },
  {
    path: 'users/:id/edit',
    exact: true,
    component: "users",
    protected: true
  }
];


export { routesPath, routes };
