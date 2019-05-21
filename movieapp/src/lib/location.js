export function TMap() {
    return new Promise((resolve, reject) => {
        window.init = function () {
            resolve(r)
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'http://map.qq.com/api/js?v=2.exp&callback=init&key=这里填申请的秘钥'
        script.onerror = reject
        document.head.appendChild(script)
    })
}