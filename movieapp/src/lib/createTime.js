export function commentTime() {
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