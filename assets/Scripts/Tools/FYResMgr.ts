import FYMessenger from "./FYMessenger";

const { ccclass, property } = cc._decorator;
/** 资源管理器 */
@ccclass
export default class FYResMgr {
    /** 单例 */
    public static readonly Instance: FYResMgr = new FYResMgr();
    private constructor() { }
    /** 加载图集中 */
    public static readonly MsgPreLoadAtlasProgress = "MsgPreLoadAtlasProgress";
    /** 加载自动图集中 */
    public static readonly MsgPreLoadAutoAtlasProgress = "MsgPreLoadAutoAtlasProgress";
    /** 加载特效资源中 */
    public static readonly MsgPreLoadEffectProgress = "MsgPreLoadEffectProgress";
    /** 加载序列帧资源中 */
    public static readonly MsgPreLoadSequenceFrameProgress = "MsgPreLoadSequenceFrameProgress";
    /** 加载其他资源中 */
    public static readonly MsgPreLoadOtherProgress = "MsgPreLoadOtherProgress";
    /** 加载图集完毕 */
    public static readonly MsgPreLoadAtlasComplete = "MsgPreLoadAtlasComplete";
    /** 加载自动图集完毕 */
    public static readonly MsgPreLoadAutoAtlasComplete = "MsgPreLoadAutoAtlasComplete";
    /** 加载特效资源完毕 */
    public static readonly MsgPreLoadEffectComplete = "MsgPreLoadEffectComplete";
    /** 加载序列帧资源完毕 */
    public static readonly MsgPreLoadSequenceFrameComplete = "MsgPreLoadSequenceFrameComplete";
    /** 加载其他资源完毕 */
    public static readonly MsgPreLoadOtherComplete = "MsgPreLoadOtherComplete";

    /** 加载音乐完成 */
    public static readonly MsgPreLoadMusicComplete = "MsgPreLoadMusicComplete";
    /** 加载音效完成 */
    public static readonly MsgPreLoadSoundComplete = "MsgPreLoadSoundComplete";

    /** 加载资源完毕 */
    public static readonly MsgPreLoadComplete = "MsgPreLoadComplete";

    /** 图集字典 */
    public dictAtlas = {};
    /** 特效字典 */
    public dictEffect = {};
    /** 序列帧字典 */
    public dictSequenceFrame = {};
    /** 其他资源字典 */
    public dictOther = {};
    /** 音效资源字典 */
    public dictSound = {};
    /** 音乐资源字典 */
    public dictMusic = {};

    /**
     * 预加载图集
     */
    public preLoadAtlas() {
        let self = this;
        cc.loader.loadResDir("Atlas", cc.SpriteAtlas, function (completedCount, totalCount, item) {
            FYMessenger.Instance.send(FYResMgr.MsgPreLoadAtlasProgress, completedCount, totalCount);
        },
            function (err, assets) {
                for (let i = 0; i < assets.length; i++) {
                    for (let name in assets[i]._spriteFrames) {
                        self.dictAtlas[assets[i]._spriteFrames[name]._name] = assets[i]._spriteFrames[name];
                    }

                }
                console.log("---> MsgPreLoadAtlasComplete");
                FYMessenger.Instance.send(FYResMgr.MsgPreLoadAtlasComplete);
            });
    }

    /**
     * 预加载自动图集
     */
    public preLoadAutoAtlas() {
        let self = this;
        cc.loader.loadResDir("AutoAtlas", cc.SpriteFrame, function (completedCount, totalCount, item) {
            FYMessenger.Instance.send(FYResMgr.MsgPreLoadAutoAtlasProgress, completedCount, totalCount);
        },
            function (err, assets) {
                for (let i = 0; i < assets.length; i++) {
                    self.dictAtlas[assets[i]._name] = assets[i];

                }
                console.log("---> MsgPreLoadAutoAtlasComplete");
                FYMessenger.Instance.send(FYResMgr.MsgPreLoadAutoAtlasComplete);
            });
    }

    /**
     * 预加载特效
     */
    public preLoadEffect() {
        let self = this;
        cc.loader.loadResDir("Prefab/Effect", cc.Prefab, function (completedCount, totalCount, item) {
            FYMessenger.Instance.send(FYResMgr.MsgPreLoadEffectProgress, completedCount, totalCount)
        },
            function (err, assets) {
                for (let i = 0; i < assets.length; i++) {
                    self.dictEffect[assets[i]._name] = assets[i].data;
                }
                console.log("---> MsgPreLoadEffectComplete");
                FYMessenger.Instance.send(FYResMgr.MsgPreLoadEffectComplete);
            });
    }

    /**
     * 预加载序列帧
     */
    public preLoadSequenceFrame() {
        let self = this;
        cc.loader.loadResDir("Prefab/SequenceFrame", cc.Prefab, function (completedCount, totalCount, item) {
            FYMessenger.Instance.send(FYResMgr.MsgPreLoadSequenceFrameProgress, completedCount, totalCount)
        },
            function (err, assets) {
                for (let i = 0; i < assets.length; i++) {
                    self.dictSequenceFrame[assets[i]._name] = assets[i].data;
                }
                console.log("---> MsgPreLoadSequenceFrameComplete");
                FYMessenger.Instance.send(FYResMgr.MsgPreLoadSequenceFrameComplete);
            });
    }

    /**
     * 预加载其他资源
     */
    public preLoadOther() {
        let self = this;
        cc.loader.loadResDir("Prefab/Other", cc.Prefab, function (completedCount, totalCount, item) {
            FYMessenger.Instance.send(FYResMgr.MsgPreLoadOtherProgress, completedCount, totalCount)
        },
            function (err, assets) {
                for (let i = 0; i < assets.length; i++) {
                    self.dictOther[assets[i]._name] = assets[i].data;
                }
                console.log("---> MsgPreLoadOtherComplete");
                FYMessenger.Instance.send(FYResMgr.MsgPreLoadOtherComplete);
            });
    }

    public preLoadMusic() {
        let self = this;
        cc.loader.loadResDir("Audio/Music", cc.AudioClip, function (completedCount, totalCount, item) {
        },
            function (err, assets) {
                for (let i = 0; i < assets.length; i++) {
                    self.dictMusic[assets[i]._name] = assets[i];
                }
                console.log("---> MsgPreLoadMusicComplete");
                FYMessenger.Instance.send(FYResMgr.MsgPreLoadMusicComplete);
            });
    }

    public preLoadSound() {
        let self = this;
        cc.loader.loadResDir("Audio/Sound", cc.AudioClip, function (completedCount, totalCount, item) {
        },
            function (err, assets) {
                for (let i = 0; i < assets.length; i++) {
                    self.dictSound[assets[i]._name] = assets[i];
                }
                console.log("---> MsgPreLoadSoundComplete");
                FYMessenger.Instance.send(FYResMgr.MsgPreLoadSoundComplete);
            });
    }

    /**
     * 加载图片
     * @param spriteFrameName 图片名
     */
    public loadSpriteFrame(spriteFrameName) {
        if (spriteFrameName in this.dictAtlas) {
            return this.dictAtlas[spriteFrameName];
        }
        return null;
    }

    /**
     * 加载特效
     * @param effectName 特效名字
     */
    public loadEffect(effectName: string) {
        if (effectName in this.dictEffect) {
            return this.dictEffect[effectName];
        }
        return null;
    }

    /**
     * 播放序列帧
     * @param sequenceFrame 序列帧动画名字
     */
    public loadSequenceFrame(sequenceFrame: string) {
        if (sequenceFrame in this.dictSequenceFrame) {
            return this.dictSequenceFrame[sequenceFrame];
        }
        return null;
    }

    /**
     * 加载其他资源
     * @param otherName 其他资源名字
     */
    public loadOther(otherName: string) {
        if (otherName in this.dictOther) {
            return this.dictOther[otherName];
        }
    }
}
