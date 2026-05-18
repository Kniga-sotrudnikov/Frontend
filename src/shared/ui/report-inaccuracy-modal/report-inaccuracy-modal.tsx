import { Dialog, DialogContent, DialogTrigger } from "@ui/dialog";

interface ReportInaccuracyModalProps {
  children: React.ReactNode;
  hrEmail?: string;
}

function ReportInaccuracyModal({
  children,
  hrEmail = "hr@company.com",
}: ReportInaccuracyModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-none w-[90vw] sm:max-w-83.75 rounded-8 p-7">
        <div className="flex flex-col gap-2 text-center">
          <h3 className="body-l-semibold text-black">Заметили неточность?</h3>
          <p className="body-s text-black">
            Если вы обнаружили неверную информацию, пожалуйста, свяжитесь с
            отделом HR:{" "}
            <a
              href={`mailto:${hrEmail}`}
              className="body-s-semibold text-link hover:brightness-125 transition-colors"
            >
              {hrEmail}
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { ReportInaccuracyModal };
