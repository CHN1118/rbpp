Page({
    data: {},
    onLoad: function(n) {
        console.log(n.id);
    },
    kefu: function() {
        try {
            wx.openCustomerServiceChat({
                extInfo: {
                    url: "https://work.weixin.qq.com/kfid/kfc91a8212c66418946"
                },
                corpId: "wwa005de5ffdd4c18a",
                success: function(n) {}
            });
        } catch (n) {
            n = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(n);
            wx.showToast({
                title: "请更新微信至最新版本",
                icon: "none",
                duration: 2e3
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onShareTimeline: function() {}
});