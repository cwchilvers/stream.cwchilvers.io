const NodeMediaServer = require('node-media-server');
const { deleteStreams } = require('./utils/deleteStreams');
const { deleteChunks } = require('./utils/deleteChunks');
const cors = require('cors');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: 8000,
    mediaroot: './media',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: './ffmpeg/ffmpeg.exe',
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
      }
    ]
  }
};

deleteStreams('./media');

setInterval(() => {
  deleteChunks('./media');
}, 10000);

const nms = new NodeMediaServer(config);

const events = ['preConnect', 'postConnect', 'doneConnect', 'prePublish', 'postPublish', 'donePublish', 'prePlay', 'postPlay', 'donePlay'];

events.forEach(eventName => {
  nms.on(eventName, (id, ...args) => {
    console.log(`[NodeEvent on ${eventName}]`, `id=${id} args=${JSON.stringify(args)}`);
  });
});

nms.run();

