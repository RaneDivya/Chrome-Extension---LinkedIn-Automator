console.log("BACKGROUND LOADED");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "run_linkedin") {
        openLinkedIn(msg.likeCount, msg.commentCount);
    }
    sendResponse({ status: "ok" });
});

async function openLinkedIn(likeCount, commentCount) {
    const feedURL = "https://www.linkedin.com/feed/";

    let [tab] = await chrome.tabs.query({ url: feedURL });

    if (tab) {
        chrome.tabs.update(tab.id, { active: true });

        // wait for LinkedIn feed to fully load
        setTimeout(() => {
            inject(tab.id, likeCount, commentCount);
        }, 6000);
    } else {
        chrome.tabs.create({ url: feedURL }, (newTab) => {
            setTimeout(() => {
                inject(newTab.id, likeCount, commentCount);
            }, 8000);
        });
    }
}

function inject(tabId, likeCount, commentCount) {
    console.log("Injecting content.js...");

    chrome.scripting.executeScript(
        {
            target: { tabId },
            files: ["content.js"]
        },
        () => {
            console.log("Injected — Sending automation start message...");
            chrome.tabs.sendMessage(tabId, {
                action: "start_automation",
                likeCount,
                commentCount
            });
        }
    );
}