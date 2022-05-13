const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "alf123",
    database: "cursos",
    port: 5432,
})

async function nuevoCurso(cursos) {

    console.log("dentro de consultas", cursos)

    const consulta = {
        text: `INSERT INTO cursos (nombre, nivel, fecha, duracion) values ($1, $2, $3, $4) RETURNING *`,
        values: [cursos[0], cursos[1], cursos[2], cursos[3]],
    };

    try {
        const result = await pool.query(consulta);
        return result.rows;
        
    } catch (error) {
        console.log(error);
    }
}

async function consultaCurso() {
    try {
        const result = await pool.query(`SELECT * FROM cursos`);
        return result.rows;
    } catch (error) {
        console.log(error);
    }
}

async function editarCurso(id, cursos) {
    console.log("ID", id + " array", cursos)

    const consulta = {
        text: `UPDATE cursos SET nombre = $1, nivel = $2, fecha = $3, duracion = $4 WHERE id = ${id} RETURNING *`,
        values: [cursos[0], cursos[1], cursos[2], cursos[3]],
    };

    try {
        const result = await pool.query(consulta);
        return result.rows;     

    } catch (error) {
        console.log(error);
    }
}

async function borrarCurso(id) {
    try {
        const result = await pool.query(`DELETE FROM cursos WHERE id = ${id}`)
        return result.rowCount;
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    nuevoCurso, consultaCurso, editarCurso, borrarCurso
}