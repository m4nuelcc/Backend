// +-------------+----------------------+------+-----+---------------------+-------------------------------+
// | Field       | Type                 | Null | Key | Default             | Extra                         |
// +-------------+----------------------+------+-----+---------------------+-------------------------------+
// | actor_id    | smallint(5) unsigned | NO   | PRI | NULL                | auto_increment                |
// | first_name  | varchar(45)          | NO   |     | NULL                |                               |
// | last_name   | varchar(45)          | NO   | MUL | NULL                |                               |
// | last_update | timestamp            | NO   |     | current_timestamp() | on update current_timestamp() |
// +-------------+----------------------+------+-----+---------------------+-------------------------------+
// SET GLOBAL FOREIGN_KEY_CHECKS=0 para que pueda borrar


var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
  // host     : '192.168.105.122',
  host: "localhost",
  user: "root",
  password: "a",
  database: "sakila"
  // database : 'domingo'
});

connection.connect();
//npm install body-parser para que se pueda leer body
app.use(bodyParser.json());
//Control de acceso HTTP (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Content-Type", "application/json");
  next();
});

//insertar registro por metodo PUT
insertActor = (req, res) => {
  let  sql = ` insert into actor (first_name, last_name) values (?, ?)`;
  connection.query(
    sql,
    [req.body.first_name, req.body.last_name],
    (err, datos) => {
      console.log(datos);
      res.send();
    }
  );
};

//borrar registro por metodo DELETE
deleteActor = (req, res) => {
  let sql = "delete from actor where actor_id = ?";
  connection.query(sql, [req.body.actor_id], (err, data) => {
    console.log(req.body);
    console.log(data ? data : err);
    res.send(console.log(sql, req.body.actor_id));
  });
};
//mostar tabla por metodo  GET
getActor = (req, res) => {
  let sql = "select * from actor where actor_id = ?";
  connection.query(sql, [req.params.actor_id], (err, data) => {
    console.log(data ? data : err);
    res.send(data[0]);
  });
};

//actualizar un registro por metodo POST
updateActor = (req, res) => {
  let sql = "update actor set first_name = ?, last_name = ? where actor_id = ?";
  connection.query(
    sql,
    [req.body.first_name, req.body.last_name, req.body.actor_id],
    (err, data) => {
			console.log(data ? data : err);
			res.send(console.log(sql, req.body.actor_id));
		}
  );
};

//mostar un registro por una id con metodo GET
getActores = (req, res) => {
  let sql = "select * from actor order by actor_id";
  connection.query(sql, [], (err, data) => {
    console.log(data ? data : err);
    res.send(data);
  });
};

app.get("/actor", getActores); // listado de la tabla
app.get("/actor/:actor_id", getActor); // listado de la tabla
app.put("/actor", insertActor); // insert
app.post("/actor", updateActor); // update
app.delete("/actor", deleteActor); // delete

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

app.get("/", (req, res) => {
  res.send("hola mundo");
});

// app.post('/insert/', (req, res) =>{
//   sql = ` insert into actor (first_name, last_name) values (?, ?)`
//   connection.query(sql, [req.body.first_name, req.body.last_name], (err, datos) =>{
//   console.log(req.body)
//   })
//   res.send('ok ')
//   })

// 	app.listen(3000, function() {
// 		console.log('Example app listening on port 3000!');
// 	});

// 	insertCliente = (req, res) => {
// 		sql = ` insert into clientes (nombre, precio) values (?, ?)`
// 		connection.query(sql, [
// 		req.body.nombre,
// 		req.body.precio
// 		], (err, datos) => { console.log(datos); res.send() })
// 		}

// 		app.put('clientes', insertCliente)

// deleteCliente = (req, res) => {
// 	sql = `delete from clientes where id = ?`;
// 	connection.query(sql, [req.body.id], (err, data) => {
// 	console.log(req.body)
// 	res.send()
// 	})
// 	}

// 	app.delete('/clientes', deleteCliente)

// METODOS GET
{
  /* <form action="http://localhost:3000/insert" method="GET">

<input type="text" name="nombre" placeholder="nombre">
<input type="number" name="precio">
<input type="submit">
</form>Delete
 */
}

// app.get('/insert/', (req, res) =>{
//   sql = ` insert into miercoles (nombre, precio) values (?, ?)`
//   connection.query(sql, [req.query.nombre, req.query.precio], (err, datos) =>{
//   console.log(datos)
//   })
//   res.send('ok ')
//   })

// app.get('/propietarios', (req, res) => {
// 	connection.query('select * from propietarios', (error, posibleDatos) => {
// 		res.send(posibleDatos);
// 	});
// });

// app.get('/tabla/:nombre', (req, res) => {
// 	let sql = 'select * from ??; ';
// 	connection.query(sql, [ req.params.nombre ], (err, datos) => {
// 		console.log(datos);
// 		res.send(datos);
// 	});
// });

// funcion que vale para listar todos los datos
// de cualquier tabla
