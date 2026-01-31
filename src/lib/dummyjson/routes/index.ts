export const routes = {
  auth: {
    login: "/auth/login",
    refresh: "/auth/refresh",
    me: "/auth/me",
    products: "/auth/products",
    cartsUser: (userId: number) => `/auth/carts/user/${userId}`,
    cartsAdd: "/auth/carts/add",
  },
} as const;
