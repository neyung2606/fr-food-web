const routesPath = {
  login: '/auth/login',
  users: "/users",
  createUser: "/users/create",
  editUser: "/users/edit/:id",
  products: "/products"
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
    path: routesPath.editUser,
    exact: true,
    component: "users",
    protected: true
  },
  {
    path: routesPath.products,
    exact: true,
    component: "products",
    protected: true
  },
];


export { routesPath, routes };
