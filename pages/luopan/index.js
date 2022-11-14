var t, a = 0, e = 0;

Page({
    data: {
        rotate: 0,
        pictureRotate: 0,
        panHeight: wx.getSystemInfoSync().windowWidth,
        showRotate: 0,
        shan: "",
        animation: "",
        loupanHeight: 0,
        lock: "unlock",
        luopan: "lp1",
        buttonClass: "buttonDisable",
        multiSelectorData: [ [ "一运", "二运", "三运", "四运", "五运", "六运", "七运", "八运", "九运" ], [ "水口在壬", "水口在子", "水口在癸", "水口在丑", "水口在艮", "水口在寅", "水口在甲", "水口在卯", "水口在乙", "水口在辰", "水口在巽", "水口在巳", "水口在丙", "水口在午", "水口在丁", "水口在未", "水口在坤", "水口在申", "水口在庚", "水口在酉", "水口在辛", "水口在戌", "水口在乾", "水口在亥" ] ],
        multiSelectorIndex: [ 7, 0 ],
        multiSelectorValue: "",
        pickerDisabled: !0,
        renPan: "",
        tianPan: ""
    },
    onLoad: function(t) {
        wx.showShareMenu({
            withShareTicket: !0,
            menus: [ "shareAppMessage", "shareTimeline" ]
        });
    },
    onReady: function() {},
    lock: function() {
        wx.vibrateShort({});
        "lock" == this.data.lock ? (this.setData({
            lock: "unlock",
            buttonClass: "buttonDisable",
            pickerDisabled: !0
        }), wx.startCompass()) : (this.setData({
            lock: "lock",
            buttonClass: "buttonEnable",
            pickerDisabled: !1
        }), wx.stopCompass());
    },
    luopan1: function() {
        this.setData({
            luopan: "lp1"
        });
    },
    luopan2: function() {
        this.setData({
            luopan: "lp2"
        });
    },
    luopan3: function() {
        this.setData({
            luopan: "lp3"
        });
    },
    pickerTap: function() {
        "unlock" == this.data.lock ? wx.showToast({
            title: "请先锁定罗盘",
            icon: "none",
            duration: 2e3
        }) : this.setData({
            pickerDisabled: !1
        });
    },
    multiSelectorChange: function(t) {
        if ("unlock" == this.data.lock) wx.showToast({
            title: "请先锁定罗盘",
            icon: "none",
            duration: 2e3
        }); else {
            var a = t.detail.value[0], n = this.data.multiSelectorData[1][t.detail.value[1]].substr(3, 1), o = encodeURIComponent("https://www.rebu.net.cn/tool.php?mod=pan&act=createXuankong&yun=" + a + "&shuikou=" + n + "&degree=" + this.data.showRotate + "&shanxiang=" + this.data.shan + "&shanxiangID=" + e);
            wx.navigateTo({
                url: "/pages/tool/index?url=" + o
            });
        }
    },
    onShow: function() {
        var n = this;
        n.setData({
            lock: "unlock",
            buttonClass: "buttonDisable",
            pickerDisabled: !0
        });
        var o = new Array("午山子向", "丁山癸向", "未山丑向", "坤山艮向", "申山寅向", "庚山甲向", "酉山卯向", "辛山乙向", "戌山辰向", "乾山巽向", "亥山巳向", "壬山丙向", "子山午向", "癸山丁向", "丑山未向", "艮山坤向", "寅山申向", "甲山庚向", "卯山酉向", "乙山辛向", "辰山戌向", "巽山乾向", "巳山亥向", "丙山壬向"), i = 0;
        wx.getSystemInfo({
            success: function(t) {
                var a = t.windowWidth;
                i = parseInt(a / 2 - 2);
            }
        }), n.setData({
            loupanHeight: 2 * i
        });
        var s = wx.createCanvasContext("customCanvas");
        s.setStrokeStyle("red"), s.setLineWidth(.5), s.moveTo(0, i + .5), s.lineTo(2 * i, i + .5), 
        s.moveTo(i + .5, 0), s.lineTo(i + .5, 2 * i), s.stroke(), s.draw();
        var l = 0;
        wx.onCompassChange(function(i) {
            l = r;
            var s = i.direction.toFixed(1), u = Math.abs(a - s), r = new Date().getTime();
            if (!(r - l < 400 || Math.abs(a - s) < 1)) {
                var c = 180 - s, h = s - 180 + 180;
                (t = u >= 90 ? wx.createAnimation({
                    duration: 0,
                    timingFunction: "step-end",
                    delay: 0
                }) : wx.createAnimation({
                    duration: 200,
                    timingFunction: "linear",
                    delay: 0
                })).rotate(180 - s).step(), n.setData({
                    rotate: s,
                    pictureRotate: c.toFixed(1),
                    showRotate: h.toFixed(1),
                    animation: t.export()
                });
                for (var d = 0; d <= 23 && !(s < 15 * d + 7.5); d++) ;
                for (e = d = 24 == d ? 23 : d, n.setData({
                    shan: o[d]
                }), d = 0; d <= 23 && !(s < 15 * d); d++) ;
                for (d = 24 == d ? 23 : d, n.setData({
                    renPan: o[d]
                }), d = 0; d <= 23 && !(s < 15 * d + 15); d++) ;
                d = 24 == d ? 23 : d, n.setData({
                    tianPan: o[d]
                }), a = s;
            }
        });
    },
    go: function(t) {
        if ("unlock" == this.data.lock) wx.showToast({
            title: "请先锁定罗盘",
            icon: "none",
            duration: 2e3
        }); else {
            var a = t.currentTarget.dataset.gid, n = encodeURIComponent("https://www.rebu.net.cn/tool.php?" + a + "&degree=" + this.data.showRotate + "&shanxiang=" + this.data.shan + "&shanxiangID=" + e);
            wx.navigateTo({
                url: "/pages/tool/index?url=" + n
            });
        }
    },
    onHide: function() {},
    onUnload: function() {
        wx.offCompassChange();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onShareTimeline: function() {}
});