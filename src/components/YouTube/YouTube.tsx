import { useState } from 'react';
import './YouTube.css';

interface YouTubeProps {
  id: string;
  title: string;
  /** Local poster shown until the visitor presses play. */
  poster: string;
  /** CSS aspect-ratio of the video, e.g. '16 / 9' or '9 / 16' for Shorts. */
  aspect?: string;
  className?: string;
}

/**
 * Click-to-load YouTube player: a poster and play button until pressed, then the
 * privacy-enhanced (youtube-nocookie) embed. Nothing loads from YouTube before that.
 */
const YouTube: React.FC<YouTubeProps> = ({ id, title, poster, aspect = '16 / 9', className = '' }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`yt ${className}`} style={{ aspectRatio: aspect }}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className="yt-facade" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
          <img src={poster} alt="" loading="lazy" decoding="async" />
          <span className="yt-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="30" height="30"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>
          </span>
        </button>
      )}
    </div>
  );
};

export default YouTube;
