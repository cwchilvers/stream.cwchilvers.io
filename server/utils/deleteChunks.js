const fs = require('fs');
const path = require('path');

function deleteChunks(media) {
    const thresholdTime = Date.now() - 30000;
    const files = fs.readdirSync(media);
    files.forEach(file => {
        const filePath = path.join(media, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile() && stat.mtimeMs < thresholdTime) {
        fs.unlinkSync(filePath);
        }
    });
}

module.exports = { deleteChunks };
