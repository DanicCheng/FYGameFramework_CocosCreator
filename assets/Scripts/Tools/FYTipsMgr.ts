import FYResMgr from "./FYResMgr";
import FYTips from "./FYTips";
import FYGlobalVarMgr from "./FYGlobalVarMgr";

/** 提示管理器 */
export default class FYTipsMgr {
    public static readonly Instance: FYTipsMgr = new FYTipsMgr();
    private constructor() { }

    /** 容器 */
    private _nodeContainer: cc.Node = null;
    /** 对象池 */
    private _pool: cc.NodePool = new cc.NodePool();

    public init(nodeContainer: cc.Node) {
        this._nodeContainer = nodeContainer;
    }

    private getTips(): cc.Node {
        let nodeTips: cc.Node = null;
        if (this._pool.size() > 0) {
            nodeTips = this._pool.get();
        } else {
            nodeTips = cc.instantiate(FYResMgr.Instance.loadOther("FYTips"));
        }
        return nodeTips;
    }

    private putTips(nodeTips: cc.Node) {
        if (!nodeTips) {
            cc.error("nodeTips is null");
            return;
        }
        this._pool.put(nodeTips);
    }

    /**
     * 显示分数动画
     * @param tips 提示内容
     */
    showTips(tips: string) {
        this.addTips().setTips(tips);
    }

    public addTips(parent: cc.Node = this._nodeContainer || FYGlobalVarMgr.Instance.NodeTop): FYTips {
        let nodeTips: cc.Node = this.getTips();
        nodeTips.parent = parent;
        nodeTips.scale = 1;
        nodeTips.opacity = 255;
        let tips = nodeTips.getComponent(FYTips);
        return tips;
    }

    public removeTips(scoreTween: FYTips) {
        this.putTips(scoreTween.node);
    }
}
