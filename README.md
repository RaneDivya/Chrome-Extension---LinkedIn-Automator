**🚀 Chrome Extension -LinkedIn Automator**

This Chrome extension automatically likes and comments on posts in your LinkedIn feed.
It was built for automation practice and educational purposes.

**⭐ Features**

👍 Automatically likes posts on the LinkedIn feed

💬 Automatically types and submits comments (“CFBR”)

🔄 Opens LinkedIn feed automatically

⏱️ Uses safe, human-like delays

🎯 Works with LinkedIn’s dynamic DOM

🧩 Easy-to-use popup interface

**📁 Project Structure**
```linkedin-automator-extension/
│
├── manifest.json        # Chrome Extension configuration
├── background.js        # Opens the feed, injects script
├── content.js           # Automation: like + comment logic
├── popup.html           # UI for input fields
├── popup.js             # Handles input + sends message
├── icon.png             # Extension icon
└── README.md            # Documentation
```
**🛠️ Installation Instructions**
Step 1 — Download the project

Download or clone this repository to your computer.

Step 2 — Open Chrome Extensions

Go to:

chrome://extensions/


Enable Developer Mode (top-right corner).

Step 3 — Load the Extension

Click Load Unpacked and select the project folder.

Your extension will now appear in the Chrome toolbar 🎉

**▶️ How to Use**

Open your Chrome toolbar and click the extension icon

Enter:

Number of likes

Number of comments

Click Run

LinkedIn opens automatically

Automation begins:

Post #1 like

Post #1 comment

Moves to next post
