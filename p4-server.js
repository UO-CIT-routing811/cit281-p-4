const fs = require("fs");
let { data } = require("./p4-data.js");
const fastify = require("fastify")();

const { getQuestions,
  getAnswers, getQuestionsAnswers, getQuestion,
  getAnswer,getQuestionAnswer,addQuestionAnswer,updateQuestionAnswer,deleteQuestionAnswer} = require('./p4-module.js')

fastify.get("/cit/question", (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/json; charset=utf-8")
      .send({
        error: "",
        statusCode: 200,
        questions: getQuestions()
    });
  });
fastify.get("/cit/question/:number", (request, reply) => {
    let { number = "" } = request.params;
    const response = {
      error: "",
      statusCode: 200,
      question: "",
      number: ""
    };
    if (number === "") {
      response.error = "Number route paramter required";
      response.statusCode = 404;
    } else {
      number = parseInt(number);
    }
    const questionInfo = getQuestion(number);
    if (questionInfo.error.length > 0) {
      response.error = questionInfo.error;
      response.statusCode = 404;
    } else {
      response.question = questionInfo.question;
      response.number = number
    }
      reply
        .code(response.statusCode)
        .header("Content-Type", "text/json; charset=utf-8")
        .send(response);
    });
fastify.get("/cit/answer", (request, reply) => {
      reply
        .code(200)
        .header("Content-Type", "text/json; charset=utf-8")
        .send({
          error: "",
          statusCode: 200,
          answers: getAnswers()
      });
    });
  
fastify.get("/cit/answer/:number", (request, reply) => {
    let { number = "" } = request.params;
    const response = {
      error: "",
      statusCode: 200,
      answer: "",
      number: ""
    };
    if (number === "") {
      response.error = "Number route paramter required";
      response.statusCode = 404;
    } else {
      number = parseInt(number);
    }
    const answerInfo = getAnswer(number);
    if (answerInfo.error.length > 0) {
      response.error = answerInfo.error;
      response.statusCode = 404;
    } else {
      response.answer = questionInfo.question;
      response.number = number
    }
      reply
        .code(response.statusCode)
        .header("Content-Type", "text/json; charset=utf-8")
        .send(response);
    });
  
  fastify.get("/cit/questionanswer/:number", (request, reply) => {
      let { number = "" } = request.params;
      const response = {
        error: "",
        statusCode: 200,
        question:"",
        answer: "",
        number: ""
      };
      if (number === "") {
        response.error = "Number route paramter required";
        response.statusCode = 404;
      } else {
        number = parseInt(number);
      }
      const questionInfo = getQuestion(number);
      if (questionInfo.error.length > 0) {
      response.error = questionInfo.error;
      response.statusCode = 404;
    } else {
      response.question = questionInfo.question;
      response.number = number
    }
      const answerInfo = getAnswer(number);
      if (answerInfo.error.length > 0) {
        response.error = answerInfo.error;
        response.statusCode = 404;
      } else {
        response.answer = questionInfo.question;
        response.number = number
      }
        reply
          .code(response.statusCode)
          .header("Content-Type", "text/json; charset=utf-8")
          .send(response);
      });  
  

fastify.get("/cit/questionanswer", (request, reply) => {
    reply
      .code(200)
      .header("Content-Type", "text/json; charset=utf-8")
      .send({
        error: "",
        statusCode: 200,
        questions_answers: getQuestionsAnswers()
    });
  });


fastify.get("/cit/*", (request, reply) => {
  reply
    .code(404)
    .header("Content-Type", "text/json; charset=utf-8")
    .send({statusCode: 404, error:"Route not found"});
});


function newQuestionArray(newquestion) {
  data = [
    ...data,
    {
      question: newquestion.question,
      answer: newquestion.answer,
    }
  ]
}

// Extra Credit Part 8
fastify.post("/cit/question", (request, reply) => {
  const newquestion = request.body;
  //addQuestionAnswer(newquestion)
  reply
    .code(201)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      error: "",
      statusCode: 201,
      // questions: newquestion
      number: addQuestionAnswer(newquestion).number
  });
});


// Extra Credit Part 9
fastify.put("/cit/question", (request, reply) => {
  const updatequestion = request.body;
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      error: "",
      statusCode: 200,
      number: updateQuestionAnswer(updatequestion).number
  });
});

// Extra Credit Part 10
fastify.delete("/cit/question/:number", (request, reply) => {
  let { number = "" } = request.params;
  const deletequestion = deleteQuestionAnswer(number)
  const response = {
    error: "",
    statusCode: 200,
    question: "Q1",
    number: ""
  };
  if (number === "") {
    response.error = "Number route paramter required";
    response.statusCode = 404;
  } else {
    number = parseInt(number);
  }
  const questionInfo = getQuestion(number);
  if (questionInfo.error.length > 0) {
    response.error = questionInfo.error;
    response.statusCode = 404;
  } else {
    response.question = questionInfo.question;
    response.number = number.deletequestion
  }

    reply
      .code(response.statusCode)
      .header("Content-Type", "text/json; charset=utf-8")
      .send({
        error: "",
        statusCode: 200,
        number: response
        
    });
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