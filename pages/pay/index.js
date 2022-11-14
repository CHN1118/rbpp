var e;

Page({
    data: {
        title: "",
        trade_no: "",
        show: "display:none"
    },
    onLoad: function(e) {
        var n = e.trade_no, t = "", o = this;
        "" != n && o.setData({
            show: "display:block"
        });
        var a = getCurrentPages();
        console.log(a), console.log(a.length), wx.login({
            success: function(e) {
                console.log(e.code), wx.request({
                    url: "https://www.rebu.net.cn/weixinMiniYixue3/miniApi.php?act=getOpenid&code=" + e.code,
                    method: "Get",
                    success: function(e) {
                        console.log(e.data), t = e.data.openid, o.getTrade(n, t);
                    }
                });
            },
            fail: function() {}
        });
    },
    getTrade: function(n, t) {
        var o = this;
        wx.request({
            url: "https://www.rebu.net.cn/weixinMiniYixue3/getTrade.php?trade_no=" + n + "&openid=" + t,
            method: "Get",
            success: function(n) {
                console.log(n.data), o.setData({
                    title: n.data.title,
                    trade_no: n.data.trade_no
                }), e = n.data, o.requestPayment();
            }
        });
    },
    goBack: function() {
        wx.navigateBack();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    requestPayment: function() {
        var n = e;
        n.trade_no;
        wx.requestPayment({
            timeStamp: n.timeStamp,
            nonceStr: n.nonceStr,
            package: n.package.replace("%3D", "="),
            signType: n.signType,
            paySign: n.paySign,
            success: function(e) {
                console.log("支付成功");
                var t = getCurrentPages();
                t[t.length - 1];
                t[t.length - 2].setData({
                    url: n.backUrl
                }), wx.navigateBack();
            },
            fail: function(e) {
                console.log("支付失败"), console.log(e), wx.showToast({
                    title: "对不起，支付失败。",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    }
});