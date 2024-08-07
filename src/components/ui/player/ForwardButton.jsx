import { Redo2 } from "lucide-react";
import { Button } from "../button";
export default function RewindButton({ onForward }) {
  return (
    <Button onClick={onForward}>
      <Redo2 size={18}></Redo2>
    </Button>
  );
}
