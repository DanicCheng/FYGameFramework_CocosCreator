import FYResMgr from "./FYResMgr";
import QQLMGameSDK from "../SDK/QQLMGameSDK";
import { FYE } from "./FYE";
import FYSDKMgr from "./FYSDKMgr";

export default class FYAudioMgr {
    public static readonly Instance: FYAudioMgr = new FYAudioMgr();
    private constructor() { }

    private arrayMusic = {};
    private arraySound = {};
    private _bMute = false;
    private _curType: FYE.MusicType = FYE.MusicType.MainBg;

    public getSound(type: FYE.SoundType) {
        if (type in this.arraySound) {
            return this.arraySound[type];
        } else {
            this.arraySound[type] = FYSDKMgr.Instance.getSound(type);

            return this.arraySound[type];
        }
    }

    public getMusic(type: FYE.MusicType) {
        if (type in this.arrayMusic) {
            return this.arrayMusic[type];
        } else {
            this.arrayMusic[type] = FYSDKMgr.Instance.getMusic(type);

            return this.arrayMusic[type];
        }
    }

    public playSound(type: FYE.SoundType) {

        if (this._bMute) {
            return;
        }

        FYSDKMgr.Instance.playSound(this.getSound(type));
    }

    public playMusic(type: FYE.MusicType) {
        if (this._bMute) {
            return;
        }

        console.log("---> 播放背景音乐 <---");

        FYSDKMgr.Instance.playMusic(this.getMusic(type));

        this._curType = type;
    }

    public resumePre() {
        if (this._bMute) {
            return;
        }

        this.playMusic(this._curType);
    }

    public stopAllMusic() {
        for (let i in this.arrayMusic) {
            FYSDKMgr.Instance.stopMusic(this.getMusic(<FYE.MusicType>i));
        }
    }

    public stopAllSound() {
        for (let i in this.arraySound) {
            FYSDKMgr.Instance.stopSound(this.getSound(<FYE.SoundType>i));
        }
    }

    public destroyAll() {
        for (let i in this.arrayMusic) {
            this.arrayMusic[i].destroy();
        }

        for (let i in this.arraySound) {
            this.arraySound[i].destroy();
        }

        this.arrayMusic = {};
        this.arraySound = {};
    }

    /**
     * 静音
     * @param bMute 是否静音
     */
    public Mute(bMute) {
        this._bMute = bMute;
        if (this._bMute) {
            this.destroyAll();
            console.log("---> 静音")
        } else {
            this.playMusic(this._curType);
            console.log("---> 恢复声音")
        }
    }
}
