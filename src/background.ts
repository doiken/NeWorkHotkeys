const newWorkUrlPattern = "https://nework.app/workspaces/*";

function waitPageLoad(command: string) {
    chrome.tabs.query({ url: newWorkUrlPattern }, function (tabs: any) {
        // only forcus first tab
        const tab = tabs.shift();
        if (tab.status === 'complete') {
            chrome.tabs.sendMessage(tab.id, { command: command });
        } else {
            setTimeout(() => { waitPageLoad(command) }, 50);
        }
    });
}

chrome.commands.onCommand.addListener(function (command: string) {
    waitPageLoad(command)
});