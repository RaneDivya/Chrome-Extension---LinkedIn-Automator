console.log("content.js loaded!");

// Listen for background script message
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "start_automation") {
        startAutomation(msg.likeCount, msg.commentCount);
    }
});

// Helper wait function
function wait(ms) {
    return new Promise(res => setTimeout(res, ms));
}

// Find the COMMENT SUBMIT BUTTON — YOUR BUTTON
function findCommentPostButton() {
    return Array.from(document.querySelectorAll("button.comments-comment-box__submit-button--cr"))
        .find(btn => btn.innerText.trim().toLowerCase() === "comment");
}

// MAIN AUTOMATION
async function startAutomation(likeCount, commentCount) {
    console.log("Starting automation…");

    let posts = document.querySelectorAll("div.feed-shared-update-v2");

    if (!posts.length) {
        console.log("No posts found!");
        return;
    }

    for (let i = 0; i < posts.length; i++) {
        if (i >= likeCount && i >= commentCount) break;

        let post = posts[i];

        console.log("➡ Processing post", i + 1);

        // LIKE section
        if (i < likeCount) {
            let likeBtn = post.querySelector('button[aria-label*="Like"], button[aria-label*="like"]');
            if (likeBtn) {
                likeBtn.click();
                console.log(" Liked post", i + 1);
                await wait(1000);
            } else {
                console.log("❌ Like button not found for post", i + 1);
            }
        }

        // COMMENT section
        if (i < commentCount) {
            let commentBtn = post.querySelector('button[aria-label*="Comment"], button[aria-label*="comment"]');

            if (commentBtn) {
                commentBtn.click();
                console.log("Opened comment box on post", i + 1);
                await wait(1200);
            } else {
                console.log("Comment button not found for post", i + 1);
                continue;
            }

            // TYPE COMMENT
            let input = post.querySelector('[contenteditable="true"]');
            if (input) {
                input.focus();
                input.innerHTML = "<p>CFBR</p>";
                input.dispatchEvent(new InputEvent("input", { bubbles: true }));
                console.log("Typed comment on post", i + 1);
                await wait(800);
            } else {
                console.log("Comment text box not found for post", i + 1);
                continue;
            }

            // CLICK THE REAL COMMENT SUBMIT BUTTON**
            let postBtn = findCommentPostButton();

            if (postBtn) {
                console.log("Found Comment Submit → Clicking…");
                postBtn.click();
                await wait(1200);
                console.log("Comment submitted on post", i + 1);
            } else {
                console.log("Comment submit button NOT found for post", i + 1);
            }
        }

        await wait(1500);
    }

    console.log("Automation completed!");
}