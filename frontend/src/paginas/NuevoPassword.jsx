import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import { useParams, useNavigate } from "react-router-dom";

const NuevoPassword = () => {
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [verificarNuevaPassword, setVerificarNuevaPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(true);
  const [tokenConfirmado, setTokenConfirmado] = useState(false);
  const [passwordCambiada, setPasswordCambiada] = useState(false);
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();

  useEffect(() => {
    const confirmarToken = async () => {
      try {
        const url = `/veterinarios/olvide-password/${token}`;
        await clienteAxios.get(url);
        setTokenConfirmado(true);
        setAlerta({ msg: "Puedes cambiar tu password!", error: false });
      } catch (error) {
        setAlerta({ msg: "Hubo un problema con el enlace", error: true });
      }
      setCargando(false);
    };
    confirmarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Hacemos validaciones basicas
    if (nuevaPassword.length < 6) {
      setAlerta({ msg: "Las passwords es muy corta", error: true });
      return;
    }
    if (nuevaPassword !== verificarNuevaPassword) {
      setAlerta({ msg: "Las passwords no coinciden", error: true });
      return;
    }

    setAlerta({});

    //Despues de pasadas las validaciones, hacemos el post en la API
    try {
      const url = `/veterinarios/olvide-password/${token}`;
      await clienteAxios.post(url, {
        password: nuevaPassword,
      });
      setAlerta({
        msg: "Password reestablecida, seras redirigido al login!",
        error: false,
      });
      setPasswordCambiada(true);

      //Lo envia de nuevo al login
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setAlerta("Hubo un error cambiando tu password");
    }
  };

  return (
    <>
      <div className="mt-20 md:mt-10">
        <h1 className="text-lime-600 font-black text-6xl">
          Recupera tu acceso y tus <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="shadow-xl px-5 py-10 rounded-xl mt-20 md:mt-10">
        {!cargando && <Alerta alerta={alerta} />}
        {tokenConfirmado && !passwordCambiada && (
          <form
            action=""
            className="md:flex flex-col justify-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col p-2">
              <label htmlFor="" className="text-3xl font-bold ">
                Ingresa tu nueva password
              </label>
              <input
                placeholder="Nueva password"
                type="password"
                name="nueva-password"
                id="nueva-password"
                className="border border-slate-400  rounded-lg p-2 mt-2"
                value={nuevaPassword}
                onChange={(e) => {
                  setNuevaPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col p-2">
              <label htmlFor="" className="text-3xl font-bold ">
                Verifica tu nueva password
              </label>
              <input
                placeholder="Verifica tu nueva password"
                type="password"
                name="verifica-nueva-password"
                id="verifica-nueva-password"
                className="border border-slate-400  rounded-lg p-2 mt-2"
                value={verificarNuevaPassword}
                onChange={(e) => {
                  setVerificarNuevaPassword(e.target.value);
                }}
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
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
