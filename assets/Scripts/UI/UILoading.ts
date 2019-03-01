import FYBaseUI from "../Tools/FYBaseUI";
import { FYE } from "../Tools/FYE";
import FYMessenger from "../Tools/FYMessenger";
import FYResMgr from "../Tools/FYResMgr";
import FYUIMgr from "../Tools/FYUIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UILoading extends FYBaseUI {
    /** 加载进度 */
    @property(cc.Sprite)
    public sprProgressFg: cc.Sprite = null;
    /** 需要预加载的资源数 */
    private _nNeedPreNum = 2;
    /** 当前预加载的资源数 */
    private _nCurPreNum = 0;

    addListener() {
        super.addListener();

        FYMessenger.Instance.add(FYResMgr.MsgPreLoadAutoAtlasComplete, this.onPreLoadComplete, this);
        FYMessenger.Instance.add(FYUIMgr.MsgPreLoadUIComplete, this.onPreLoadComplete, this);
    }

    removeListener() {
        super.removeListener();

        FYMessenger.Instance.remove(FYResMgr.MsgPreLoadAutoAtlasComplete, this.onPreLoadComplete, this);
        FYMessenger.Instance.remove(FYUIMgr.MsgPreLoadUIComplete, this.onPreLoadComplete, this);
    }

    // -------------------------- 回调 ------------------------- //

    onPreLoadComplete(msgType: FYE.MsgType) {
        this._nCurPreNum++;
        this.sprProgressFg.fillRange = this._nCurPreNum / this._nNeedPreNum;
        if (this._nCurPreNum == this._nNeedPreNum) {
            FYUIMgr.Instance.show(FYE.UIName.UIDemo);
            this.setActive(false);
        }
    }

    // ------------------------- 声明周期 -------------------------------- //

    onLoad() {
        this.setActive(true);
    }

    start() {
        this.sprProgressFg.fillRange = this._nCurPreNum / this._nNeedPreNum;
    }

}
