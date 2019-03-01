import FYSDKMgr from "../Tools/FYSDKMgr";
import FYUtility from "../Tools/FYUtility";

export enum ShareResultType {
    /** 分享失败 */
    Fail,
    /** 分享成功 */
    Success,
    /** 分享的不是群 */
    NotGroup,
}

/** 清除排行榜类型 */
export enum ClearRankType {
    /** 一周清除一次 */
    Week,
    /** 不清除 */
    None,
}

/** CocosCreator微信小游戏SDK管理器 */
export default class WXMiniGameSDKMgr {
    public static readonly Instance: WXMiniGameSDKMgr = new WXMiniGameSDKMgr();
    private constructor() { }

    public static readonly AppID: string = "wxf6a7c4ec8227b3cc";
    public static readonly ADUnitID: string = "adunit-ffcfaa8014048f24";

    public ShareTitle = "2019年最暖发问，“啥是佩奇”刷爆朋友圈！";
    public ShareTitle2 = "《啥是佩奇》午夜刷屏 网友：看完哭了又笑了";
    public SharePicPath = "https://www.foryun.com.cn/ResDownload/PigBall_C205/1.0.0/share/share1.jpg";

    /** 分享群ID */
    public SaveKeyShareGroupIds = WXMiniGameSDKMgr.AppID + "SaveKeyShareGroupIds";

    public wxInit(cbOnShow: (res) => void, cbOnHide: () => void) {
        if (this.wxIsWx()) {
            // 显示转发按钮
            wx.showShareMenu({ withShareTicket: true });
            // 转发样式
            //let _path = FYSDKMgr.Instance.Md5Pipe(CCCWXMiniGameSDKMgr.Instance.SharePicPath);
            wx.onShareAppMessage(function (res) {
                return {
                    title: WXMiniGameSDKMgr.Instance.ShareTitle,
                    imageUrl: WXMiniGameSDKMgr.Instance.SharePicPath,
                    query: "",
                }
            })

            wx.onShow(function (res) {
                if (cbOnShow != null) {
                    cbOnShow(res);
                }
            })

            wx.onHide(function () {
                if (cbOnHide != null) {
                    cbOnHide();
                }
            });
        }
    }

    /**
     * 拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
     * @param obj 参数
     */
    public wxGetFriendCloudStorage(obj: wx.GetFriendCloudStorageOptions) {
        if (this.wxIsWx()) {
            wx.getFriendCloudStorage(obj);
        }
    }

    /**
     * 获取当前用户托管数据当中对应 key 的数据。该接口只可在开放数据域下使用
     * @param obj 参数
     */
    public wxGetUserCloudStorage(obj: wx.GetUserCloudStorageOptions) {
        if (this.wxIsWx()) {
            wx.getUserCloudStorage(obj);
        }
    }

    /**
     * 在无须用户授权的情况下，批量获取用户信息。该接口只在开放数据域下可用
     * @param obj 参数
     */
    public wxGetUserInfo(obj: wx.GetUserInfoOptions) {
        if (this.wxIsWx()) {
            wx.getUserInfo(obj);
        }
    }

    /**
     * 在小游戏是通过群分享卡片打开的情况下，可以通过调用该接口获取群同玩成员的游戏数据。该接口只可在开放数据域下使用。
     * @param obj 参数
     */
    public wxGetGroupCloudStorage(obj: wx.GetGroupCloudStorageOptions) {
        if (this.wxIsWx()) {
            wx.getGroupCloudStorage(obj);
        }
    }

    /**
     * 只有开放数据域能调用，获取主域和开放数据域共享的 sharedCanvas
     */
    public wxGetSharedCanvas() {
        if (this.wxIsWx()) {
            return wx.getSharedCanvas();
        }
    }

    /**
     * 删除用户托管数据当中对应 key 的数据。
     * @param obj 参数
     */
    public wxRemoveUserCloudStorage(obj: wx.GetUserCloudStorageOptions) {
        if (this.wxIsWx()) {
            wx.removeUserCloudStorage(obj);
        }
    }

    /**
     * 主域程序向子域程序发送。
     * 
     * exsample： FYSDKMgr.Instance.wxPostMessage(C.ToChildProgramMsgName.ShowRank, [{id: id}]);
     * @param obj 参数
     */
    public wxPostMessage(req: string, args) {
        //console.log("----------post--", req)
        if (this.wxIsWx()) {
            let openDataContext = wx.getOpenDataContext()
            openDataContext.postMessage({
                req: req,
                data: args,
            })
        }
    }

    /**
     * 对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
     * @param obj 参数
     */
    public wxSetUserCloudStorage(obj: wx.SetUserCloudStorageOptions) {
        if (this.wxIsWx()) {
            wx.setUserCloudStorage(obj);
        }
    }

    public wxCreateGameClubButton() {
        if (this.wxIsWx()) {

        }
    }

    /**
     * 监听主域发送的消息
     * @param callback 监听事件的回调函数
     */
    public wxOnMessage(callback: Function) {
        if (this.wxIsWx()) {
            wx.onMessage(callback);
        }
    }

    public wxIsWx() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            return true;
        }
        return false;
    }

    /**
     * 判断是否可以使用广告
     */
    public wxIsAds() {
        //目前都是没有广告的，上线之后把！0去掉
        if (!this.wxIsWx || !0) {
            return false;
        }
        let sysInfo = wx.getSystemInfoSync();
        let sdkVer = sysInfo.SDKVersion;
        if (sdkVer >= "2.0.4") {
            return true;
        }
        return false;
    }

    /**
     * 创建广告
     */
    public wxCreateAd(sAdUnitId) {
        if (this.wxIsWx && this.wxIsAds) {
            let videoAd = wx.createRewardedVideoAd({
                adUnitId: sAdUnitId,
            });
            return videoAd;
        }
    }

    /**
     * 显示广告
     * @param closeCallBack 播放结束回调（bool：是否正常播放完成）
     */
    public wxShowAd(closeCallBack: (isEnded: boolean) => void, sAdUnitId) {
        if (this.wxIsWx()) {
            let videoAd = this.wxCreateAd(sAdUnitId);
            if (videoAd) {
                videoAd.load().then(() => videoAd.show()).catch(err => console.log(err.errMsg));
                let func = function (status) {
                    console.log("------fysdk----播放回调-------", status)
                    if (status && status.isEnded || status == undefined) {
                        if (closeCallBack) {
                            closeCallBack(true);
                        }
                    } else {
                        if (closeCallBack) {
                            closeCallBack(false);
                        }
                    }
                    videoAd.offClose(func);
                }
                videoAd.onClose(func);
                videoAd.onError(function (err) {
                    console.log("========广告加载失败===========", err)
                    if (closeCallBack) {
                        closeCallBack(false);
                    }
                    videoAd.offClose(func);
                    wx.showToast({
                        title: "广告加载失败!",
                        icon: "loading",
                    });
                });
            }
        }
    }

    /**
     * 分享
     * @param title 分享标题
     * @param sharePicPath 分享图片路径
     * @param query 分享参数
     * @param cb 分享回调
     */
    public wxShareAppMessage(title: string, sharePicPath: string, query: string, cb: (resultType: ShareResultType, shareTickets) => void) {
        if (this.wxIsWx()) {
            let self = this;
            wx.shareAppMessage({
                title: title,
                imageUrl: sharePicPath,
                query: query,
                success: function (res) {
                    if (res.shareTickets != null) {
                        // 分享成功
                        cb(ShareResultType.Success, res.shareTickets);
                    } else {
                        // 分享的不是群
                        if (cb != null) {
                            cb(ShareResultType.NotGroup, null);
                        }
                    }
                },
                fail: function () {
                    // 分享失败
                    if (cb != null) {
                        cb(ShareResultType.Fail, null);
                    }
                }
            })
        }
    }

    /**
     * 
     * @param sAdUnitId 创建Banner位
     * @param left 
     * @param top 
     * @param width 
     * @param height 
     */
    public wxCreateBanner(sAdUnitId, left: number = 0, top: number = 0, width: number = 0, height: number = 0) {
        if (this.wxIsWx && this.wxIsAds) {
            let bannerAd = wx.createBannerAd({
                adUnitId: sAdUnitId,
                style: {
                    left: left,
                    top: top,
                    width: width,
                    height: height,
                }
            });
            return bannerAd;
        }
    }

    public wxCreateImage(sprite, normalSprite, url) {
        sprite.spriteFrame = normalSprite.spriteFrame;
        if (url == "" || url == undefined || url == " " || url == null) {
            return;
        }
        let image = wx.createImage();
        image.onload = function () {
            try {
                let texture = new cc.Texture2D();
                texture.initWithElement(image);
                texture.handleLoadedTexture();
                sprite.spriteFrame = new cc.SpriteFrame(texture);
                console.log("-----createImage-----------", sprite, texture)
            } catch (error) {
                console.log("----error---", error)
            }
        };
        image.src = url;
    }

    public getRankInfo(clearRankType: ClearRankType, keyList: Array<string>, data: wx.GetFriendCloudStorageResult, cb: (sortList) => void) {
        let cloudStorageData = data.data;

        let sortList = {};
        for (let key in keyList) {
            let sortKey = keyList[key];
            sortList[sortKey] = [];
        }

        for (let key in cloudStorageData) {
            let data: wx.UserGameData = cloudStorageData[key];
            for (let index in data.KVDataList) {
                let value = data.KVDataList[index].value;

                let jsonData = JSON.parse(value || "{}")
                let time = jsonData.time || "0";
                let val = jsonData.value || "0";
                let nowMonTime = FYUtility.getMonTimeByNowTime();
                // 如果是一周清除一次排行榜，则只显示一周的数据，否则全部显示
                if (clearRankType == ClearRankType.Week && nowMonTime == time || clearRankType == ClearRankType.None) {
                    sortList[data.KVDataList[index].key].push({
                        avatarUrl: data.avatarUrl,
                        nickname: data.nickname,
                        openid: data.openid,
                        value: val,
                    });
                }
            }
        }
        // 生成递减排序表
        for (let key in sortList) {
            sortList[key].sort(function (structA, structB) {
                let valA = structA["value"];
                let valB = structB["value"];
                return Number(valB) - Number(valA);
            });
        }
        if (cb != null) {
            cb(sortList);
        }
    }

    public wxGetFriendRankInfoList(clearRankType: ClearRankType, keyList: Array<string>, cb: (sortList) => void) {
        console.log("---------------------- wxGetFriendRankInfoList")
        WXMiniGameSDKMgr.Instance.wxGetFriendCloudStorage({
            keyList: keyList,
            success: function (data: wx.GetFriendCloudStorageResult) {
                console.log("getRankInfo success----------------------------------");
                console.log("----------data:", data)
                WXMiniGameSDKMgr.Instance.getRankInfo(clearRankType, keyList, data, cb);
            },
            fail: function () {
                console.log("getRankInfo fail----------------------------------");
                console.log("getRankInfo data----:");
                if (cb != null) {
                    cb(null);
                }
            },
        });
    }

    public wxGetGroupRankInfoList(clearRankType: ClearRankType, shareTicket: string, keyList: Array<string>, cb: (sortList) => void) {
        WXMiniGameSDKMgr.Instance.wxGetGroupCloudStorage({
            shareTicket: shareTicket,
            keyList: keyList,
            success: function (data: wx.GetFriendCloudStorageResult) {
                console.log("getRankInfo success----------------------------------");
                console.log("----------data:", data)
                WXMiniGameSDKMgr.Instance.getRankInfo(clearRankType, keyList, data, cb);
            },
            fail: function () {
                console.log("getRankInfo fail----------------------------------");
                console.log("getRankInfo data----:");
                if (cb != null) {
                    cb(null);
                }
            },
        });
    }

    /**
     * 跳转到指定小程序
     * @param appId 小程序APPID
     */
    public wxNavigateToMiniProgram(appId: string) {
        if (WXMiniGameSDKMgr.Instance.wxIsWx()) {
            wx.navigateToMiniProgram({ appId })
        }
    }

    /**
	 * 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
	 */
    public wxVibrateShort() {
        if (WXMiniGameSDKMgr.Instance.wxIsWx()) {
            wx.vibrateShort();
        }
    }

    /**
	 * 使手机发生较长时间的振动（400 ms)
	 */
    public wxVibrateLong() {
        if (WXMiniGameSDKMgr.Instance.wxIsWx()) {
            wx.vibrateLong();
        }
    }
}
