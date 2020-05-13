import http from "../plugins/http";

export function apiGetProduct(pageNum, type) {
    return http.get(`product/all?pageNum=${pageNum}&categoryUid=${type}`);
}

export function apiGetBanner() {
    return http.get(`banner/all`);
}

export function apiGetDetail(uid) {
    return axios.get(`product/detail?uid=${uid}`);
}
