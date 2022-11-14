getApp();

Page({
    data: {
        url: "https://www.rebu.net.cn/guide.php?mod=index&act=indexYixue3&v=2",
        title: "易经排盘起局"
    },
    bindmessage: function(t) {
        var e = t.detail.data.length - 1;
        t.detail.data[e].title && this.setData({
            title: t.detail.data[e].title
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: this.data.title,
            path: "/pages/index/index?url=" + encodeURIComponent(t.webViewUrl)
        };
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    onLoad: function(t) {
        t.url && this.setData({
            url: decodeURIComponent(t.url)
        });
    }
});