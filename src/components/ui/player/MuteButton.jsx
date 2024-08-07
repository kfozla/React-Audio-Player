import { Volume, VolumeX } from "lucide-react";
import { Button } from "../button";

export default function MuteButton({ isMuted, onToggleMute }) {
  const Icon = isMuted ? VolumeX : Volume;
  return (
    <Button onClick={onToggleMute}>
      <Icon></Icon>
    </Button>
  );
}
