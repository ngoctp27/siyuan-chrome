## SiYuan Chrome Extension

[中文](https://github.com/siyuan-note/siyuan-chrome/blob/main/README_zh_CN.md)

### 💡 Introduction

SiYuan browser extension for Chrome.

### 🛠️ Installation

* Chrome: [SiYuan - Chrome Web Store](https://chrome.google.com/webstore/detail/siyuan/hkcgjbeblifaincobbcfiffbpgoafepk)
* Edge: [SiYuan - Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/siyuan/lclhdlhleinlppggbbgimbekofanbkcf)
* GitHub: [siyuan-note/siyuan-chrome](https://github.com/siyuan-note/siyuan-chrome)

### ✨ Usage

1. Install the extension, then configure the API token in the extension options (you can view the token in SiYuan Settings - About)
2. On a web page, select the content you want to clip, then choose "Copy to SiYuan" from the context menu
3. Paste in SiYuan

### 🔐 Cloudflare Access (fork patch)

If SiYuan sits behind Cloudflare Access, fill **CF-Access-Client-Id** and **CF-Access-Client-Secret** (service token) in the extension options. Both headers are sent on every kernel request only when both fields are set; leave them empty for normal use.

Patch surface (search `Fork patch: CF Access` when rebasing onto a new upstream release):

* `lib/siyuan-api.js`: `siyuanAuthHeaders(token)`, used by `siyuanKernelFetch`
* `background.js`: `netImg2LocalAssets` and `/api/extension/copy` fetches use `siyuanAuthHeaders`
* `popup.js`: two inputs after API token, plus `bindPasswordToggle`
* `lib/siyuan-storage-defaults.js`, `_locales/en/messages.json`, `tests/cf-access-headers.test.js`

### ⌨️ Keyboard Shortcuts

The extension supports the following keyboard shortcuts:

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+C` (Windows/Linux) / `Cmd+Shift+C` (Mac) | Copy selected text to SiYuan |
| `Ctrl+Shift+S` (Windows/Linux) / `Cmd+Shift+S` (Mac) | Clip entire page to SiYuan |

Please customize these shortcuts in your browser's extension settings.

### 🔒 Privacy Policy

* All data is stored on a device fully controlled by the user
* No usage data is collected
