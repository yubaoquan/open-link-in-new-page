/* global chrome */
window.addEventListener('load', () => {
    const checkbox = document.querySelector('#checkbox')
    chrome.storage.sync.get('openInNewPage', (item) => {
        if (item.openInNewPage === 1) {
            checkbox.checked = true
        }
    })
    function dispatchAll() {
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach((tab) => {
                chrome.tabs.sendMessage(tab.id, {
                    type: 'target-blank',
                })
            })
        })
    }
    function dispatchAddTarget() {
        chrome.tabs.query({
            active: true,
            currentWindow: true,
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: 'target-blank',
            }, function(response) {
                console.log(response)
            })
        })
    }
    document.querySelector('#btn').addEventListener('click', () => {
        dispatchAddTarget()
    })
    checkbox.addEventListener('click', () => {
        console.info(checkbox.checked)
        const openInNewPage = checkbox.checked ? 1 : 0
        chrome.storage.sync.set({ openInNewPage }, () => {
            dispatchAll()
        })
    })
})
