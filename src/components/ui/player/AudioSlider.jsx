// AudioSlider.js
import { Slider } from "@/components/ui/slider";
import { cn, formatTime } from "@/lib/utils";

export default function AudioSlider({
  currentTime,
  duration,
  onValueChange,
  onValueCommit,
}) {
  return (
    <div className="flex gap-2 items-center">
      <Slider
        defaultValue={[currentTime]}
        max={duration}
        step={1}
        className={cn("w-[100%]")}
        onValueChange={onValueChange}
        onValueCommit={onValueCommit}
      />
      <span className="text-sm text-gray-500">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
    </div>
  );
}
