const fs = require("fs");
const fastify = require("fastify")();

const students = [
  {
    id: 1,
    last: "Last1",
    first: "First1",
  },
  {
    id: 2,
    last: "Last2",
    first: "First2",
  },
  {
    id: 3,
    last: "Last3",
    first: "First3",
  }
];

function maxID () {
  let ids = students.map( (item) => item.id);
  return Math.max.apply(null, Object.values(ids)) +1;
};

function newStudentArray(student) {
  students = [
    ...students,
    {
      id: maxID(),
      last: student.last,
      first: student.first,
    }
  ]
}

function getStudentById(id) {
  for(let s of students) {
    if (s.id === id) {
      return s;
    }
  }
  return null;
}
function getLastIdInStudents() {
  return null
}
function appendToStudentObject(sd){
  students = [...students, 
    {first: sd.first, last: sd.last, id: getLastIdInStudents() }]
}

fastify.get("/cit/student", (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(students);
  });

fastify.post("/cit/student", (request, reply) => {
  const  newStudent = request.body;
  newStudentArray(newStudent);
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(students);
  });

fastify.get("/cit/student/:id", (request, reply) => {
    let { id } = request.params;
    id = parseInt(id);
    let resp = getStudentById(id);
    for (const id of students)
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(resp);
  });

  fastify.get("/cit/*", (request, reply) => {
    reply
      .code(404)
      .header("Content-Type", "application/json; charset=utf-8")
      .send( {error: "route not found"} );
  });

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});