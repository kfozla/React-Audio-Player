// AudioPlayer.js
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import PlayPauseButton from "./PlayPauseButton";
import RewindButton from "./RewindButton";
import ForwardButton from "./ForwardButton";
import MuteButton from "./MuteButton";
import AudioSlider from "./AudioSlider";
import { useEffect, useRef, useState } from "react";

const SEEK_AMOUNT = 10;

export default function AudioPlayer() {
  const player = useAudioPlayer();
  const wasPlayingRef = useRef(false);
  const [currentTime, setCurrentTime] = useState(player.currentTime);

  useEffect(() => {
    setCurrentTime(null);
  }, [player.currentTime]);

  if (!player.episode) return null;

  const playPauseToggle = () => {
    player.toggle();
  };

  const onRewind = () => {
    player.seekBy(-SEEK_AMOUNT);
  };

  const onForward = () => {
    player.seekBy(SEEK_AMOUNT);
  };

  const onToggleMute = () => {
    player.toggleMute();
  };
  const onSeek = (value) => {
    player.seekTo(value);
  };

  return (
    <div className="bg-purple-400 max-w-3xl mx-auto rounded-full flex items-center gap-6 px-6 py-4 shadow shadow-purple-900/80 ring-1 ring-purple-900/5 backdrop-blur-sm">
      <PlayPauseButton
        isPlaying={player.playing}
        onPlayPauseToggle={playPauseToggle}
      />
      <div className="flex flex-col gap-2 flex-1">
        <h2 className="text-black font-bold text-md">{player.episode?.name}</h2>
        <div className="flex items-center justify-between gap-6 flex-1">
          <div className="flex items-center gap-2">
            <RewindButton onRewind={onRewind} />
            <ForwardButton onForward={onForward} />
          </div>
          <div className="flex-1 shrink-0">
            <AudioSlider
              currentTime={currentTime ?? player.currentTime}
              duration={player.duration}
              onValueChange={(value) => onSeek(value)}
              onValueCommit={(value) => {
                onSeek(value);
                if (wasPlayingRef.current) {
                  player.play();
                }
              }}
              onChaneStart={() => {
                wasPlayingRef.current = player.playing;
                player.pause();
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <MuteButton isMuted={player.muted} onToggleMute={onToggleMute} />
          </div>
        </div>
      </div>
    </div>
  );
}
