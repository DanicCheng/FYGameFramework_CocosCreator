import FYResMgr from "./Tools/FYResMgr";
import FYUIMgr from "./Tools/FYUIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    start() {
        FYResMgr.Instance.preLoadAutoAtlas();
        FYResMgr.Instance.preLoadOther();
        FYUIMgr.Instance.preLoad();
    }
}
