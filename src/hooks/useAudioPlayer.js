import { useContext, useMemo } from "react";
import { AudioPlayerContext } from "@/provider/AudioProvider";

export function useAudioPlayer(episode) {
  const player = useContext(AudioPlayerContext);
  if (!player) {
    console.error("useAudioPlayer must be used within an AudioProvider");
  }
  return useMemo(
    () => ({
      ...player,
      play() {
        player.play(episode);
      },
      toggle() {
        player.toggle(episode);
      },
      get playing() {
        return player.isPlaying(episode);
      },
    }),
    [player, episode]
  );
}
