import 'chrome-extension-async';

export class NeWorkHotkeys {
    static readonly KEY_SETTINGS = "settings";
    // @ts-ignore
    private cache: Promise<StorageCache>;
    private audios: { [key: string]: HTMLAudioElement }
    constructor() {
        this.audios = {
            "open": new Audio(chrome.extension.getURL("open.mp3")),
            "work": new Audio(chrome.extension.getURL("work.mp3")),
        };
    }
    enableZone(): void { (document.querySelector('li.zone > button') as HTMLElement).click() }
    async enableWork(): Promise<void> {
        (document.querySelector('li.work > button') as HTMLElement).click();
        this.play("work");
    }
    async enableOpen(): Promise<void> {
        (document.querySelector('li.open > button') as HTMLElement).click();
        this.play("open");
    }
    toggleBubble(): void { (document.querySelector('button.bubbleInOut') as HTMLElement).click() }
    toggleTalk(): void {
        if ((document.querySelector("div.statusNow img") as HTMLImageElement).src.match(/open/)) {
            this.enableWork()
        } else {
            this.enableOpen()
        }
    }
    private async getCache(): Promise<StorageCache> {
        let cache = this.cache;
        if (!cache) {
            cache = this.cache = <Promise<StorageCache>> await chrome.storage.local.get({
                [NeWorkHotkeys.KEY_SETTINGS]: { soundEnabled: true }
            });
        }
        return cache;
    }
    async isSoundEnabled(): Promise<boolean> {
        const cache = await this.getCache();
        return cache.settings.soundEnabled;
    }
    async play(cls: string): Promise<void> {
        const isSoundEnabled = await this.isSoundEnabled()
        if (!isSoundEnabled) {
            return;
        }
        const audio = this.audios[cls];
        if (audio.paused) {
            audio.play();
        } else {
            audio.currentTime = 0;
        }
    }
}