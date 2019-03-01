export module FYE {

    /** 消息类型 */
    export enum MsgType {
    }

    export enum MusicType {
        /** 背景音乐 */
        MainBg = "bgm",
    }

    export enum SoundType {
        BtnClick = "btnClick",
    }

    export enum UIName {
        UIDemo = "UIDemo"
    }

    export enum ImageName {
    }

    export enum OtherName {
    }

    export enum EffectName {
    }

    /**
     * 自定义SDK类型
     */
    export enum CustomSDKType {
        /** CocosCreator */
        CocosCreator,
        /** 厘米秀 QQ玩一玩 */
        QQPlay,
        /** 微信小游戏 */
        WX,
        /** H5原生 */
        H5,
    }
}