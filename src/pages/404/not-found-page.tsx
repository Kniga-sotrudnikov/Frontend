// import { Button } from "@/shared/ui/button"  
// import { useNavigate } from "react-router"

// const NotFoundPage = () => {
//   const navigate = useNavigate()

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="px-10">
//         <div className="flex min-h-screen items-center justify-between">
          
//           {/* Левая часть */}
//           <div className="max-w-md flex flex-col gap-5">
//             <h1 className="text-7xl font-bold text-primary">Страница не найдена</h1>
            
//             <p className="text-muted-foreground text-lg">
//               Упс! Страница, которую вы ищете, не существует или была перемещена.
//             </p>
            
//             <div className="flex gap-4 pt-4">
//               <Button onClick={() => navigate("/")}>На главную</Button>
//               <Button variant="outline" onClick={() => navigate(-1)}>Вернуться назад</Button>
//             </div>
//           </div>

//           {/* Правая часть - картинка 795px */}
//           <div className="w-[795px]">
//             <img 
//               src="src/not_found.jpg"
//               alt="404 illustration"
//               className="w-full h-auto"
//             />
//           </div>
          
//         </div>
//       </div>
//     </div>
//   )
// }

// export default NotFoundPage
import { Button } from "@/shared/ui/button"  
import { useNavigate } from "react-router"

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen items-center justify-center px-10">
        
        {/* Этот контейнер центрируется, а внутри него justify-between */}
        <div className="w-full max-w-[1440px]">
          
          {/* Здесь justify-between разносит колонки по краям ЭТОГО контейнера */}
          <div className="flex items-center justify-between gap-[111px]">
            
            {/* Левая часть */}
            <div className="w-[358px] flex flex-col gap-5">
              <h1 className="text-7xl font-bold text-primary">Страница не найдена</h1>
              <p className="text-muted-foreground text-lg">
                Упс! Страница, которую вы ищете, не существует или была перемещена.
              </p>
              <div className="flex gap-4 pt-4">
                <Button onClick={() => navigate("/")}>На главную</Button>
                <Button variant="outline" onClick={() => navigate(-1)}>Вернуться назад</Button>
              </div>
            </div>

            {/* Правая часть */}
            <div className="w-[795px]">
              <img 
                src="src/not_found.jpg"
                alt="404 illustration"
                className="w-full h-auto"
              />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage