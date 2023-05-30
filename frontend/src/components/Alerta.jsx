const Alerta = ({ alerta }) => {
  return (
    <>
      <div
        className={`${
          alerta.error
            ? "p-2 w-full bg-red-500 rounded-lg text-center"
            : "p-2 w-full bg-green-500 rounded-lg text-center"
        }`}
      >
        <p className="text-white font-bold text-xl">{alerta.msg}</p>
      </div>
    </>
  );
};

export default Alerta;
