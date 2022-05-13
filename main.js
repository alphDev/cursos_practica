const express = require("express");
const bodyParser = require("body-parser");

const { nuevoCurso, consultaCurso, editarCurso, borrarCurso } = require("./consultas")
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.listen(3000);

app.use(express.static("public"));

let cursos = []

app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/curso", async (req, res) => {
    const nuevo_curso = req.body;
    //console.log(nuevo_curso.nombre);
    cursos = [nuevo_curso.nombre, parseInt(nuevo_curso.nivelTecnico), nuevo_curso.fechaInicio,  parseInt(nuevo_curso.duracion)]
    const respuesta = await nuevoCurso(cursos);

    res.send(respuesta);
});

app.get("/cursos", async (req, res) => {
    const respuesta = await consultaCurso();
    res.json(respuesta)
});

app.put("/curso", async (req, res) => {
    const editar_curso = req.body;
    //console.log(editar_curso);
    const id = parseInt(editar_curso.id)

    cursos = [editar_curso.nombre, parseInt(editar_curso.nivelTecnico), editar_curso.fechaInicio,  parseInt(editar_curso.duracion)]

    const respuesta = await editarCurso(id, cursos);
    res.sendFile(__dirname + "/public/index.html")
})

app.delete("/curso/:id", async (req, res) => {
    const { id } = req.params;
    const respuesta = await borrarCurso(id);
    
    respuesta > 0
        ? res.sendFile(__dirname + "/public/index.html")
        : res.send("No se puedo borrar curso");  
});