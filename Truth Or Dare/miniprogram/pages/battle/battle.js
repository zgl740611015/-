
Page({
    
    data: {

    },

    onReady: function () {
        this.animation = wx.createAnimation()
    },
    
    rotate: function () {
        let angle = Math.random() * 3600 + 360;
        // this.animation.rotate(180*Math.random()+720);
        // setInterval(function(){},) 
        this.animation.rotate(angle).step();
        this.setData({
            animation: this.animation.export()
        })
    },

    BackTo: function () {
        wx.navigateTo({
            url: '/pages/index/index',
        })
    },

})