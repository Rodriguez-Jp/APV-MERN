const Login = () => {
  return (
    <>
      <div>
        <h1 className="text-lime-600 font-black text-6xl">
          Inicia Sesion y Administra a tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div>
        <form action="" className="md:flex flex-col justify-center">
          <div className="flex flex-col p-2">
            <label htmlFor="" className="text-3xl font-bold ">
              Email
            </label>
            <input
              placeholder="Email"
              type="text"
              name="email"
              id="email"
              className="border border-slate-400  rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="" className="text-3xl font-bold ">
              Password
            </label>
            <input
              placeholder="Contraseña"
              type="password"
              name="password"
              id="password"
              className="border border-slate-400  rounded-lg p-2"
            />
          </div>
          <input
            type="submit"
            value="Iniciar sesion"
            className="p-2 rounded-lg mt-4 bg-lime-600 text-white w-full hover:cursor-pointer hover:bg-lime-600/90 transition-colors duration-200"
          />
        </form>
      </div>
    </>
  );
};

export default Login;
