import { Undo2 } from "lucide-react";
import { Button } from "../button";
export default function RewindButton({ onRewind }) {
  return (
    <Button onClick={onRewind}>
      <Undo2 size={18}></Undo2>
    </Button>
  );
}
