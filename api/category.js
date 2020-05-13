import http from "../plugins/http";

export function apiGetCategoryMenu() {
    return http.get(`category/all`);
}
