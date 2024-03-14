import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
const LazyDashborad = React.lazy(() => import("../pages/Dashboard/dashboard"));
const LazyFullpage = React.lazy(() => import("../pages/Fullpost/fullpost/"));
const LazyWelcome = React.lazy(()=> import("../pages/Welcome/welcome"))


export const Routes = ()=>{
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route
          index
          element={
            <React.Suspense >
              <LazyDashborad />
            </React.Suspense>
          }
        ></Route>
        <Route path="/fullpost" element={
          <React.Suspense>

<LazyFullpage/>
</React.Suspense>
        }>

          
        </Route>
        <Route path="/welcome" element={
          <React.Suspense>

<LazyWelcome/>
</React.Suspense>
        }>

          
        </Route>
        </Route>
    )
)
return <RouterProvider router={router} />;
}
