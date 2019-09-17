console.log('LoL Current Song extension is ready and listening!');

const NATIVE_HOST = 'lol_current_song';
let currentYouTubeTabId = 0;
let patterns = [
    ' - YouTube Music', ' - YouTube',
];

setInterval(() => {
    let sent = false;
    browser
        .tabs
        .query({ audible: true })
        .then(tabs => tabs.map(tab => {
            if (!sent) {
                for (let i in patterns) {
                    if (tab.title.endsWith(patterns[i])) {
                        sendCurrentSong(tab.title.substring(0, tab.title.length - patterns[i].length))
                        sent = true;
                    }
                }
            }
        }));
}, 15000);

function sendCurrentSong(song) {
    let message = '--set-status "' + song + '" --provider firefox:youtube';
    var port = browser.runtime.connectNative(NATIVE_HOST);
    console.log('Sending song to ' + NATIVE_HOST, message);
    port.postMessage(message);
}