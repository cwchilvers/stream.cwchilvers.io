const fs = require('fs');
const path = require('path');

function deleteStreams(media) {
    const files = fs.readdirSync(media);
    files.forEach(file => {
        const filePath = path.join(media, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            fs.rmdirSync(filePath, { recursive: true });
        }
    });
}

module.exports = { deleteStreams };