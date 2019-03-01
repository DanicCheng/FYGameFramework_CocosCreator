import FYResMgr from "./FYResMgr";
import { FYE } from "./FYE";

const { ccclass, property } = cc._decorator;

/**
 * SDK管理器
 */
export default class FYSDKMgr {
    public static readonly Instance: FYSDKMgr = new FYSDKMgr();
    private constructor() { }

    private static readonly CustomSDKType: FYE.CustomSDKType = FYE.CustomSDKType.CocosCreator;

    /**
     * 保存本地数据
     * @param key 关键字
     * @param value 值
     */
    public saveLocalData(key, value) {
        cc.sys.localStorage.setItem(key, value)
    }

    /**
     * 读取本地数据，没有返回null
     * @param key 关键字
     * @param defaultValue 默认值 当没有key对应的数据时，返回该值
     */
    public loadLocalData(key, defaultValue = "0") {
        let value = cc.sys.localStorage.getItem(key);
        return value || defaultValue;
    }

    /**
     * 保存本地json数据
     * @param key 关键字
     * @param jsonData jsonData
     */
    public saveLocalJsonData(key, jsonData) {
        cc.sys.localStorage.setItem(key, JSON.stringify(jsonData));
    }

    /**
     * 读取本地json数据，没有返回null
     * @param key 关键字
     */
    public loadLocalJsonData(key) {
        var data = JSON.parse(cc.sys.localStorage.getItem(key) || JSON.stringify({}))
        return data;
    }

    /**
     * 移除本地数据，没有返回null
     * @param key 关键字
     */
    public removeLocalData(key) {
        cc.sys.localStorage.removeItem(key);
    }

    /**
    * 移除所有本地数据
   
    */
    public removeAllLocalData() {
        cc.sys.localStorage.clear();
    }

    /**
     * 将资源路径转成带MD5的资源路径
     * @param path 资源路径
     */
    public Md5Pipe(path) {
        let _path = path
        if (cc.loader.md5Pipe) {
            _path = cc.loader.md5Pipe.transformURL(_path);
        }
        return _path;
    }

    public getSound(type: FYE.SoundType) {
        if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.QQPlay) {
            let audioContext = BK.createAudioContext();
            audioContext.src = "GameRes://" + FYResMgr.Instance.dictSound[type].nativeUrl;
            return audioContext;
        } else if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.CocosCreator) {
            let audioSource = new cc.AudioSource();
            audioSource.clip = FYResMgr.Instance.dictMusic[type];
            return audioSource;
        } else if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.WX) {
            let InnerAudioContext = wx.createInnerAudioContext();
            let path = FYResMgr.Instance.dictSound[type].nativeUrl;
            let _path = FYSDKMgr.Instance.Md5Pipe(path);
            InnerAudioContext.src = _path;
            InnerAudioContext.autoplay = false;
            InnerAudioContext.loop = false;
            return InnerAudioContext;
        }
    }

    public getMusic(type: FYE.MusicType) {
        if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.QQPlay) {
            let audioContext = new BK.Audio(0, "GameRes://" + FYResMgr.Instance.dictMusic[type].nativeUrl, -1);
            // let audioContext = BK.createAudioContext();
            // audioContext.src = "GameRes://" + FYResMgr.Instance.dictMusic[type].nativeUrl;
            // audioContext.loop = true;
            return audioContext;
        } else if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.CocosCreator) {
            let audioSource = new cc.AudioSource();
            audioSource.clip = FYResMgr.Instance.dictMusic[type];
            audioSource.loop = true;
            return audioSource;
        } else if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.WX) {
            let InnerAudioContext = wx.createInnerAudioContext();
            let path = FYResMgr.Instance.dictMusic[type].nativeUrl;
            let _path = FYSDKMgr.Instance.Md5Pipe(path);
            InnerAudioContext.src = _path;
            InnerAudioContext.autoplay = false;
            InnerAudioContext.loop = true;
            return InnerAudioContext;
        }
    }

    public playSound(audio) {
        if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.QQPlay) {
            let sound = audio as BK.AudioElement;
            sound.seek(0);
            sound.play();
        } else if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.CocosCreator) {
            let sound = audio as cc.AudioSource;
            sound.play();
        } else if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.WX) {
            let sound = audio as wx.InnerAudioContext;
            sound.play();
        }
    }

    public playMusic(audio) {
        if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.QQPlay) {
            let music = audio as BK.Audio;
            music.startMusic(null);
        } else if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.CocosCreator) {
            let music = audio as cc.AudioSource;
            music.play();
        } else if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.WX) {
            let music = audio as wx.InnerAudioContext;
            music.play();
        }
    }

    public stopMusic(audio) {
        if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.QQPlay) {
            let music = audio as BK.Audio;
            music.stopMusic();
        } else if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.CocosCreator) {
            let music = audio as cc.AudioSource;
            music.stop();
        } else if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.WX) {
            let music = audio as wx.InnerAudioContext;
            music.stop();
        }
    }

    public stopSound(audio) {
        if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.QQPlay) {
            let sound = audio as BK.AudioElement;
            sound.stop();
        } else if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.CocosCreator) {
            let sound = audio as cc.AudioSource;
            sound.stop();
        } else if (FYSDKMgr.CustomSDKType == FYE.CustomSDKType.WX) {
            let sound = audio as wx.InnerAudioContext;
            sound.stop();
        }
    }
}
