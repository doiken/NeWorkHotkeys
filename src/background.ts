const newWorkUrlPattern = "https://nework.app/workspaces/*";

chrome.commands.onCommand.addListener(function (command) {
    console.log(command)
    chrome.tabs.query({ url: newWorkUrlPattern }, function (tabs: any) {
        console.log(tabs)
        chrome.tabs.sendMessage(tabs[0].id, { command: command }, function (response) {
        });
    });
});