const routesPath = {
  dashboard: "/dashboard",
  login: '/auth/login',
  users: "/users",
  editUser: "/users/edit/:id",
  products: "/products",
  editProduct: "/products/edit/:id",
  orders: "/orders",
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
    component: "user",
    protected: true
  },
  {
    path: routesPath.editUser,
    exact: true,
    component: "user",
    protected: true
  },
  {
    path: routesPath.products,
    exact: true,
    component: "product",
    protected: true
  },
  {
    path: routesPath.editProduct,
    exact: true,
    component: "product",
    protected: true
  },
  {
    path: routesPath.dashboard,
    exact: true,
    component: "dashboard",
    protected: true
  },
  {
    path: routesPath.orders,
    exact: true,
    component: "order",
    protected: true
  }
];


export { routesPath, routes };
