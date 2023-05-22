import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-12 md:gap-16">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
