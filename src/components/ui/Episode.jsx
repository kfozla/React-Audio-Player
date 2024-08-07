import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Play, Pause } from "lucide-react";

export default function Episode({ episode }) {
  const player = useAudioPlayer(episode);
  return (
    <Card className="">
      <CardContent className="flex flex-col gap-2 items-start">
        <h2 className="text-2xl font-bold">{episode.name}</h2>
        <p
          className="text-md text-muted-foreground line-clamp-2"
          dangerouslySetInnerHTML={{ __html: episode.description }}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => player.toggle()}>
          {player.playing ? <Pause /> : <Play />}
        </Button>
      </CardFooter>
    </Card>
  );
}
