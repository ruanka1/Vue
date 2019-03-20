import api from "./api"

export function createOrder(detail, user_id) {
    let order = {
        detail
    };
    order.sum = orderSum(order.detail);
    order.user_id = user_id;
    order.created_at = orderCreatedTime();

    return api("order/create", order).then(r => r);
}
//获取订单创建时间
export function orderCreatedTime() {
    let dtCur = new Date();
    let yearCur = dtCur.getFullYear();
    let monCur = dtCur.getMonth() + 1;
    let dayCur = dtCur.getDate();
    let hCur = dtCur.getHours();
    let mCur = dtCur.getMinutes();
    let sCur = dtCur.getSeconds();
    let timeCur =
        yearCur +
        "-" +
        (monCur < 10 ? "0" + monCur : monCur) +
        "-" +
        (dayCur < 10 ? "0" + dayCur : dayCur) +
        " " +
        (hCur < 10 ? "0" + hCur : hCur) +
        ":" +
        (mCur < 10 ? "0" + mCur : mCur) +
        ":" +
        (sCur < 10 ? "0" + sCur : sCur);
    return timeCur;
}
//计算订单总价
export function orderSum(detail) {
    let sum = 0;
    detail.forEach(element => {
        sum +=
            element.product_snapshoot.price * element.count +
            element.product_snapshoot.carriage;
    });
    return sum;
}