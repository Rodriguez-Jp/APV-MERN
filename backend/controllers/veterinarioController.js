const registrar = (req, res) => {
  res.json({ url: "Desde el login" });
};

const perfil = (req, res) => {
  res.json({ url: "Desde el perfil" });
};

export { registrar, perfil };
