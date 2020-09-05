const routesPath = {
  login: '/auth',
  users: "/users",
  createUser: "/users/create",
};
const routes = [
  {
    path: routesPath.login,
    exact: true,
    component: 'login'
  },
  {
    path: routesPath.users,
    exact: true,
    component: "users",
  },
  {
    path: routesPath.createUser,
    exact: true,
    component: "users",
  },
  {
    path: 'users/:id/edit',
    exact: true,
    component: "users"
  }
];


export { routesPath, routes };
