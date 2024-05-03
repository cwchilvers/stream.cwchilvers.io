import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import './Video.sass';
import Logo from './assets/logo.svg';

const Video = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        let hls;

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource('http://localhost:8000/live/index.m3u8');
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setIsPlaying(true);
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = 'http://localhost:8000/live/index.m3u8';
            video.addEventListener('loadedmetadata', () => {
                setIsPlaying(true);
            });
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, []);

    return (
        <div className='container'>
            {isPlaying ? (
                <video ref={videoRef} controls autoPlay />
            ) : (
                <div className='fallback'>
                    <img src={Logo} alt='Logo' />
                    <p>No Livestream</p>
                </div>

            )}
        </div>
    );
};

export default Video;
