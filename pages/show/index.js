Page({
    data: {
        url: "",
        title: " 热卜"
    },
    bindmessage: function(t) {
        var n = t.detail.data.length - 1;
        t.detail.data[n].title && this.setData({
            title: t.detail.data[n].title
        });
    },
    onLoad: function(t) {
        t.url && this.setData({
            url: decodeURIComponent(t.url)
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        return {
            title: this.data.title,
            path: "/pages/show/index?url=" + encodeURIComponent(t.webViewUrl)
        };
    }
});