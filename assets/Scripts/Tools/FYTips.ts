import FYBaseNode from "./FYBaseNode";
import FYTipsMgr from "./FYTipsMgr";

const { ccclass, property } = cc._decorator;
/**
 * 提示对象
 */
@ccclass
export default class FYTips extends FYBaseNode {
    /** 提示内容 */
    @property(cc.Label)
    public labTips: cc.Label = null;

    public setTips(tips: string) {
        this.labTips.string = tips;
        this.playTween();
    }

    public playTween() {
        this.node.setPosition(0, 0);
        let self = this;
        this.node.opacity = 0;

        let opactityShowTween = cc.fadeTo(0.3, 255);
        let opactityHideTween = cc.fadeTo(0.3, 0);
        let moveUpTween = cc.moveBy(1.2, 0, 80);

        let cb = cc.callFunc(function () {
            FYTipsMgr.Instance.removeTips(self);
        });

        let seq = cc.sequence(opactityShowTween, cc.delayTime(0.9), opactityHideTween, cb);
        let spawn = cc.spawn(moveUpTween, seq);
        this.node.runAction(spawn);
    }
}
