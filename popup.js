const likeInput = document.getElementById("likeCount");
const commentInput = document.getElementById("commentCount");
const runBtn = document.getElementById("runBtn");

function validate() {
    const l = likeInput.value.trim();
    const c = commentInput.value.trim();
    runBtn.disabled = !(l !== "" && c !== "");
}

likeInput.addEventListener("input", validate);
commentInput.addEventListener("input", validate);

runBtn.addEventListener("click", () => {
    const likeCount = parseInt(likeInput.value) || 0;
    const commentCount = parseInt(commentInput.value) || 0;

    chrome.runtime.sendMessage({
        action: "run_linkedin",
        likeCount,
        commentCount
    });

    window.close();
});