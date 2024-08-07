import { useEffect, useState } from "react";
import { Button } from "../button";
import { Play, Pause } from "lucide-react";

export default function PlayPauseButton({ isPlaying, onPlayPauseToggle }) {
  const Icon = isPlaying ? Pause : Play;
  return (
    <Button onClick={onPlayPauseToggle}>
      <Icon></Icon>
    </Button>
  );
}
