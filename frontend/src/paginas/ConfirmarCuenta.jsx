import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setAlerta({ msg: data.msg, error: false });
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
      setCargando(false);
    };

    confirmarCuenta();
  }, []);
  return (
    <>
      <div className="mt-20 md:mt-10">
        <h1 className="text-lime-600 font-black text-6xl">
          Confirma tu cuenta y Administra tus{" "}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>
      <div className="shadow-xl px-5 py-10 rounded-xl mt-20 md:mt-10">
        {!cargando && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link to="/" className="text-gray-400 text-center">
            <h2 className="mt-4">Inicia sesion!</h2>
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
