import { Button } from "@/shared/ui/button";
import { Link, useNavigate } from "react-router";
import { ROUTES } from "@/shared/model/routes/routes";
import NotFoundImage from "@/shared/assets/images/404.svg";

const NotFoundPage = () => {
  const navigate = useNavigate();

  // TODO: заменить константу в ROUTES после определения финального пути
  const handleContactHR = () => {
    navigate(ROUTES.CONTACT_HR);
  };

  return (
    <div className="min-h-screen bg-gray-75">
      <div className="flex min-h-screen items-center justify-center px-5 sm:px-10">
        <div className="w-full max-w-360">
          <div className="flex flex-col items-center justify-between gap-27.5 lg:flex-row">
            {/* Левая часть */}
            <div className="w-full max-w-89.5 flex flex-col gap-4 lg:ml-23.75 items-center lg:items-start">
              <h1 className="h3 text-purple-400">Страница не найдена</h1>
              <p className="body-s">
                Ссылка могла устареть или у вас нет доступа.
              </p>
              <div className="flex gap-5">
                <Button
                  asChild
                  variant="outline"
                  size="default"
                  className="button-small bg-purple-500 border-purple-500 text-white hover:bg-purple-400 hover:text-white px-3.75"
                >
                  <Link to={ROUTES.EMPLOYEES}>На главную</Link>
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  onClick={handleContactHR}
                  className="button-small bg-white border-purple-500 text-black hover:bg-purple-100 px-3.75"
                >
                  Связаться с HR
                </Button>
              </div>
            </div>
            {/* Правая часть */}
            <div className="w-full max-w-[320px] lg:w-198.75 lg:max-w-none">
              <img
                src={NotFoundImage}
                alt="404 illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Component = NotFoundPage;
