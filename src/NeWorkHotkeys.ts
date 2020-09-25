export class NeWorkHotkeys {
    constructor() {}
    static readonly KEY_SETTINGS = "settings";
    enableZone(): void { (document.querySelector('li.zone > button') as HTMLElement).click() }
    enableWork(): void { (document.querySelector('li.work > button') as HTMLElement).click() }
    enableOpen(): void { (document.querySelector('li.open > button') as HTMLElement).click() }
    toggleBubble(): void { (document.querySelector('button.bubbleInOut') as HTMLElement).click() }
    toggleTalk(): void {
        if ((document.querySelector("div.statusNow img") as HTMLImageElement).src.match(/open/)) {
            this.enableWork()
        } else {
            this.enableOpen()
        }
    }
}