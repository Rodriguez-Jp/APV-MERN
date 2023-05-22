import { Link } from "react-router-dom";

const OlvidePassword = () => {
  return (
    <>
      <div className="mt-20 md:mt-10">
        <h1 className="text-lime-600 font-black text-6xl">
          Recupera tu acceso y tus <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="shadow-xl px-5 py-10 rounded-xl mt-20 md:mt-10">
        <form action="" className="md:flex flex-col justify-center">
          <div className="flex flex-col p-2">
            <label htmlFor="" className="text-3xl font-bold ">
              Ingresa tu email para buscar tu cuenta
            </label>
            <input
              placeholder="Email"
              type="text"
              name="email"
              id="email"
              className="border border-slate-400  rounded-lg p-2 mt-2"
            />
          </div>
          <div className="p-2">
            <input
              type="submit"
              value="Reestablecer password"
              className="p-2 rounded-lg mt-4 bg-lime-600 text-white w-full hover:cursor-pointer hover:bg-lime-600/90 transition-colors duration-200"
            />
          </div>
        </form>
        <nav className="lg:flex justify-between my-10 text-center">
          <Link to="/" className="text-gray-400 p-2">
            <h2>Recordaste tu password? Inicia sesion!</h2>
          </Link>
          <Link to="/registrar" className="text-gray-400 p-2">
            <h2>No tienes cuenta? Registrate</h2>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
