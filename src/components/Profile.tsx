import { Power } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Label } from "./ui/Label";
import { Button } from "./ui/Button";

export function Profile() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/zagob.png" />
          <AvatarFallback>Matheus</AvatarFallback>
        </Avatar>
        <Label>Matheus Zago</Label>
      </div>

      <Button className="w-fit group">
        <Power className="w-6 h-6 text-red-400 group-hover:text-red-300 transition-all" />
      </Button>
    </div>
  );
}
