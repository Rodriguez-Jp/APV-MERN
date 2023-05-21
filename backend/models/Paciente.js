import moongose from "mongoose";

const pacienteSchema = moongose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    propietario: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fechaAlta: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    sintomas: {
      type: String,
      required: true,
    },
    veterinario: {
      type: moongose.Schema.Types.ObjectId,
      ref: "Veterinario",
    },
  },
  { timestamps: true }
);

const Paciente = moongose.model("Paciente", pacienteSchema);

export default Paciente;
