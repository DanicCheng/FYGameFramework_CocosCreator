import FYBaseUI from "../Tools/FYBaseUI";
import FYResMgr from "../Tools/FYResMgr";
import FYTipsMgr from "../Tools/FYTipsMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIDemo extends FYBaseUI {

    @property(cc.Sprite)
    img1: cc.Sprite = null;

    @property(cc.Sprite)
    img2: cc.Sprite = null;

    @property(cc.Sprite)
    img3: cc.Sprite = null;

    start() {
        this.img1.spriteFrame = FYResMgr.Instance.loadSpriteFrame("imgWhite");
        this.img2.spriteFrame = FYResMgr.Instance.loadSpriteFrame("imgCircle");
        this.img3.spriteFrame = FYResMgr.Instance.loadSpriteFrame("imgWhite");

        FYTipsMgr.Instance.showTips("提示信息");
    }

    // update (dt) {}
}
