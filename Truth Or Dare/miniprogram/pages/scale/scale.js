Page({

    data: {
        status: "",
        typeName: [],
        type_id: ""

    },

    back: function () {
        wx.navigateBack()
    },

    clickMold: function (e) {
        let type_id = parseInt(e.target.dataset.num);
        this.setData({
            type_id
        })
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];
        prevPage.setData({
            type_id: type_id
        })
        wx.navigateBack()
    },
    

    onLoad: function (options) {
        var number = options.type_id;
        this.setData({
            type_id: number
        })
    },
})
