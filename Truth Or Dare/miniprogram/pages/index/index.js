import Adventure from '../../common/Adventure.js'
import Sincere_Words from '../../common/Sincere_Words.js'
import Type from '../../common/Type.js'

Page({

    data: {
        top_left: 'truth',
        top_right: 'dareoff',
        scaleName: '',
        type_id: 3,
        Sdata: [],
        Adata: [],
        RandomElement: {},
        content: '',
        approve: 0,
        opposition: 0,
        status: '',
        isClick: true
    },

    // 真心话点击事件
    clickBefore: function() {
        let top_left = this.data.top_left
        let top_right = this.data.top_right
        let isClick = this.data.isClick
        let RandomElement = this.data.Sdata[Math.floor(Math.random() * 19)]
        if (top_left == "truthoff" && top_right == "dare" && isClick == false) {
            top_left = "truth"
            top_right = "dareoff"
            this.setData({
                top_left,
                top_right,
                RandomElement,
                content: RandomElement.content,
                approve: RandomElement.approve,
                opposition: RandomElement.opposition,
                status: RandomElement.status,
                isClick: true
            })
        }
    },

    // 大冒险点击事件
    clickAfter: function() {
        let top_left = this.data.top_left
        let top_right = this.data.top_right
        let isClick = this.data.isClick
        let RandomElement = this.data.Adata[Math.floor(Math.random() * 19)]
        if (top_left == "truth" && top_right == "dareoff" && isClick == true) {
            top_left = "truthoff"
            top_right = "dare"
            this.setData({
                top_left,
                top_right,
                RandomElement,
                content: RandomElement.content,
                approve: RandomElement.approve,
                opposition: RandomElement.opposition,
                status: RandomElement.status,
                isClick: false
            })
        }
    },

    // 页面跳转
    trun: function() {
        wx.navigateTo({
            url: '../scale/scale?type_id=' + this.data.type_id
        })
    },

    // 内容点击事件
    changeContent: function() {
        if (this.data.top_left == 'truth') {
            let RandomElement = this.data.Sdata[Math.floor(Math.random() * 19)]
            this.setData({
                RandomElement,
                content: RandomElement.content,
                approve: RandomElement.approve,
                opposition: RandomElement.opposition,
                status: RandomElement.status,
            })
        } else {
            let RandomElement = this.data.Adata[Math.floor(Math.random() * 19)]
            this.setData({
                RandomElement,
                content: RandomElement.content,
                approve: RandomElement.approve,
                opposition: RandomElement.opposition,
                status: RandomElement.status,
            })
        }
    },

    // 反对点击事件
    Opposition: function() {
        let RandomElement = this.data.RandomElement
        let status = this.data.status
        if (this.data.top_left == 'truth' && status == false) {
            RandomElement.opposition++;
            Sincere_Words.updateOpp(RandomElement._id, RandomElement, res => {
                this.setData({
                    opposition: RandomElement.opposition,
                    status: true,
                })
            })
        } else if (this.data.top_left == 'truthoff' && status == false) {
            RandomElement.opposition++;
            Adventure.updateOpp(RandomElement._id, RandomElement, res => {
                this.setData({
                    opposition: RandomElement.opposition,
                    status: true,
                })
            })
        }
    },
    
    // 赞成点击事件
    Approve: function() {
        let RandomElement = this.data.RandomElement
        let status = this.data.status
        if (this.data.top_left == 'truth' && status == false) {
            RandomElement.approve++;
            Sincere_Words.updateApp(RandomElement._id, RandomElement, res => {
                this.setData({
                    approve: RandomElement.approve,
                    status: true
                })
            })
        } else if (this.data.top_left == 'truthoff' && status == false) {
            RandomElement.approve++;
            Adventure.updateApp(RandomElement._id, RandomElement, res => {
                this.setData({
                    approve: RandomElement.approve,
                    status: true
                })
            })
        }
    },

    updata: function() {
        let type_id = this.data.type_id
        // Type数据获取
        Type.getType(type_id, res => {
            this.setData({
                scaleName: res.data[0].name,
            })
        })

        // 真心话数据获取
        Sincere_Words.getSincere_Words(type_id, res => {
            let RandomElement = res.data[Math.floor(Math.random() * 19)]
            this.setData({
                type_id: this.data.type_id,
                Sdata: res.data,
                RandomElement,
                content: RandomElement.content,
                approve: RandomElement.approve,
                opposition: RandomElement.opposition,
                status: RandomElement.status
            })
        })

        // 大冒险数据获取
        Adventure.getAdventure(type_id, res=>{
            this.setData({
                type_id: this.data.type_id,
                Adata: res.data,
            })
        })
    },
    
    onLoad: function() {},

    onShow: function() {
        this.updata()
    },

    onShareAppMessage: function() {
        return {
            title: "@所有人！我抽到了真心话牌",
            desc: "真心话大冒险精选",
            path: "/pages/index/index",
            imageUrl: "https://7465-test-01-8klch-1259457002.tcb.qcloud.la/sharebg1.png",
        }
    }
})