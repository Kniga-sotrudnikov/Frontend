import { Outlet } from "react-router";
import { Sidebar } from "@/widgets/sidebar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@ui/dialog";
import { Button } from "@ui/button";
import { useDialogState } from "@/shared/lib";

export function App() {
  const { open, onOpenChange } = useDialogState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
             <Button>Открыть диалог</Button>
          </DialogTrigger> 
          <DialogContent>
            <DialogHeader className="justify-between">
              <DialogTitle>Модальное окно</DialogTitle>
              <DialogClose variant="icon" />
            </DialogHeader>
            <div className="flex flex-col gap-1">
              {Array.from({ length: 10 }, (_, i) => (
                <p key={i}>Это {["первая","вторая","третья","четвёртая","пятая","шестая","седьмая","восьмая","девятая","десятая"][i]} строка</p>
              ))}
            </div>
            <DialogFooter divided className="justify-end gap-3">
              <DialogClose />
              <Button >Подтвердить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Outlet />
      </main>
    </div>
  );
}
