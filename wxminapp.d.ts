// Type definitions for weapp v0.12.130400

/**
 * App 实现的接口对象
 */
declare interface IApp {

    /**
     * 生命周期函数--监听小程序初始化。当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
	onLaunch?: () => void;

    /**
     * 生命周期函数--监听小程序显示。当小程序启动，或从后台进入前台显示，会触发 onShow
     */
	onShow?: () => void;

    /**
     * 生命周期函数--监听小程序隐藏。当小程序从前台进入后台，会触发 onHide
     */
	onHide?: () => void;

    /**
     * 错误监听函数--当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
	onError?: (msg: string) => void;
}

/**
 * App() 函数用来注册一个小程序。接受一个 object 参数，其指定小程序的生命周期函数等。
 */
declare function App(app: IApp): void;

/**
 * 获取小程序实例
 */
declare function getApp(): IApp;

/**
 * Page 实现的接口对象
 */
declare interface IPage {

    /**
     * [read-only]页面的初始数据
     */
	data?: any;

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad?: () => void;

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
	onReady?: () => void;

    /**
     * 生命周期函数--监听页面显示
     */
	onShow?: () => void;

    /**
     * 生命周期函数--监听页面隐藏
     */
	onHide?: () => void;

    /**
     * 生命周期函数--监听页面卸载
     */
	onUnload?: () => void;

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
	onPullDownRefresh?: () => void;

    /**
     * 页面上拉触底事件的处理函数
     */
	onReachBottom?: () => void;

	onShareAppMessage?: () => wx.ShareOptions;

    /**
     * 将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
     */
	setData?: (data: any) => void;

    /**
     * 强制更新
     */
	forceUpdate?: () => void;

    /**
     * 更新
     */
	update?: () => void;
}

/**
 * Page() 函数用来注册一个页面。
 * 接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。
 */
declare function Page(page: IPage): void;

/**
 * getCurrentPages() 函数用于获取当前页面栈的实例，
 * 以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
 */
declare function getCurrentPages(): IPage[];

declare namespace wx {

	export interface BaseOptions {

        /**
         * 接口调用成功的回调函数
         */
		success?: () => void;

        /**
         * 接口调用失败的回调函数
         */
		fail?: () => void;

        /**
         * 接口调用结束的回调函数（调用成功、失败都会执行）
         */
		complete?: () => void;
	}

	export interface ShareOptions {

        /**
         * 分享标题, 默认为当前小程序名称
         */
		title?: string;

        /**
         * 分享描述, 默认为当前小程序名称
         */
		desc?: string;

        /**
         * 分享路径, 默认为当前页面path, 必须是以 / 开头的完整路径
         */
		path?: string;
	}

	export interface IData {
		[key: string]: any;
	}

	// ---------------------------------- 网络API列表 ----------------------------------

	export interface RequestResult {

        /**
         * 开发者服务器返回的内容
         */
		data: any;
	}

	export interface RequestOptions extends BaseOptions {

        /**
         * 开发者服务器接口地址
         */
		url: string;

        /**
         * 请求的参数
         */
		data?: string | IData;

        /**
         * 设置请求的 header , header 中不能设置 Referer
         */
		header?: IData;

        /**
         * 默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         */
		method?: string;

        /**
         * 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
         */
		success?: (res?: RequestResult) => void;
	}

    /**
     * 发起网络请求。`wx.request`发起的是https请求。**一个微信小程序，同时只能有5个网络请求连接**。
     */
	export function request(options: RequestOptions): void;

	export interface UploadFileResult {

        /**
         * 开发者服务器返回的数据
         */
		data: string;

        /**
         * HTTP状态码
         */
		statusCode: number;
	}

	export interface UploadFileOptions extends BaseOptions {

        /**
         * 开发者服务器 url
         */
		url: string;

        /**
         * 要上传文件资源的路径
         */
		filePath: string;

        /**
         * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
         */
		name: string;

        /**
         * HTTP 请求 Header , header 中不能设置 Referer
         */
		header?: IData;

        /**
         * HTTP 请求中其他额外的 form data
         */
		formData?: IData;

        /**
         * 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
         */
		success?: (res?: UploadFileResult) => void;
	}

    /**
     * 将本地资源上传到开发者服务器。
     * 如页面通过 [wx.chooseImage](#wx.chooseImage) 等接口获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器。
     * 客户端发起一个 HTTPS POST 请求，其中 `Content-Type` 为 `multipart/form-data` 。
     */
	export function uploadFile(options: UploadFileOptions): void;

	export interface DownloadFileResult {

        /**
         * 文件的临时路径
         */
		tempFilePath: string;
	}

	export interface DownloadFileOptions extends BaseOptions {

        /**
         * 下载资源的 url
         */
		url: string;

        /**
         * HTTP 请求 Header
         */
		header?: IData;

        /**
         * 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
         */
		success?: (res?: DownloadFileResult) => void;
	}

    /**
     * 下载文件资源到本地。
     * 客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径。
     */
	export function downloadFile(options: DownloadFileOptions): void;

	export interface ConnectSocketOptions extends BaseOptions {

        /**
         * 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
         */
		url: string;

        /**
         * 请求的数据
         */
		data?: string;

        /**
         * HTTP Header , header 中不能设置 Referer
         */
		header?: IData;

        /**
         * 默认是GET，有效值为： OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         */
		method?: string;
	}

    /**
     * 创建一个 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket?t=1477656499061) 连接；
     * **一个微信小程序同时只能有一个 WebSocket 连接，如果当前已存在一个 WebSocket 连接，会自动关闭该连接，并重新创建一个 WebSocket 连接**。
     */
	export function connectSocket(options: ConnectSocketOptions): void;

    /**
     * 监听WebSocket连接打开事件。
     */
	export function onSocketOpen(callback: (res?: any) => void): void;

    /**
     * 监听WebSocket错误。
     */
	export function onSocketError(callback: (res?: any) => void): void;

	export interface SendSocketMessageOptions extends BaseOptions {

        /**
         * 需要发送的内容
         */
		data: string | any[];
	}

    /**
     * 通过 WebSocket 连接发送数据，需要先 [wx.connectSocket](#wx.connectSocket)，并在 [wx.onSocketOpen](#wx.onSocketOpen) 回调之后才能发送。
     */
	export function sendSocketMessage(options: SendSocketMessageOptions): void;

	export interface SocketMessageResponse {

        /**
         * 服务器返回的消息
         */
		data: string | any[];
	}

    /**
     * 监听WebSocket接受到服务器的消息事件。
     */
	export function onSocketMessage(callback: (res?: SocketMessageResponse) => void): void;

    /**
     * 关闭WebSocket连接。
     */
	export function closeSocket(): void;

    /**
     * 监听WebSocket关闭。
     */
	export function onSocketClose(callback: (res?: any) => void): void;

	// ---------------------------------- 媒体API列表 ----------------------------------

	export interface ChooseImageResult {

        /**
         * 本地文件路径列表
         */
		tempFilePaths: string;
	}

	export interface ChooseImageOptions extends BaseOptions {

        /**
         * 最多可以选择的图片张数，默认9
         */
		count?: number;

        /**
         * original 原图，compressed 压缩图，默认二者都有
         */
		sizeType?: string[];

        /**
         * album 从相册选图，camera 使用相机，默认二者都有
         */
		sourceType?: string[];

        /**
         * 成功则返回图片的本地文件路径列表 tempFilePaths
         */
		success?: (res?: ChooseImageResult) => void;
	}

    /**
     * 从本地相册选择图片或使用相机拍照。
     */
	export function chooseImage(options: ChooseImageOptions): void;

	export interface PreviewImageOptions extends BaseOptions {

        /**
         * 当前显示图片的链接，不填则默认为 urls 的第一张
         */
		current?: string;

        /**
         * 需要预览的图片链接列表
         */
		urls: string[];
	}

    /**
     * 预览图片。
     */
	export function previewImage(options: PreviewImageOptions): void;

	export interface GetImageInfoResult {

        /**
         * 图片宽度，单位px
         */
		width: number;

        /**
         * 图片高度 单位px
         */
		height: number;
	}

	export interface GetImageInfoOptions extends BaseOptions {

        /**
         * 图片的路径，可以是相对路径，临时文件路径，存储文件路径
         */
		src: string;

        /**
         * 接口调用成功的回调函数，包含图片信息
         */
		success?: (res?: GetImageInfoResult) => void;
	}

    /**
     * 获取图片信息
     */
	export function getImageInfo(options: GetImageInfoOptions): void;

	export interface StartRecordResult {

        /**
         * 录音文件的临时路径
         */
		tempFilePath: string;
	}

	export interface StartRecordOptions extends BaseOptions {

        /**
         * 录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'}
         */
		success?: (res?: StartRecordResult) => void;
	}

    /**
     * 开始录音。当主动调用 `wx.stopRecord`，或者录音超过1分钟时自动结束录音，返回录音文件的临时文件路径。
     */
	export function startRecord(options: StartRecordOptions): void;

    /**
     *​ 主动调用停止录音。
     */
	export function stopRecord(): void;

	export interface PlayVoiceOptions extends BaseOptions {

        /**
         * 需要播放的语音文件的文件路径
         */
		filePath: string;
	}

    /**
     * 开始播放语音，同时只允许一个语音文件正在播放，如果前一个语音文件还没播放完，将中断前一个语音播放。
     */
	export function playVoice(options: PlayVoiceOptions): void;

    /**
     * 暂停正在播放的语音。
     * 再次调用wx.playVoice播放同一个文件时，会从暂停处开始播放。如果想从头开始播放，需要先调用 wx.stopVoice。
     */
	export function pauseVoice(): void;

    /**
     * 结束播放语音。
     */
	export function stopVoice(): void;

	export interface GetBackgroundAudioPlayerStateResult {

        /**
         * 选定音频的长度（单位：s），只有在当前有音乐播放时返回
         */
		duration: number;

        /**
         * 选定音频的播放位置（单位：s），只有在当前有音乐播放时返回
         */
		currentPosition: number;

        /**
         * 播放状态（2：没有音乐在播放，1：播放中，0：暂停中）
         */
		status: number;

        /**
         * 音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回
         */
		downloadPercent: number;

        /**
         * 歌曲数据链接，只有在当前有音乐播放时返回
         */
		dataUrl: string;
	}

	export interface GetBackgroundAudioPlayerStateOptions extends BaseOptions {

        /**
         * 接口调用成功的回调函数
         */
		success?: (res?: GetBackgroundAudioPlayerStateResult) => void;
	}

    /**
     * 获取音乐播放状态。
     */
	export function getBackgroundAudioPlayerState(options: GetBackgroundAudioPlayerStateOptions): void;

	export interface PlayBackgroundAudioOptions extends BaseOptions {

        /**
         * 音乐链接
         */
		dataUrl: string;

        /**
         * 音乐标题
         */
		title?: string;

        /**
         * 封面URL
         */
		coverImgUrl?: string;
	}

    /**
     * 播放音乐，同时只能有一首音乐正在播放。
     */
	export function playBackgroundAudio(options: PlayBackgroundAudioOptions): void;

    /**
     * 暂停播放音乐。
     */
	export function pauseBackgroundAudio(): void;

	export interface SeekBackgroundAudioOptions extends BaseOptions {

        /**
         * 音乐位置，单位：秒
         */
		position: number;
	}

    /**
     * 播放音乐，同时只能有一首音乐正在播放。
     */
	export function seekBackgroundAudio(options: SeekBackgroundAudioOptions): void;

    /**
     * 停止播放音乐。
     */
	export function stopBackgroundAudio(): void;

    /**
     * 监听音乐播放。
     */
	export function onBackgroundAudioPlay(callback: (res?: any) => void): void;

    /**
     * 监听音乐暂停。
     */
	export function onBackgroundAudioPause(callback: (res?: any) => void): void;

    /**
     * 监听音乐停止。
     */
	export function onBackgroundAudioStop(callback: (res?: any) => void): void;

	export interface ChooseVideoResult {

        /**
         * 选定视频的临时文件路径
         */
		tempFilePath: string;

        /**
         * 选定视频的时间长度
         */
		duration: number;

        /**
         * 选定视频的数据量大小
         */
		size: number;

        /**
         * 返回选定视频的长
         */
		height: number;

        /**
         * 返回选定视频的宽
         */
		width: number;
	}

	export interface ChooseVideoOptions extends BaseOptions {

        /**
         * album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
         */
		sourceType?: string[];

        /**
         * 拍摄视频最长拍摄时间，单位秒。最长支持60秒
         */
		maxDuration?: number;

        /**
         * 前置或者后置摄像头，默认为前后都有，即：['front', 'back']
         */
		camera?: string[];

        /**
         * 接口调用成功，返回视频文件的临时文件路径
         */
		success?: (res?: ChooseVideoResult) => void;
	}

    /**
     * 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。
     */
	export function chooseVideo(options: ChooseVideoOptions): void;

    /**
     * `audioContext` 通过 audioId 跟一个 audio 组件绑定，通过它可以操作一个 audio 组件。
     */
	export interface AudioContext {

        /**
         * 音频的地址
         */
		setSrc(src: string): void;

        /**
         * 播放
         */
		play(): void;

        /**
         * 暂停
         */
		pause(): void;

        /**
         * 跳转到指定位置，单位 s
         */
		seek(position: number): void;
	}

    /**
     * 创建并返回 audio 上下文 `AudioContext` 对象
     */
	export function createAudioContext(audioId: string): AudioContext;

    /**
     * `videoContext` 通过 videoId 跟一个 video 组件绑定，通过它可以操作一个 video 组件。
     */
	export interface VideoContext {

        /**
         * 播放
         */
		play(): void;

        /**
         * 暂停
         */
		pause(): void;

        /**
         * 跳转到指定位置，单位 s
         */
		seek(position: number): void;

        /**
         * 发送弹幕，danmu 包含两个属性 text, color
         */
		sendDanmu(danmu: { text: string, color: string }): void;
	}

    /**
     * 创建并返回 video 上下文 `VideoContext` 对象
     */
	export function createVideoContext(videoId: string): VideoContext;

	export interface SaveFileResult {

        /**
         * 文件的保存路径
         */
		savedFilePath: string;
	}

	export interface SaveFileOptions extends BaseOptions {

        /**
         * 需要保存的文件的临时路径
         */
		tempFilePath: string;

        /**
         * 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'}
         */
		success?: (res?: SaveFileResult) => void;
	}

    /**
     * 保存文件到本地。
     */
	export function saveFile(options: SaveFileOptions): void;

	export interface FileListItem {

        /**
         * 文件的本地路径
         */
		filePath: string;

        /**
         * 文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
         */
		createTime: number;

        /**
         * 文件大小，单位B
         */
		size: number;
	}

	export interface GetSavedFileListResult {

        /**
         * 接口调用结果
         */
		errMsg: string;

        /**
         * 文件列表
         */
		fileList: FileListItem[];
	}

	export interface GetSavedFileListOptions extends BaseOptions {

        /**
         * 接口调用成功的回调函数
         */
		success?: (res?: GetSavedFileListResult) => void;
	}

    /**
     * 获取本地已保存的文件列表
     */
	export function getSavedFileList(options: GetSavedFileListOptions): void;

	export interface GetSavedFileInfoResult {

        /**
         * 接口调用结果
         */
		errMsg: string;

        /**
         * 文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
         */
		createTime: number;

        /**
         * 文件大小，单位B
         */
		size: number;
	}

	export interface GetSavedFileInfoOptions extends BaseOptions {

        /**
         * 文件路径
         */
		filePath: string;

        /**
         * 接口调用成功的回调函数
         */
		success?: (res?: GetSavedFileInfoResult) => void;
	}

    /**
     * 获取本地文件的文件信息
     */
	export function getSavedFileInfo(options: GetSavedFileInfoOptions): void;

	export interface RemoveSavedFileOptions extends BaseOptions {

        /**
         * 需要删除的文件路径
         */
		filePath: string;
	}

    /**
     * 删除本地存储的文件
     */
	export function removeSavedFile(options: RemoveSavedFileOptions): void;

	export interface OpenDocumentOptions extends BaseOptions {

        /**
         * 文件路径，可通过 downFile 获得
         */
		filePath: string;
	}

    /**
     * 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
     */
	export function openDocument(options: OpenDocumentOptions): void;

	// ---------------------------------- 数据API列表 ----------------------------------

	export interface SetStorageOptions extends BaseOptions {

        /**
         * 本地缓存中的指定的 key
         */
		key: string;

        /**
         * 需要存储的内容
         */
		data: any;
	}

    /**
     * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
     */
	export function setStorage(options: SetStorageOptions): void;

    /**
     * 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
     */
	export function setStorageSync(key: string, data: any): void;

	export interface GetStorageResult {

        /**
         * key对应的内容
         */
		data: any;
	}

	export interface GetStorageOptions extends BaseOptions {

        /**
         * 本地缓存中的指定的 key
         */
		key: string;

        /**
         * 接口调用的回调函数,res = {data: key对应的内容}
         */
		success?: (res?: GetStorageResult) => void;
	}

    /**
     * 从本地缓存中异步获取指定 key 对应的内容。
     */
	export function getStorage(options: GetStorageOptions): void;

    /**
     * 从本地缓存中同步获取指定 key 对应的内容。
     */
	export function getStorageSync(key: string): any;

	export interface GetStorageInfoResult {

        /**
         * 当前storage中所有的key
         */
		keys: string[];

        /**
         * 当前占用的空间大小, 单位kb
         */
		currentSize: number;

        /**
         * 限制的空间大小，单位kb
         */
		limitSize: number;
	}

	export interface GetStorageInfoOptions extends BaseOptions {

        /**
         * 接口调用的回调函数
         */
		success?: (res?: GetStorageInfoResult) => void;
	}

    /**
     * 从本地缓存中异步获取指定 key 对应的内容。
     */
	export function getStorageInfo(options: GetStorageInfoOptions): void;

    /**
     * 从本地缓存中同步获取指定 key 对应的内容。
     */
	export function getStorageInfoSync(): GetStorageInfoResult;

	export interface RemoveStorageOptions extends BaseOptions {

        /**
         * 本地缓存中的指定的 key
         */
		key: string;
	}

    /**
     * 从本地缓存中异步移除指定 key 。
     */
	export function removeStorage(options: RemoveStorageOptions): void;

    /**
     * 从本地缓存中同步移除指定 key 。
     */
	export function removeStorageSync(key: string): void;

    /**
     * 清理本地数据缓存。
     */
	export function clearStorage(): void;

    /**
     * 同步清理本地数据缓存。
     */
	export function clearStorageSync(): void;

	// ---------------------------------- 位置API列表 ----------------------------------

	export interface Location {
        /**
         * 纬度，浮点数，范围为-90~90，负数表示南纬
         */
		latitude: number;

        /**
         * 经度，浮点数，范围为-180~180，负数表示西经
         */
		longitude: number;
	}

	export interface GetLocationResult extends Location {

        /**
         * 速度，浮点数，单位m/s
         */
		speed: number;

        /**
         * 位置的精确度
         */
		accuracy: number;
	}

	export interface GetLocationOptions extends BaseOptions {

        /**
         * 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 `wx.openLocation` 的坐标
         */
		type?: string;

        /**
         * 接口调用成功的回调函数
         */
		success?: (res?: GetLocationResult) => void;
	}

    /**
     * 获取当前的地理位置、速度。
     */
	export function getLocation(options: GetLocationOptions): void;

	export interface ChooseLocationResult extends Location {

        /**
         * 位置名称
         */
		name: string;

        /**
         * 详细地址
         */
		address: string;
	}

	export interface ChooseLocationOptions extends BaseOptions {

        /**
         * 接口调用成功的回调函数
         */
		success?: (res?: ChooseLocationResult) => void;
	}

    /**
     * 打开地图选择位置
     */
	export function chooseLocation(options: ChooseLocationOptions): void;

	export interface OpenLocationOptions extends BaseOptions, Location {

        /**
         * 缩放比例，范围1~28，默认为28
         */
		scale?: number;

        /**
         * 位置名
         */
		name?: string;

        /**
         * 地址的详细说明
         */
		address?: string;
	}

    /**
     * 使用微信内置地图查看位置
     */
	export function openLocation(options: OpenLocationOptions): void;

	export interface GetCenterLocationOptions extends BaseOptions {

        /**
         * 接口调用成功的回调函数 ，res = { longitude: "经度", latitude: "纬度"}
         */
		success?: (res?: Location) => void;
	}

    /**
     * mapContext 通过 mapId 跟一个 <map/> 组件绑定，通过它可以操作对应的 <map/> 组件。
     */
	export interface MapContext {

        /**
         * 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 wx.openLocation
         */
		getCenterLocation(options: GetCenterLocationOptions): void;

        /**
         * 将地图中心移动到当前定位点，需要配合map组件的show-location使用
         */
		moveToLocation(): void;
	}

    /**
     * 创建并返回 map 上下文 mapContext 对象
     */
	export function createMapContext(mapId: string): MapContext;

	// ---------------------------------- 设备API列表 ----------------------------------

	export interface GetNetworkTypeResult {

        /**
         * 网络类型
         */
		networkType: '2g' | '3g' | '4g' | 'wifi';
	}

	export interface GetNetworkTypeOptions extends BaseOptions {

        /**
         * 接口调用成功，返回网络类型 networkType
         */
		success?: (res?: GetNetworkTypeResult) => void;
	}

    /**
     * 获取网络类型。
     */
	export function getNetworkType(options: GetNetworkTypeOptions): void;

	export interface GetSystemInfoResult {

        /**
         * 手机型号
         */
		model: string;

        /**
         * 设备像素比
         */
		pixelRadio: string;

        /**
         * 窗口宽度
         */
		windowWidth: number;

        /**
         * 窗口高度
         */
		windowHeight: number;

        /**
         * 微信设置的语言
         */
		language: string;

        /**
         * 微信版本号
         */
		version: string;

        /**
         * 操作系统版本
         */
		system: string;

        /**
         * 客户端平台
         */
		platform: string;

		/**
		 * SDK版本
		 */
		SDKVersion: string;
	}

	export interface GetSystemInfoOptions extends BaseOptions {

		/**
		 * 接口调用成功的回调
		 */
		success?: (res?: GetSystemInfoResult) => void;
	}

	/**
	 * 获取系统信息。
	 */
	export function getSystemInfo(options: GetSystemInfoOptions): void;

	/**
	 * 获取系统信息同步接口
	 */
	export function getSystemInfoSync(): GetSystemInfoResult;

	export interface AccelerometerChangeResponse {

		/**
		 * X 轴
		 */
		x: number;

		/**
		 * Y 轴
		 */
		y: number;

		/**
		 * Z 轴
		 */
		z: number;
	}

	/**
	 * 监听重力感应数据，频率：5次/秒
	 */
	export function onAccelerometerChange(callback: (res?: AccelerometerChangeResponse) => void): void;

	export interface CompassChangeResponse {

		/**
		 * 面对的方向度数
		 */
		direction: number;
	}

	/**
	 * 监听罗盘数据，频率：5次/秒
	 */
	export function onCompassChange(callback: (res?: CompassChangeResponse) => void): void;

	export interface MakePhoneCallOptions {

		/**
		 * 需要拨打的电话号码
		 */
		phoneNumber: number;
	}

	/**
	 * 拨打电话
	 */
	export function makePhoneCall(options: MakePhoneCallOptions): void;

	export interface ScanCodeResult {

		/**
		 * 码的内容
		 */
		result: string;

		/**
		 * 所扫码的类型
		 */
		scanType: string;

		/**
		 * 所扫码的字符集
		 */
		charSet: string;

		/**
		 * 当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的 path
		 */
		path: string;
	}

	export interface ScanCodeOptions extends BaseOptions {

		/**
		 * 接口调用成功的回调函数
		 */
		success?: (res?: ScanCodeResult) => void;
	}

	/**
	 * 调起客户端扫码界面，扫码成功后返回对应的结果
	 */
	export function scanCode(options: ScanCodeOptions): void;

	// ---------------------------------- 界面API列表 ----------------------------------

	export interface ShowToastOptions extends BaseOptions {

		/**
		 * 提示的内容
		 */
		title: string;

		/**
		 * 图标，只支持"success"、"loading"
		 */
		icon?: 'success' | 'loading';

		/**
		 * 提示的延迟时间，单位毫秒，默认：1500, 最大为10000
		 */
		duration?: number;

		/**
		 * 是否显示透明蒙层，防止触摸穿透，默认：false
		 */
		mask?: boolean;
	}

	/**
	 * 显示消息提示框
	 */
	export function showToast(options: ShowToastOptions): void;

	/**
	 * 隐藏消息提示框
	 */
	export function hideToast(): void;

	export interface ShowModalResult {

		/**
		 * confirm==1时，表示用户点击确定按钮
		 */
		confirm: number;
	}

	export interface ShowModalOptions extends BaseOptions {

		/**
		 * 提示的标题
		 */
		title: string;

		/**
		 * 提示的内容
		 */
		content: string;

		/**
		 * 是否显示取消按钮，默认为 true
		 */
		showCancel?: boolean;

		/**
		 * 取消按钮的文字，默认为"取消"
		 */
		cancelText?: string;

		/**
		 * 取消按钮的文字颜色，默认为"#000000"
		 */
		cancelColor?: string;

		/**
		 * 确定按钮的文字，默认为"确定"
		 */
		confirmText?: string;

		/**
		 * 确定按钮的文字颜色，默认为"#3CC51F"
		 */
		confirmColor?: string;

		/**
		 * 接口调用成功的回调函数，返回res.confirm==1时，表示用户点击确定按钮
		 */
		success?: (res?: ShowModalResult) => void;
	}

	/**
	 * 显示消息提示框
	 */
	export function showModal(options: ShowModalOptions): void;

	export interface ShowActionSheetResult {

		/**
		 * 用户是否取消选择
		 */
		cancel: boolean;

		/**
		 * 用户点击的按钮，从上到下的顺序，从0开始
		 */
		tapIndex: number;
	}

	export interface ShowActionSheetOptions extends BaseOptions {

		/**
		 * 按钮的文字数组，数组长度最大为6个
		 */
		itemList: string[];

		/**
		 * 按钮的文字颜色，默认为"#000000"
		 */
		itemColor?: string;

		/**
		 * 接口调用成功的回调函数
		 */
		success?: (res?: ShowActionSheetResult) => void;
	}

	/**
	 * 显示操作菜单
	 */
	export function showActionSheet(options: ShowActionSheetOptions): void;

	export interface SetNavigationBarTitleOptions extends BaseOptions {

		/**
		 * 页面标题
		 */
		title: string;
	}

	/**
	 * 动态设置当前页面的标题。
	 */
	export function setNavigationBarTitle(options: SetNavigationBarTitleOptions): void;

	/**
	 * 在当前页面显示导航条加载动画。
	 */
	export function showNavigationBarLoading(): void;

	/**
	 * 隐藏导航条加载动画。
	 */
	export function hideNavigationBarLoading(): void;

	export interface NavigateToOptions extends BaseOptions {

		/**
		 * 需要跳转的应用内页面的路径 , 路径后可以带参数。
		 * 参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'
		 */
		url: string;
	}

	/**
	 * 保留当前页面，跳转到应用内的某个页面，使用 `wx.navigateBack` 可以返回到原页面。
	 */
	export function navigateTo(options: NavigateToOptions): void;

	export interface RedirectToOptions extends BaseOptions {

		/**
		 * 需要跳转的应用内页面的路径
		 */
		url: string;
	}

	/**
	 * 关闭当前页面，跳转到应用内的某个页面。
	 */
	export function redirectTo(options: RedirectToOptions): void;

	export interface SwitchTabOptions extends BaseOptions {

		/**
		 * 需要跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数
		 */
		url: string;
	}

	/**
	 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
	 */
	export function switchTab(options: SwitchTabOptions): void;

	export interface NavigateBackOptions {

		/**
		 * 返回的页面数，如果 delta 大于现有页面数，则返回到首页。默认值为1。
		 */
		delta?: number;
	}

	/**
	 * 关闭当前页面，返回上一页面或多级页面。可通过 `getCurrentPages()` 获取当前的页面栈，决定需要返回几层。
	 */
	export function navigateBack(options: NavigateBackOptions): void;

	/**
	 * 动画实例可以调用以下方法来描述动画，调用结束后会返回自身，支持链式调用的写法。
	 */
	export interface Animation {

		/**
		 * 表示一组动画完成，可以在一组动画中调用任意多个动画方法，一组动画中的所有动画会同时开始，一组动画完成后才会进行下一组动画。
		 */
		step(options: AnimationOptions): void;

		/**
		 * 导出动画数据传递给组件的animation属性
		 */
		export(): any;

		// 样式

		/**
		 * 透明度，参数范围 0~1
		 */
		opacity(value: number): this;

		/**
		 * 颜色值
		 */
		backgroundColor(color: string): this;

		/**
		 * 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值
		 */
		width(value: number | string): this;

		/**
		 * 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值
		 */
		height(value: number | string): this;

		/**
		 * 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值
		 */
		top(value: number | string): this;

		/**
		 * 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值
		 */
		left(value: number | string): this;

		/**
		 * 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值
		 */
		bottom(value: number | string): this;

		/**
		 * 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值
		 */
		right(value: number | string): this;

		// 旋转

		/**
		 * deg的范围-180~180，从原点顺时针旋转一个deg角度
		 */
		rotate(value: number): this;

		/**
		 * deg的范围-180~180，在X轴旋转一个deg角度
		 */
		rotateX(value: number): this;

		/**
		 * deg的范围-180~180，在Y轴旋转一个deg角度
		 */
		rotateY(value: number): this;

		/**
		 * deg的范围-180~180，在Z轴旋转一个deg角度
		 */
		rotateZ(value: number): this;

		/**
		 * 同 [transform-function rotate3d](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate3d?t=1477656494026)
		 */
		rotate3d(x: number, y: number, z: number, a: number): this;

		// 缩放

		/**
		 * 一个参数时，表示在X轴、Y轴同时缩放sx倍数；两个参数时表示在X轴缩放sx倍数，在Y轴缩放sy倍数
		 */
		scale(sx: number, sy?: number): this;

		/**
		 * 在X轴缩放sx倍数
		 */
		scaleX(sx: number): this;

		/**
		 * 在Y轴缩放sy倍数
		 */
		scaleY(sy: number): this;

		/**
		 * 在Z轴缩放sz倍数
		 */
		scaleZ(sz: number): this;

		/**
		 * 在X轴缩放sx倍数，在Y轴缩放sy倍数，在Z轴缩放sz倍数
		 */
		scale3d(sx: number, sy: number, sz: number): this;

		// 偏移

		/**
		 * 一个参数时，表示在X轴偏移tx，单位px；两个参数时，表示在X轴偏移tx，在Y轴偏移ty，单位px。
		 */
		translate(tx: number, ty?: number): this;

		/**
		 * 在X轴偏移tx，单位px
		 */
		translateX(tx: number): this;

		/**
		 * 在Y轴偏移ty，单位px
		 */
		translateY(ty: number): this;

		/**
		 * 在Z轴偏移tz，单位px
		 */
		translateZ(tz: number): this;

		/**
		 * 在X轴偏移tx，在Y轴偏移ty，在Z轴偏移tz，单位px
		 */
		translate3d(tx: number, ty: number, tz: number): this;

		// 倾斜

		/**
		 * 参数范围-180~180；一个参数时，Y轴坐标不变，X轴坐标延顺时针倾斜ax度；两个参数时，分别在X轴倾斜ax度，在Y轴倾斜ay度
		 */
		skew(ax: number, ay?: number): this;

		/**
		 * 参数范围-180~180；Y轴坐标不变，X轴坐标延顺时针倾斜ax度
		 */
		skewX(ax: number): this;

		/**
		 * 参数范围-180~180；X轴坐标不变，Y轴坐标延顺时针倾斜ay度
		 */
		skewY(ay: number): this;

		// 矩阵变形

		/**
		 * 同 [transform-function matrix](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix?t=1477656494026)
		 */
		matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): this;

		/**
		 * 同 [transform-function matrix3d](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d?t=1477656494026)
		 */
		matrix3d(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number,
			a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number): this;
	}

	export interface AnimationOptions {

		/**
		 * 动画持续时间，单位ms，默认值 400
		 */
		duration?: number;

		/**
		 * 定义动画的效果，默认值"linear"
		 */
		timingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | 'step-start' | 'step-end';

		/**
		 * 动画延迟时间，单位 ms，默认值 0
		 */
		delay?: number;

		/**
		 * 设置transform-origin，默认为"50% 50% 0"
		 */
		transformOrigin?: string;
	}

	export function createAnimation(options?: AnimationOptions): Animation;

	export interface CanvasContext {

		/**
		 * 获取当前 `context` 上存储的绘图动作
		 */
		getActions(): any[];

		/**
		 * 清空当前的存储绘图动作
		 */
		clearActions(): void;

		// 变形

		/**
		 * 在调用 `scale` 方法后，之后创建的路径其横纵坐标会被缩放。多次调用 `scale`，倍数会相乘。
		 * @param scaleWidth 横坐标缩放的倍数
		 * @param scaleHeight 纵坐标轴缩放的倍数
		 */
		scale(scaleWidth: number, scaleHeight: number): void;

		/**
		 * 以原点为中心，原点可以用 translate方法修改。顺时针旋转当前坐标轴。多次调用rotate，旋转的角度会叠加。
		 * @param rotate 旋转角度，以弧度计，范围为 0 ~ 2π
		 */
		rotate(rotate: number): void;

		/**
		 * 对当前坐标系的原点(0, 0)进行变换，默认的坐标系原点为页面左上角。
		 * @param x 水平坐标平移量
		 * @param y 竖直坐标平移量
		 */
		translate(x: number, y: number): void;

		/**
		 * 保存当前坐标轴的缩放、旋转、平移信息
		 */
		save(): void;

		/**
		 * 恢复之前保存过的坐标轴的缩放、旋转、平移信息
		 */
		restore(): void;

		// 绘制

		/**
		 * 清除画布上在该矩形区域内的内容。
		 * @param x 矩形区域左上角的x坐标
		 * @param y 矩形区域左上角的y坐标
		 * @param width 矩形区域的宽度
		 * @param height 矩形区域的高度
		 */
		clearRect(x: number, y: number, width: number, height: number): void;

		/**
		 * 在画布上绘制被填充的文本。
		 * @param text 在画布上输出的文本
		 * @param x	绘制文本的左上角x坐标位置
		 * @param y 绘制文本的左上角y坐标位置
		 */
		fillText(text: string, x: number, y: number): void;

		/**
		 * 绘制图像，图像保持原始尺寸。
		 * @param imageResource 所要绘制的图片资源，通过 `chooseImage` 得到一个文件路径或者一个项目目录内的图片
		 * @param x 图像左上角的x坐标
		 * @param y 图像左上角的y坐标
		 */
		drawImage(imageResource: string, x: number, y: number, width: number, height: number): void;

		/**
		 * 对当前路径进行填充
		 */
		fill(): void;
		/**
		 * 对当前路径进行描边
		 */
		stroke(): void;

		// 路径后可以带参数。

		/**
		 * 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。
		 * 同一个路径内的多次 `setFillStyle`、`setStrokeStyle`、`setLineWidth` 等设置，以最后一次设置为准。
		 */
		beginPath(): void;

		/**
		 * 关闭一个路径
		 */
		closePath(): void;

		/**把路径移动到画布中的指定点，不创建线条。
		 * @param x 目标位置的x坐标
		 * @param y 目标位置的y坐标
		 */
		moveTo(x: number, y: number): void;

		/**
		 * 在当前位置添加一个新点，然后在画布中创建从该点到最后指定点的路径。
		 * @param x 目标位置的x坐标
		 * @param y 目标位置的y坐标
		 */
		lineTo(x: number, y: number): void;

		/**
		 * 画一条弧线。
		 * 创建一个圆可以用 arc() 方法指定其实弧度为0，终止弧度为 2 * Math.PI。
		 * 用 stroke() 或者 fill() 方法来在 canvas 中画弧线。
		 * @param x 圆的x坐标
		 * @param y 圆的y坐标
		 * @param r 圆的半径
		 * @param sAngle 起始弧度，单位弧度（在3点钟方向）
		 * @param eAngle 终止弧度
		 * @param counterclockwise 可选。指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
		 */
		arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise?: boolean): void;

		/**
		 * 添加一个矩形路径到当前路径。
		 * @param x 矩形路径左上角的x坐标
		 * @param y 矩形路径左上角的y坐标
		 * @param width 矩形路径的宽度
		 * @param height 矩形路径的高度
		 */
		rect(x: number, y: number, width: number, height: number): void;

		/**
		 * 填充一个矩形。用 setFillStyle() 设置矩形的填充色，如果没设置默认是黑色。
		 * @param x 矩形路径左上角的x坐标
		 * @param y 矩形路径左上角的y坐标
		 * @param width 矩形路径的宽度
		 * @param height 矩形路径的高度
		 */
		fillRect(x: number, y: number, width: number, height: number): void;

		/**
		 * 画一个矩形(非填充)。用 setFillStroke() 设置矩形线条的颜色，如果没设置默认是黑色。
		 * @param x 矩形路径左上角的x坐标
		 * @param y 矩形路径左上角的y坐标
		 * @param width 矩形路径的宽度
		 * @param height 矩形路径的高度
		 */
		strokeRect(x: number, y: number, width: number, height: number): void;

		/**
		 * 创建二次贝塞尔曲线路径。
		 * @param cpx 贝塞尔控制点的x坐标
		 * @param cpy 贝塞尔控制点的y坐标
		 * @param x 结束点的x坐标
		 * @param y 结束点的y坐标
		 */
		quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;

		/**
		 * 创建三次方贝塞尔曲线路径。
		 * @param cp1x 第一个贝塞尔控制点的 x 坐标
		 * @param cp1y 第一个贝塞尔控制点的 y 坐标
		 * @param cp2x 第二个贝塞尔控制点的 x 坐标
		 * @param cp2y 第二个贝塞尔控制点的 y 坐标
		 * @param x 结束点的x坐标
		 * @param y 结束点的y坐标
		 */
		bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;

		// 样式

		/**
		 * 设置纯色填充。
		 * @param color 设置为填充样式的颜色('rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串)
		 */
		setFillStyle(color: string): void;

		/**
		 * 设置纯色描边
		 * @param color 设置为填充样式的颜色('rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串)
		 */
		setStrokeStyle(color: string): void;

		/**
		 * 设置全局画笔透明度。
		 * @param alpha 透明度，0 表示完全透明，1 表示完全不透明
		 */
		setGlobalAlpha(alpha: number): void;

		/**
		 * 设置阴影样式。
		 * @param offsetX 阴影相对于形状在水平方向的偏移
		 * @param offsetY 阴影相对于形状在竖直方向的偏移
		 * @param blur 阴影的模糊级别，数值越大越模糊(0~100)
		 * @param color 阴影的颜色('rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串)
		 */
		setShadow(offsetX: number, offsetY: number, blur: number, color: string): void;

		/**
		 * 创建一个线性的渐变颜色。需要使用 addColorStop() 来指定渐变点，至少要两个。
		 * @param x0 起点的x坐标
		 * @param y0 起点的y坐标
		 * @param x1 终点的x坐标
		 * @param y1 终点的y坐标
		 */
		createLinearGradient(x0: number, y0: number, x1: number, y1: number): void;

		/**
		 * 创建一个圆形的渐变颜色。起点在圆心，终点在圆环。需要使用 addColorStop() 来指定渐变点，至少要两个。
		 * @param x 圆心的x坐标
		 * @param y 圆心的y坐标
		 * @param r 圆的半径
		 */
		createCircularGradient(x: number, y: number, r: number): void;

		/**
		 * 设置字体的字号。
		 * @param fontSize 字体的字号
		 */
		setFontSize(fontSize: number): void;

		/**
		 * 设置线条的宽度。
		 * @param lineWidth 线条的宽度
		 */
		setLineWidth(lineWidth: number): void;

		/**
		 * 设置线条的结束端点样式。
		 * @param lineCap 线条的结束端点样式('butt'、'round'、'square')
		 */
		setLineCap(lineCap: string): void;

		/**
		 * 设置两条线相交时，所创建的拐角类型。
		 * @param lineJoin 两条线相交时，所创建的拐角类型('bevel'、'round'、'miter')
		 */
		setLineJoin(lineJoin: string): void;

		/**设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。 当setLineJoin为'miter'时才有效。超过最大倾斜长度的，连接处将以lineJoin为bevel来显示
		 * @param miterLimit 最大斜接长度
		 */
		setMiterLimit(miterLimit: number): void;
	}

	/**
	 * 创建 canvas 绘图上下文(指定 canvasId)
	 * @param canvasId 画布表示，传入定义在 <canvas/> 的 canvas-id
	 */
	export function createCanvasContext(canvasId: string): CanvasContext;

	/**
	 * 创建并返回绘图上下文context对象。
	 */
	export function createContext(): CanvasContext;

	export interface DrawCanvasOptions {

		/**
		 * 画布标识，传入 <canvas/> 的 cavas-id
		 */
		canvasId: string;

		/**
		 * 绘图动作数组，由 wx.createContext 创建的 context，调用 getActions 方法导出绘图动作数组。
		 */
		actions: any[];

		/**
		 * 本次绘制是否接着上一次绘制，即reserve参数为false，则在本次调用drawCanvas绘制之前native层应先清空画布再继续绘制；
		 * 若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false
		 */
		reserve?: boolean;
	}

	/**
	 * 绘制画布
	 */
	export function drawCanvas(options: DrawCanvasOptions): void;

	export interface CanvasToTempFilePathOptions {

		/**
		 * 画布标识，传入 <canvas/> 的 cavas-id
		 */
		canvasId: string;
	}

	/**
	 * 把当前画布的内容导出生成图片，并返回文件路径
	 */
	export function canvasToTempFilePath(options: CanvasToTempFilePathOptions): string;

	/**
	 * 收起键盘。
	 */
	export function hideKeyboard(): void;

	/**
	 * 停止当前页面下拉刷新。
	 */
	export function stopPullDownRefresh(): void;

	// ---------------------------------- 开放接口API列表 ----------------------------------

	export interface GetWeRunDataResult {
		/**
		 * 包括敏感数据在内的完整用户信息的加密数据，详细见https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/signature.html
		 */
		encryptedData: string;
		/**
		 * 加密算法的初始向量，详细见https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/signature.html
		 */
		iv: string;
	}

	export interface GetWeRunDataOptions extends BaseOptions {
		/**
		 * 接口调用成功的回调函数
		 */
		success?: (res?: GetWeRunDataResult) => void;
	}

	/**
	 * 获取用户过去三十天微信运动步数，需要先调用 wx.login 接口。需要用户授权 scope.werun。
	 * @param options 
	 */
	export function getWeRunData(options: GetWeRunDataOptions): void;

	export interface LoginResult {

		/**
		 * 调用结果
		 */
		errMsg: string;

		/**
		 * 用户允许登录后，回调内容会带上 code（有效期五分钟），开发者需要将 code 发送到开发者服务器后台，
		 * 使用 `code` 换取 `session_key` api，将 code 换成 openid 和 session_key
		 */
		code: string;
	}

	export interface LoginOptions extends BaseOptions {

		/**
		 * 接口调用成功的回调函数
		 */
		success?: (res?: LoginResult) => void;
	}

	/**
	 * 调用接口获取**登录凭证（code）**进而换取用户登录态信息，
	 * 包括用户的**唯一标识（openid）** 及本次登录的 **会话密钥（session_key）**。**用户数据的加解密通讯**需要依赖会话密钥完成。
	 */
	export function login(options: LoginOptions): void;

	export interface CheckSessionOptions extends BaseOptions {
	}

	/**
	 * 检查登陆态是否过期
	 */
	export function checkSession(options: CheckSessionOptions): void;

	export interface CheckIsUserAdvisedToRestResult {
		/**
		 * 是否建议用户休息
		 */
		result: boolean;
	}

	export interface CheckIsUserAdvisedToRestOptions extends BaseOptions {
		/**
		 * 今天已经玩游戏的时间，单位：秒
		 */
		todayPlayedTime: number;
		/**
		 * 接口调用成功的回调函数
		 */
		success?: (res?: CheckIsUserAdvisedToRestResult) => void;
	}

	/**
	 * 根据用户当天游戏时间判断用户是否需要休息
	 */
	export function checkIsUserAdvisedToRest(options: CheckIsUserAdvisedToRestOptions): void;

	export interface UserInfo {
		/**
		 * 显示 country province city 所用的语言
		 */
		language: string;
		/**
		 * 用户昵称
		 */
		nickName: string;
		/**
		 * 用户头像图片 url。最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像 url 将失效。
		 */
		avatarUrl: string;
		/**
		 * 用户性别 0 未知 1 男性 2 女性
		 */
		gender: number;
		/**
		 * 用户所在国家
		 */
		country: string;
		/**
		 * 用户所在省份
		 */
		province: string;
		/**
		 * 用户所在城市
		 */
		city: string;
	}

	export interface WXButtonOnTapOptions {

	}

	export interface UserInfoButtonOnTapOptions {
		/**
		 * 用户信息对象，不包含 openid 等敏感信息
		 */
		userInfo: UserInfo;
		/**
		 * 不包括敏感信息的原始数据字符串，用于计算签名
		 */
		rawData: string;
		/**
		 * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息，参考文档https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/http-signature.html
		 */
		signature: string;
		/**
		 * 包括敏感数据在内的完整用户信息的加密数据，详细见https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/signature.html
		 */
		encryptedData: string;
		/**
		 * 加密算法的初始向量，详细见https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/signature.html
		 */
		iv: string;
	}

	export interface WXButtonStyle {
		/**
		 * 左上角横坐标
		 */
		left: number;
		/**
		 * 左上角纵坐标
		 */
		top: number;
		/**
		 * 宽度
		 */
		width: number;
		/**
		 * 高度
		 */
		height: number;
	}

	export interface WXButton {
		/**
		 * 按钮的样式
		 */
		style: WXButtonStyle;
		/**
		 * 显示用户信息按钮
		 */
		show(): void;
		/**
		 * 隐藏用户信息按钮
		 */
		hide(): void;
		/**
		 * 销毁用户信息按钮
		 */
		destroy(): void;
		/**
		 * 监听用户信息按钮点击事件
		 */
		onTap(callback: (res: WXButtonOnTapOptions) => void): void;
		/**
		 * 取消监听用户信息按钮点击事件
		 */
		offTap(callback: (res: WXButtonOnTapOptions) => void): void;
	}

	export interface UserInfoButton extends WXButton {
		/**
		 * 按钮上的文本，仅当 type 为 text 时有效
		 */
		text: string;
		/**
		 * 按钮的背景图片，仅当 type 为 image 时有效
		 */
		image: string;
		/**
		 * 监听用户信息按钮点击事件
		 */
		onTap(callback: (res: UserInfoButtonOnTapOptions) => void): void;
		/**
		 * 取消监听用户信息按钮点击事件
		 */
		offTap(callback: (res: UserInfoButtonOnTapOptions) => void): void;
	}

	export interface CreateUserInfoButtonType {
		/**
		 * 左上角横坐标
		 */
		left: number;
		/**
		 * 左上角纵坐标
		 */
		top: number;
		/**
		 * 宽度
		 */
		width: number;
		/**
		 * 高度
		 */
		height: number;
		/**
		 * 背景颜色 例如 '#ff0000'
		 */
		backgroundColor: string;
		/**
		 * 边框颜色 例如 '#ff0000'
		 */
		borderColor: string;
		/**
		 * 边框宽度
		 */
		borderWidth: number;
		/**
		 * 边框圆角
		 */
		borderRadius: number;
		/**
		 * 文本的水平居中方式 三种对齐方式 'left' 'center' 'right'
		 */
		textAlign: string;
		/**
		 * 字号
		 */
		fontSize: number;
		/**
		 * 文本的行高
		 */
		lineHeight: number;
	}

	export interface CreateUserInfoButtonOptions {
		/**
		 * 按钮的类型
		 */
		type: string;
		/**
		 * 按钮上的文本，仅当 type 为 text 时有效
		 */
		text: string;
		/**
		 * 按钮的背景图片，仅当 type 为 image 时有效
		 */
		image: string;
		/**
		 * 按钮的样式
		 */
		style: CreateUserInfoButtonType;
	}

	/**
	 * 创建用户信息按钮
	 * 示例代码：
	 * var button = wx.createUserInfoButton({
			type: 'text',
			text: '获取用户信息',
			style: {
				left: 10,
				top: 76,
				width: 200,
				height: 40,
				lineHeight: 40,
				backgroundColor: '#ff0000',
				color: '#ffffff',
				textAlign: 'center',
				fontSize: 16,
				borderRadius: 4
			}
		})
		button.onTap((res) = > {
			console.log(res)
		})
	 */
	export function createUserInfoButton(options: CreateUserInfoButtonOptions): UserInfoButton;

	export interface GetUserInfoResult {

		/**
		 * 用户信息对象，不包含 openid 等敏感信息
		 */
		userInfo: UserInfo;

		/**
		 * 不包括敏感信息的原始数据字符串，用于计算签名。
		 */
		rawData: string;

		/**
		 * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息，参考文档https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/http-signature.html	
		 */
		signature: string;

		/**
		 * 包括敏感数据在内的完整用户信息的加密数据，详细见https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/signature.html
		 */
		encryptData: string;
		/**
		 * 加密算法的初始向量，详细见https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/signature.html
		 */
		iv: string;
	}

	export interface GetUserInfoOptions extends BaseOptions {
		/**
		 * 是否带上登录态信息。当 withCredentials 为 true 时，
		 * 要求此前有调用过 wx.login 且登录态尚未过期，
		 * 此时返回的数据会包含 encryptedData, iv 等敏感信息；
		 * 当 withCredentials 为 false 时，
		 * 不要求有登录态，
		 * 返回的数据不包含 encryptedData, iv 等敏感信息。
		 */
		withCredentials: boolean;
		/**
		 * 显示用户信息的语言 en: 英文 zh_CN: 简体中文 zh_TW: 繁体中文
		 */
		lang: string
		/**
		 * 接口调用成功的回调函数
		 */
		success?: (res?: GetUserInfoResult) => void;
	}

	/**
	 * 获取用户信息，withCredentials 为 true 时需要先调用 wx.login 接口。需要用户授权 scope.userInfo
	 */
	export function getUserInfo(options: GetUserInfoOptions): void;

	export interface RequestPaymentOptions extends BaseOptions {

		/**
		 * 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
		 */
		timeStamp: number;

		/**
		 * 随机字符串，长度为32个字符以下。
		 */
		nonceStr: string;

		/**
		 * 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
		 */
		package: string;

		/**
		 * 签名算法，暂支持 MD5
		 */
		signType: string;

		/**
		 * 签名,具体签名方案参见[微信公众号支付帮助文档](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=4_3&t=1477656495417)
		 */
		paySign: string;
	}

	/**
	 * 发起微信支付。
	 */
	export function requestPayment(options: RequestPaymentOptions): void;

	// ------------------------------- 转发 ------------------------------------

	export interface GetShareInfoResult {
		/**
		 * 错误信息
		 */
		errMsg: string;
		/**
		 * 包括敏感数据在内的完整转发信息的加密数据，详细见https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/signature.html
		 */
		encryptedData: string;
		/**
		 * 加密算法的初始向量，详细见https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/signature.html
		 */
		iv: string;
	}

	export interface GetShareInfoOptions extends BaseOptions {
		shareTicket: string;
		success?: (res: GetShareInfoResult) => void;
	}

	/**
	 * 获取转发详细信息
	 */
	export function getShareInfo(options: GetShareInfoOptions);

	export interface HideShareMenuOptions extends BaseOptions {

	}

	/**
	 * 隐藏转发按钮
	 */
	export function hideShareMenu(options: HideShareMenuOptions);

	export interface OnShareAppMessageCallbackOptions {
		/**
		 * 每一项是一个 String 类型的 ShareTicket ，对应每个群。如果此次转发是带 shareTicket 的转发则会有回调此参数。可作为 wx.getShareInfo() 的参数来获取群 id
		 */
		shareTickets: Array<string>;
	}

	/**
	 * 监听用户点击右上角菜单的“转发”按钮时触发的事件
	 * @param callback 监听事件的回调函数
	 */
	export function onShareAppMessage(callback: (res: OnShareAppMessageCallbackOptions) => void);

	/**
	 * 取消监听用户点击右上角菜单的“转发”按钮时触发的事件
	 */
	export function offShareAppMessage(callback: (res: OnShareAppMessageCallbackOptions) => void);

	export interface ShowShareMenuOptions extends BaseOptions {
		/**
		 * 是否使用带 shareTicket 的转发https://developers.weixin.qq.com/minigame/dev/document/share/wx.showShareMenu.html
		 */
		withShareTicket: boolean;
	}

	/**
	 * 显示当前页面的转发按钮
	 */
	export function showShareMenu(options: ShowShareMenuOptions);

	export interface ShareAppMessageResult {
		/**
		 * 每一项是一个 string 类型的 ShareTicket ，对应每个群。如果此次转发是带 shareTicket 的转发则会有回调此参数。可作为 wx.getShareInfo() 的参数来获取群 id。
		 */
		shareTickets: Array<string>;
	}

	export interface ShareAppMessageOptions extends BaseOptions {
		/**
		 * 转发标题，不传则默认使用当前小游戏的昵称。
		 */
		title?: string;
		/**
		 * 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。
		 */
		imageUrl?: string;
		/**
		 * 查询字符串，从这条转发消息进入后，可通过 wx.onLaunch() 或 wx.onShow 获取启动参数中的 query。必须是 key1=val1&key2=val2 的格式。
		 */
		query?: string;
		success?: (res: ShareAppMessageResult) => void;
	}

	/**
	 * 主动拉起转发，进入选择通讯录界面。
	 */
	export function shareAppMessage(options: ShareAppMessageOptions);

	export interface UpdateShareMenuOptions {
		/**
		 * 是否使用带 shareTicket 的转发https://developers.weixin.qq.com/minigame/dev/document/share/wx.updateShareMenu.html
		 */
		withShareTicket: boolean;
	}

	/**
	 * 更新转发属性
	 */
	export function updateShareMenu(options: UpdateShareMenuOptions);

	// ------------------------------数据缓存---------------------------

	export interface ClearStorageOptions extends BaseOptions {

	}

	/**
	 * 清理本地数据缓存
	 */
	export function clearStorage(options: ClearStorageOptions);

	/**
	 * wx.clearStorage 的同步版本
	 */
	export function clearStorageSync();

	export interface GetStorageOptions extends BaseOptions {
		/**
		 * 本地缓存中指定的 key
		 */
		key: string;
		/**
		 * 接口调用成功的回调函数
		 */
		success?: (res: IData) => void;
	}

	/**
	 * 从本地缓存中异步获取指定 key 的内容
	 */
	export function getStorage(options: GetStorageOptions);

	export interface GetStorageInfoResult {
		/**
		 * 当前 storage 中所有的 key
		 */
		keys: Array<string>;
		/**
		 * 当前占用的空间大小, 单位 KB
		 */
		currentSize: number;
		/**
		 * 限制的空间大小，单位 KB
		 */
		limitSize: number;
	}

	export interface GetStorageInfoOptions extends BaseOptions {
		success?: (res: GetStorageInfoResult) => void;
	}

	/**
	 * 异步获取当前storage的相关信息
	 */
	export function getStorageInfo(options: GetStorageInfoOptions)

	/**
	 * wx.getStorage 的同步版本
	 * @param key 本地缓存中指定的 key
	 */
	export function getStorageSync(key: string);

	export interface GetStorageInfoSyncReturn {
		/**
		 * 当前 storage 中所有的 key
		 */
		keys: Array<string>;
		/**
		 * 当前占用的空间大小, 单位 KB
		 */
		currentSize: number;
		/**
		 * 限制的空间大小，单位 KB
		 */
		limitSize: number;
	}

	/**
	 * wx.getStorageInfo 的同步版本
	 */
	export function getStorageInfoSync(): GetStorageInfoSyncReturn;

	export interface RemoveStorageOptions extends BaseOptions {
		key: string;
	}

	/**
	 * 从本地缓存中移除指定 key
	 */
	export function removeStorage(options: RemoveStorageOptions);

	/**
	 * wx.removeStorage 的同步版本
	 * @param key 本地缓存中指定的 key
	 */
	export function removeStorageSync(key: string);

	export interface SetStorageOptions {
		/**
		 * 本地缓存中指定的 key
		 */
		key: string;
		/**
		 * 需要存储的内容	
		 */
		data: string;
	}

	/**
	 * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容。
	 */
	export function setStorage(options: SetStorageOptions);

	/**
	 * wx.setStorage 的同步版本
	 * @param key 本地缓存中指定的 key
	 * @param data 需要存储的内容
	 */
	export function setStorageSync(key: string, data: string);

	export enum gameClubButtonIcon {
		green = "green",
		white = "white",
		dark = "dark",
		light = "light",
	}

	export interface gameClubButtonStyle {
		/** 左上角横坐标 */
		left: number;
		/** 左上角纵坐标 */
		top: number;
		/** 宽度 */
		width: number;
		/** 高度 */
		height: number;
	}

	export interface createGameClubButtonOptions {
		icon: gameClubButtonIcon,
		style: gameClubButtonStyle,
	}

	/** 获取更新管理器 */
	export function getUpdateManager();

	/** 保存图片到相册 */
	export function saveImageToPhotosAlbum({ filePath: string, success: Function, fail: Function });

	export function getLaunchOptionsSync();

	export function onShow(res: Function);

	export function onHide(res: Function);

	export function openCustomerServiceConversation({ sessionFrom: string });

	export function requestMidasPayment({ });

	export function createImage();

	export function createRewardedVideoAd({
		adUnitId: string
	});
	// ---------------------------------------------------- //
	// ---------------------- 基础 ------------------------ //
	// ---------------------------------------------------- //

	// ---------------------------------------------------- //
	// ---------------------- 渲染 ------------------------ //
	// ---------------------------------------------------- //

	// ---------------------------------------------------- //
	// ---------------------- 广告 ------------------------ //
	// ---------------------------------------------------- //

	// ---------------------------------------------------- //
	// ---------------------- 界面 ------------------------ //
	// ---------------------------------------------------- //

	// ---------------------------------------------------- //
	// ---------------------- 网络 ------------------------ //
	// ---------------------------------------------------- //

	// ---------------------------------------------------- //
	// ---------------------- 转发 ------------------------ //
	// ---------------------------------------------------- //

	// ---------------------------------------------------- //
	// ---------------------- 虚拟支付 ------------------------ //
	// ---------------------------------------------------- //

	// ---------------------------------------------------- //
	// ---------------------- 数据存储 ------------------------ //
	// ---------------------------------------------------- //

	// ---------------------------------------------------- //
	// ---------------------- 媒体 ------------------------ //
	// ---------------------------------------------------- //


	// --------------------- 音频 ----------------------- //

	export interface InnerAudioContext {
		/**
		 * 音频资源的地址，用于直接播放。2.2.3 开始支持云文件ID
		 */
		src?: string;
		/**
		 * 开始播放的位置（单位：s），默认为 0
		 */
		startTime?: number;
		/**
		 * 是否自动开始播放，默认为 false
		 */
		autoplay?: boolean;
		/**
		 * 是否循环播放，默认为 false
		 */
		loop?: boolean;
		/**
		 * 是否遵循系统静音开关，默认为 true。当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音
		 */
		obeyMuteSwitch?: boolean;
		/**
		 * 音量。范围 0~1。默认为 
		 */
		volume?: number;
		/**
		 * 当前音频的长度（单位 s）。只有在当前有合法的 src 时返回（只读）
		 */
		duration?: number;
		/**
		 * 当前音频的播放位置（单位 s）。只有在当前有合法的 src 时返回，时间保留小数点后 6 位（只读）
		 */
		currentTime?: number;
		/**
		 * 当前是是否暂停或停止状态（只读）
		 */
		paused?: boolean;
		/**
		 * 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲（只读）
		 */
		buffered?: number;

		/**
		 * 播放
		 */
		play(): void;

		/**
		 * 暂停。暂停后的音频再播放会从暂停处开始播放
		 */
		pause(): void;

		/**
		 * 停止。停止后的音频再播放会从头开始播放。
		 */
		stop(): void;

		/**
		 * 跳转到指定位置
		 * @param position 跳转的时间，单位 s。精确到小数点后 3 位，即支持 ms 级别精确度
		 */
		seek(position: number): void;

		/**
		 * 销毁当前实例
		 */
		destroy(): void;

		/**
		 * 监听音频进入可以播放状态的事件。但不保证后面可以流畅播放
		 * @param cb 音频进入可以播放状态的事件的回调函数
		 */
		onCanplay(cb: () => void): void;

		/**
		 * 取消监听音频进入可以播放状态的事件
		 * @param cb 音频进入可以播放状态的事件的回调函数
		 */
		offCanplay(cb: () => void): void;

		/**
		 * 监听音频播放事件
		 * @param cb 音频播放事件的回调函数
		 */
		onPlay(cb: () => void): void;

		/**
		 * 取消监听音频播放事件
		 * @param cb 音频播放事件的回调函数
		 */
		offPlay(cb: () => void): void;

		/**
		 * 监听音频暂停事件
		 * @param cb 音频暂停事件的回调函数
		 */
		onPause(cb: () => void): void;

		/**
		 * 取消监听音频暂停事件
		 * @param cb 音频暂停事件的回调函数
		 */
		offPause(cb: () => void): void;

		/**
		 * 监听音频停止事件
		 * @param cb 音频停止事件的回调函数
		 */
		onStop(cb: () => void): void;

		/**
		 * 取消监听音频停止事件
		 * @param cb 音频停止事件的回调函数
		 */
		offStop(cb: () => void): void;

		/**
		 * 监听音频自然播放至结束的事件
		 * @param cb 音频自然播放至结束的事件的回调函数
		 */
		onEnded(cb: () => void): void;

		/**
		 * 取消监听音频自然播放至结束的事件
		 * @param cb function callback
		 */
		offEnded(cb: () => void): void;

		/**
		 * 监听音频播放进度更新事件
		 * @param cb 音频播放进度更新事件的回调函数
		 */
		onTimeUpdate(cb: () => void): void;

		/**
		 * 取消监听音频播放进度更新事件
		 * @param cb 音频播放进度更新事件的回调函数
		 */
		offTimeUpdate(cb: () => void): void;

		/**
		 * 监听音频播放错误事件
		 * @param cb 音频播放错误事件的回调函数
		 */
		onError(cb: () => void): void;

		/**
		 * 取消监听音频播放错误事件
		 * @param cb 音频播放错误事件的回调函数
		 */
		offError(cb: () => void): void;

		/**
		 * 监听音频加载中事件。当音频因为数据不足，需要停下来加载时会触发
		 * @param cb 音频加载中事件的回调函数
		 */
		onWaiting(cb: () => void): void;

		/**
		 * 取消监听音频加载中事件
		 * @param cb 音频加载中事件的回调函数
		 */
		offWaiting(cb: () => void): void;

		/**
		 * 监听音频进行跳转操作的事件
		 * @param cb 音频进行跳转操作的事件的回调函数
		 */
		onSeeking(cb: () => void): void;

		/**
		 * 取消监听音频进行跳转操作的事件
		 * @param cb 音频进行跳转操作的事件的回调函数
		 */
		offSeeking(cb: () => void): void;

		/**
		 * 监听音频完成跳转操作的事件
		 * @param cb 音频完成跳转操作的事件的回调函数
		 */
		onSeeked(cb: () => void): void;

		/**
		 * 取消监听音频完成跳转操作的事件
		 * @param cb 音频完成跳转操作的事件的回调函数
		 */
		offSeeked(cb: () => void): void;
	}

	/**
	 * 创建内部 audio 上下文 InnerAudioContext 对象。
	 */
	export function createInnerAudioContext(): InnerAudioContext;

	// ---------------------------------------------------- //
	// ---------------------- 位置 ------------------------ //
	// ---------------------------------------------------- //

	// ---------------------------------------------------- //
	// ---------------------- 文件 ------------------------ //
	// ---------------------------------------------------- //

	// ---------------------------------------------------- //
	// ---------------------- 开放接口 ------------------------ //
	// ---------------------------------------------------- //

	// ---------------------------------- 小程序跳转 ----------------------------------

	export interface NavigateToMiniProgramParams {
		/**
		 * 要打开的小程序 appId
		 */
		appId: string;
		/**
		 * 打开的页面路径，如果为空则打开首页
		 */
		path?: string;
		/**
		 * 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch，App.onShow 中获取到这份数据。
		 */
		extraData?: object;
		/**
		 * 要打开的小程序版本。仅在当前小程序为开发版或体验版时此参数有效。如果当前小程序是正式版，则打开的小程序必定是正式版。
		 * 默认值 release 。 develop 开发版 trial 体验版 release 正式版
		 */
		envVersion?: string;
		/**
		 * 接口调用成功的回调函数
		 */
		success?: Function;
		/**
		 * 接口调用失败的回调函数
		 */
		fail?: Function;
		/**
		 * 接口调用结束的回调函数（调用成功、失败都会执行）
		 */
		complete?: Function;
	}
	/**
	 * 小程序跳转
	 * @param param 
	 */
	export function navigateToMiniProgram(param: NavigateToMiniProgramParams)

	// ---------------------------------- 开放数据 ----------------------------------

	export interface AuthSettingScope {
		/**
		 * 用户信息，对应接口 wx.getUserInfo
		 */
		userInfo: boolean;
		/**
		 * 地理位置，对应接口 wx.getLocation wx.chooseLocation
		 */
		userLocation: boolean;
		/**
		 * 通讯地址，对应接口 wx.chooseAddress
		 */
		address: boolean;
		/**
		 * 发票抬头，对应接口 wx.chooseInvoiceTitle
		 */
		invoiceTitle: boolean;
		/**
		 * 微信运动步数，对应接口 wx.getWeRunData
		 */
		werun: boolean;
		/**
		 * 录音功能，对应接口 wx.startRecord
		 */
		record: boolean;
		/**
		 * 保存到相册 wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum
		 */
		writePhotosAlbum: boolean;
		/**
		 * 摄像头
		 */
		camera: boolean;
	}

	export interface AuthSetting {
		scope: AuthSettingScope;
	}

	export interface GetSettingResult {
		authSetting: AuthSetting;
	}

	export interface GetSettingOptions extends BaseOptions {
		success?: (res: GetSettingResult) => void;
	}

	/**
	 * 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
	 */
	export function getSetting(options: GetSettingOptions): void;

	/**
	 * 调起客户端小程序设置界面，返回用户设置的操作结果。设置界面只会出现小程序已经向用户请求过的权限。
	 */
	export function openSetting(options: GetSettingOptions): void;

	export interface AuthorizeOptions extends BaseOptions {
		/**
		 * 需要获取权限的 scope
		 */
		scope: string;
	}

	/**
	 * 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
	 */
	export function authorize(options: AuthorizeOptions): void;

	export interface GetFriendCloudStorageResult {
		/**
		 * 同玩好友的托管数据
		 */
		data: Array<UserGameData>;
	}

	export interface GetFriendCloudStorageOptions extends BaseOptions {
		/**
		 * 要拉取的 key 列表
		 */
		keyList: Array<string>;
		/**
		 * 接口调用成功的回调函数
		 */
		success?: (res: GetFriendCloudStorageResult) => void;
	}

	/**
	 * 拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
	 */
	export function getFriendCloudStorage(options: GetFriendCloudStorageOptions): void;

	export interface GetUserCloudStorageResult {
		/**
		 * 用户托管的 KV 数据列表
		 */
		KVDataList: Array<UserGameData>;
	}

	export interface GetUserCloudStorageOptions extends BaseOptions {
		/**
		 * 要拉取的 key 列表
		 */
		keyList: Array<string>;
		/**
		 * 接口调用成功的回调函数
		 */
		success?: (res: GetUserCloudStorageResult) => void;
	}

	/**
	 * 获取当前用户托管数据当中对应 key 的数据。该接口只可在开放数据域下使用
	 */
	export function getUserCloudStorage(options: GetUserCloudStorageOptions): void;

	export interface GetUserInfoResult {
		/**
		 * 用户信息列表
		 */
		data: Array<UserInfo>;
	}

	export interface GetUserInfoOptions extends BaseOptions {
		/**
		 * 要获取信息的用户的 openId 数组，如果要获取当前用户信息，则将数组中的一个元素设为 'selfOpenId'
		 */
		openIdList?: Array<string>;
		/**
		 * 显示用户信息的语言
		 */
		lang?: string;
		/**
		 * 接口调用成功的回调函数
		 */
		success?: (res: GetUserInfoResult) => void;
	}

	/**
	 * 在无须用户授权的情况下，批量获取用户信息。该接口只在开放数据域下可用
	 */
	export function getUserInfo(options: GetUserInfoOptions): void;

	export interface GetGroupCloudStorageResult {
		/**
		 * 群同玩成员的托管数据
		 */
		data: Array<UserGameData>;
	}

	export interface GetGroupCloudStorageOptions extends BaseOptions {
		/**
		 * 群分享对应的 shareTicket
		 */
		shareTicket: string;
		/**
		 * 要拉取的 key 列表
		 */
		keyList: Array<string>;
		/**
		 * 接口调用成功的回调函数
		 */
		success?: (res: GetGroupCloudStorageResult) => void;
	}

	/**
	 * 在小游戏是通过群分享卡片打开的情况下，可以通过调用该接口获取群同玩成员的游戏数据。该接口只可在开放数据域下使用。
	 */
	export function getGroupCloudStorage(options: GetGroupCloudStorageOptions): void;

	/**
	 * 只有开放数据域能调用，获取主域和开放数据域共享的 sharedCanvas
	 */
	export function getSharedCanvas(): Canvas;

	/**
	 * 删除用户托管数据当中对应 key 的数据。
	 */
	export function removeUserCloudStorage(options: GetUserCloudStorageOptions): void;

	export interface KVData {
		/**
		 * 数据的 key
		 */
		key: string;
		/**
		 * 数据的 value
		 */
		value: string;
	}

	export interface SetUserCloudStorageOptions extends BaseOptions {
		/**
		 * 要修改的 KV 数据列表
		 */
		KVDataList: Array<KVData>;
	}

	/**
	 * 对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
	 */
	export function setUserCloudStorage(options: SetUserCloudStorageOptions): void;

	export interface UserGameData {
		/**
		 * 用户的微信头像 url
		 */
		avatarUrl: string;
		/**
		 * 用户的微信昵称
		 */
		nickname: string;
		/**
		 * 用户的 openid
		 */
		openid: string;
		/**
		 * 用户的托管 KV 数据列表
		 */
		KVDataList: Array<KVData>;
	}

	export interface CreateGameClubButtonStyle {
		/**
		 * 左上角横坐标
		 */
		left: number
		/**
		 * 左上角纵坐标
		 */
		top: number;
		/**
		 * 宽度
		 */
		width: number;
		/**
		 * 高度
		 */
		height: number;
	}

	export interface CreateGameClubButtonOptions {
		/**
		 * 游戏圈按钮的图标 'green' 'white' 'dark' 'light'
		 */
		icon: string;
		/**
		 * 按钮的样式
		 */
		style: CreateGameClubButtonStyle;
	}

	export interface GameClubButton extends WXButton {

	}

	/**
	 * 创建游戏圈按钮。游戏圈按钮被点击后会跳转到小游戏的游戏圈。更多关于游戏圈的信息见 https://developers.weixin.qq.com/minigame/dev/tutorial/open-ability/game-club.html
	 * var button = wx.createGameClubButton({
			icon: 'green',
			style: {
				left: 10,
				top: 76,
				width: 40,
				height: 40
			}
		})
		button.onTap((res) = > {
			console.log(res)
		})
	 */
	export function createGameClubButton(options: CreateGameClubButtonOptions): GameClubButton;

	export interface ToTempFilePathOptions extends BaseOptions {
		/**
		 * 截取 canvas 的左上角横坐标
		 */
		x: number;
		/**
		 * 截取 canvas 的左上角纵坐标
		 */
		y: number;
		/**
		 * 截取 canvas 的宽度
		 */
		width: number;
		/**
		 * 截取 canvas 的高度
		 */
		height: number;
		/**
		 * 目标文件的宽度，会将截取的部分拉伸或压缩至该数值
		 */
		destWidth: number;
		/**
		 * 目标文件的高度，会将截取的部分拉伸或压缩至该数值
		 */
		destHeight: number;
		/**
		 * 目标文件的类型 'png' 'jpg'
		 */
		fileType: string;
		/**
		 * jpg图片的质量，仅当 fileType 为 jpg 时有效。取值范围为 0.0（最低）- 1.0（最高），不含 0。不在范围内时当作 1.0
		 */
		quality: number;
	}

	export interface ContextAttributes {
		/**
		 * 表示是否抗锯齿
		 */
		antialias?: boolean;
		/**
		 * 表示是否绘图完成后是否保留绘图缓冲区
		 */
		preserveDrawingBuffer?: boolean;
		/**
		 * 抗锯齿样本数。最小值为 2，最大不超过系统限制数量，仅 iOS 支持
		 */
		antialiasSamples?: number;
	}

	export interface Canvas {
		width: number;
		height: number;
		/**
		 * 将当前 Canvas 保存为一个临时文件，并生成相应的临时文件路径。
		 * canvas.toTempFilePath({
				x: 10,
				y: 10,
				width: 200,
				height: 150,
				destWidth: 400,
				destHeight: 300,
				success: (res) = > {
					wx.shareAppMessage({
						imageUrl: res.tempFilePath
					})
				}
			})
		*/
		toTempFilePath(options: ToTempFilePathOptions): string;

		/**
		 * 获取画布对象的绘图上下文
		 * @param contextType '2d' 2d 绘图上下文 'webgl' webgl 绘图上下文
		 * @param options webgl 上下文属性，仅当 contextType 为 webgl 时有效
		 */
		getContext(contextType: string, options: ContextAttributes): HTMLCanvasElement;
		/**
		 * 把画布上的绘制内容以一个 data URI 的格式返回
		 * @returns data URI 格式的字符串
		 */
		toDataURL(): string;
	}

	export interface OpenDataContext {
		/**
		 * 开放数据域和主域共享的 sharedCanvas
		 */
		canvas: Canvas;
		/**
		 * 向开放数据域发送消息
		 * @param message 要发送的消息，message 中及嵌套对象中 key 的 value 只能是 primitive value。即 number、string、boolean、null、undefined。
		 */
		postMessage(message: IData)
	}

	/**
	 * 获取开放数据域
	 * @returns 开放数据域
	 */
	export function getOpenDataContext(): OpenDataContext;
	/**
	 * 监听主域发送的消息
	 * @param callback 
	 */
	export function onMessage(callback: Function);

	// ---------------------------------------------------- //
	// ---------------------- 设备 ------------------------ //
	// ---------------------------------------------------- //


	// ------------------------- 振动 ------------------------------- //

	/**
	 * 使手机发生较短时间的振动（15 ms）。仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
	 * @param param 
	 */
	export function vibrateShort(param?: BaseOptions);

	/**
	 * 使手机发生较长时间的振动（400 ms)
	 * @param param 
	 */
	export function vibrateLong(param?: BaseOptions);

	// ---------------------------------------------------- //
	// ---------------------- Worker ---------------------- //
	// ---------------------------------------------------- //

	export function createWorker(scriptPath: string): Worker;
}

declare let sharedCanvas: Canvas;