import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-75">
      <div className="flex min-h-screen items-center justify-center px-5 sm:px-10">
        <div className="w-full max-w-[1440px]">
          <div className="flex flex-col items-center justify-between gap-[111px] lg:flex-row">
            {/* Левая часть */}
            <div className="w-full max-w-[358px] flex flex-col gap-4 lg:ml-[97px] items-center lg:items-start">
              <h1 className="h3">Страница не найдена</h1>
              <p className="body-s">
                Ссылка могла устареть или у вас нет доступа.
              </p>
              <div className="flex gap-5">
                <Button
                  variant="outline"
                  size="default"
                  className=" border-purple-500 bg-purple-600 text-white hover:bg-purple-700 px-[20px]"
                  onClick={() => navigate("/")}
                >
                  На главную
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  className="   border-purple-500 text-purple-700 bg-white hover:bg-purple-50 px-[20px]"
                  onClick={() => navigate(-1)}
                >
                  Связаться с HR
                </Button>
              </div>
            </div>

            {/* Правая часть - картинка максимум 320px */}
            <div className="w-full max-w-[320px] lg:w-[795px] lg:max-w-none">
              <img
                src="src/shared/assets/images/404.png"
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

export default NotFoundPage;
