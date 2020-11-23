const routesPath = {
  login: '/auth/login',
  users: "/users",
  editUser: "/users/edit/:id",
  products: "/products",
  editProduct: "/products/edit/:id"
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
  {
    path: routesPath.editProduct,
    exact: true,
    component: "products",
    protected: true
  }
];


export { routesPath, routes };
