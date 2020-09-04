const routesPath = {
  users: "/users",
  createUser: "/users/create",
};
const routes = [
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
];


export { routesPath, routes };
