const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let recursos = [
  {
    id: 1,
    titulo: "Introducción a Kotlin",
    descripcion: "Libro básico para empezar con Kotlin",
    tipo: "Libro",
    enlace: "https://kotlinlang.org",
    imagen: "https://example.com/imagen1.jpg"
  },
  {
    id: 2,
    titulo: "Tutorial Retrofit",
    descripcion: "Cómo usar Retrofit paso a paso",
    tipo: "Video",
    enlace: "https://youtube.com/tutorial-retrofit",
    imagen: "https://example.com/imagen2.jpg"
  }
];

app.get("/recursos", (req, res) => res.json({ recursos }));
app.get("/recursos/:id", (req, res) => {
  const recurso = recursos.find(r => r.id == req.params.id);
  recurso ? res.json(recurso) : res.status(404).json({ error: "No encontrado" });
});
app.post("/recursos", (req, res) => {
  const nuevo = { id: Date.now(), ...req.body };
  recursos.push(nuevo);
  res.status(201).json(nuevo);
});
app.put("/recursos/:id", (req, res) => {
  const index = recursos.findIndex(r => r.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "No encontrado" });
  recursos[index] = { ...recursos[index], ...req.body };
  res.json(recursos[index]);
});
app.delete("/recursos/:id", (req, res) => {
  const index = recursos.findIndex(r => r.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "No encontrado" });
  recursos.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
