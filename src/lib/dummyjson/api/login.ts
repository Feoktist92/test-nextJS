import { request } from "../http/request";
import { routes } from "../routes";
import type { LoginResponse } from "../types";

export async function login(username: string, password: string): Promise<LoginResponse> {
  return request<LoginResponse>({
    method: "POST",
    path: routes.auth.login,
    body: { username, password, expiresInMins: 15 },
  });
}
