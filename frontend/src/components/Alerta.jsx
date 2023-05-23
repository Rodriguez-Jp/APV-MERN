const Alerta = ({ alerta }) => {
  return (
    <>
      <div className="p-2 w-full bg-red-500  rounded-lg text-center">
        <p className="text-white font-bold text-xl">{alerta}</p>
      </div>
    </>
  );
};

export default Alerta;
