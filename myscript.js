/* global chrome */

chrome.storage.sync.get('openInNewPage', (item) => {
    if (item.openInNewPage === 1) {
        setLinkOpenInNewTab()
    }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    setLinkOpenInNewTab()
    sendResponse({ farewell: 'goodbye' })
})

function setLinkOpenInNewTab() {
    const links = document.querySelectorAll('a')
    const realLinks = [].filter.call(links, (link) => {
        const href = link.getAttribute('href')
        return href && !href.match(/^javascript/i)
    })
    realLinks.forEach((link) => {
        if (link.getAttribute('target') != '_blank') {
            link.setAttribute('target', '_blank')
        }
    })
}
