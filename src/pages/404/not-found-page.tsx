
import { Button } from "@/shared/ui/button"  
import { useNavigate } from "react-router"

  const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    // Внешний div с фоном на всю ширину
    <div className="min-h-screen bg-background">
      
  
      <div className="px-10">
        
        {/* Внутренний контейнер для центрирования и расположения контента */}
        <div className="flex min-h-screen items-center justify-between">
          
          {/* Левая часть */}
          <div className="max-w-md space-y-6">
            <h1 className="text-7xl font-bold text-primary">404</h1>
            <h2 className="text-3xl font-semibold">Страница не найдена</h2>
            <p className="text-muted-foreground text-lg">
              Упс! Страница, которую вы ищете, не существует или была перемещена.
            </p>
            
            <div className="flex gap-4 pt-4">
              <Button onClick={() => navigate("/")}>На главную</Button>
              <Button variant="outline" onClick={() => navigate(-1)}>Вернуться назад</Button>
            </div>
          </div>

          {/* Правая часть */}
          <div className="w-2/5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <img 
                src="/404-illustration.svg"
                alt="404 illustration"
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  )
}

export default NotFoundPage