import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import axios from "axios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificarPassword, setVerificarPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, verificarPassword].includes("")) {
      setAlerta({
        msg: "Por favor diligencia todos los campos",
        error: true,
      });
      return;
    }

    if (password !== verificarPassword) {
      setAlerta({ msg: "Las password no coinciden", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({ msg: "La password es demasiado corta", error: true });
      return;
    }

    setAlerta({});

    //En caso de pasar las validaciones, sube el formulario a la API
    try {
      const url = "http://localhost:4000/api/veterinarios";
      await axios.post(url, { nombre, email, password });

      setAlerta({
        msg: "Veterinario registrado, revisa tu email para confirmar tu cuenta",
        error: false,
      });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className="mt-20 md:mt-10">
        <h1 className="text-lime-600 font-black text-6xl">
          Crea una cuenta y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="shadow-xl px-5 py-10 rounded-xl mt-20 md:mt-10">
        {msg && <Alerta alerta={alerta} />}
        <form
          action=""
          className="md:flex flex-col justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col p-2">
            <label htmlFor="" className="text-3xl font-bold ">
              Nombre
            </label>
            <input
              placeholder="Nombre"
              type="text"
              name="nombre"
              id="nombre"
              className="border border-slate-400  rounded-lg p-2 mt-2"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="" className="text-3xl font-bold ">
              Email
            </label>
            <input
              placeholder="Email"
              type="text"
              name="email"
              id="email"
              className="border border-slate-400  rounded-lg p-2 mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
            />
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="" className="text-3xl font-bold ">
              Crea una password
            </label>
            <input
              placeholder="Crea una password"
              type="password"
              name="password"
              id="password"
              className="border border-slate-400  rounded-lg p-2 mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col p-2">
            <label htmlFor="" className="text-3xl font-bold ">
              Verifica tu password
            </label>
            <input
              placeholder="Verifica tu password"
              type="password"
              name="verificarPassword"
              id="verificarPassword"
              className="border border-slate-400  rounded-lg p-2 mt-2"
              value={verificarPassword}
              onChange={(e) => setVerificarPassword(e.target.value)}
            />
          </div>
          <div className="p-2">
            <input
              type="submit"
              value="Registrarse"
              className="p-2 rounded-lg mt-4 bg-lime-600 text-white w-full hover:cursor-pointer hover:bg-lime-600/90 transition-colors duration-200"
            />
          </div>
        </form>
        <nav className="lg:flex justify-between my-10 text-center">
          <Link to="/" className="text-gray-400 p-2">
            <h2>Ya tienes una cuenta? Inicia sesion!</h2>
          </Link>
          <Link to="/olvide-password" className="text-gray-400 p-2">
            <h2>Olvide mi password</h2>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
