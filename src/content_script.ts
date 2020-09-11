import { NeWorkHotkeys } from './NeWorkHotkeys';
const hotkeys = new NeWorkHotkeys();
const commands = {
    "enable_zone": () => hotkeys.enableZone(),
    "enable_work": () => hotkeys.enableWork(),
    "enable_open": () => hotkeys.enableOpen(),
    "toggle_talk": () => hotkeys.toggleTalk(),
    "toggle_bubble": () => hotkeys.toggleBubble(),
};
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    commands[request.command]();
    sendResponse("ok");
    return true; // necessary for asynchronous messaging
});
