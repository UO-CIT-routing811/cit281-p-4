// requiring part1
let { data } = require('./p4-data.js');

function getQuestions() {
    // returning the array of questions

    return data.map(e => e.question);
  }
  
function getAnswers() {
    // returning the array of answers
    return data.map(e => e.answer);
}

function getQuestionsAnswers() {
    // returning a clone of the data
    return data.map((item) => {
    return { ...item };
  })
}

function getQuestion(number = "") {
  const response = {
    error: "",
    question: "",
    number:"",
  };

  if (!Number.isInteger(number)) {
    response.error = "Question number must be an integer";
  } else if (number < 1) {
    response.error = "Question number must be >= 1";
  } else if (number > data.length) {
    response.error = `Question number must be less than the number of questions (${data.length})`;
  } else {
    index = number - 1;
    response.number = number;
    response.question = data[index].question;
  }
  return response;
}


function getAnswer(number = "") {
  const response = {
    error: "",
    answer: "",
    number:"",
  };

  if (!Number.isInteger(number)) {
    response.error = "Answer number must be an integer";
  } else if (number < 1) {
    response.error = "Answer number must be >= 1";
  } else if (number > data.length) {
    response.error = `Answer number must be less than the number of questions (${data.length})`;
  } else {
    index = number - 1;
    response.number = number;
    response.answer = data[index].answer;
  }
  return response;
}


function getQuestionAnswer(number = "") {
  const response = {
    error: "",
    question: "",
    answer: "",
    number:"",
  };

  if (!Number.isInteger(number)) {
    response.error = "Question number must be an integer";
  } else if (number < 1) {
    response.error = "Question number must be >= 1";
  } else if (number > data.length) {
    response.error = `Qusetion number must be less than the number of questions (${data.length})`;
  } else {
    index = number - 1;
    response.number = number;
    response.question = data[index].question;
    response.answer = data[index].answer;
  }
  return response
}


// Extra Credit Part 8: Add support for POST
function addQuestionAnswer(info = {}) {
  const response = {
    error: "",
    message: "",
    number:""
  };

  if (info.question&& info.answer) {
    data.push({question: info.question,answer: info.answer});
    response.number = data.length; 
    response.message = "Question added"
  } else {
    response.error = "Object question property required";
    response.number = -1;
  }
    
  return response
}

// Extra Credit Part 9: Add support for PUT
function updateQuestionAnswer(info = {}) {
  const response = {
    error: "",
    message: "",
    number:""
  };
  
  count = data.length;
  if (arguments.length==0 || Object.keys(info).length === 0) { 
  	response.error = "Object question property or answer property required";
  } else if (!Number.isInteger(info.number)) {
    response.error = "Object number property must be a valid integer";
  } else if ( info.number>count || info.number<=0) {
  	response.error = "Object number property must be a valid range";
  }else {
  	index = info.number - 1;
    data[index].question = info.question;
    data[index].answer = info.answer;
    response.number = info.number; 
    response.message = "Question updated"
  }
    
  return response
}

// Extra Credit Part 10: Add support for DELETE
function deleteQuestionAnswer(info = {}) {
  const response = {
    error: "",
    message: "",
    number:""
  };
  
  count = data.length;
  if (!Number.isInteger(info)) {
    response.error = "Question/answer number must be an integer";
  } else if ( info<=0) {
  	response.error = "Question/answer number must be >= 1";
  }else if (info>count){
  	response.error = `Question/answer number must be less than the number of questions (${data.length})`;
  } else {
    let firstpart = data.slice(0, info-1);
    let secondpart = data.slice(info);
    data = [...firstpart, ...secondpart]
    response.message = `Question ${info} deleted, number: ${info} `;
  }
    
  return response
}


/*****************************
  Module function testing
******************************/
function testing(category, ...args) {
    console.log(`\n** Testing ${category} **`);
    console.log("-------------------------------");
    for (const o of args) {
      console.log(`-> ${category}${o.d}:`);
      console.log(o.f);
    }
  }
  
  // Set a constant to true to test the appropriate function
  const testGetQs = false;
  const testGetAs = false;
  const testGetQsAs = false;
  const testGetQ = false;
  const testGetA = false;
  const testGetQA = false;
  const testAdd = false;      // Extra credit
  const testUpdate = false;   // Extra credit
  const testDelete = true;   // Extra credit

// getQuestions()
if (testGetQs) {
    testing("getQuestions", { d: "()", f: getQuestions() });
}
  
// getAnswers()
if (testGetAs) {
    testing("getAnswers", { d: "()", f: getAnswers() });
}
  
// getQuestionsAnswers()
if (testGetQsAs) {
    testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
}
  
// getQuestion()
if (testGetQ) {
    testing(
      "getQuestion",
      { d: "()", f: getQuestion() },      // Extra credit: +1
      { d: "(0)", f: getQuestion(0) },    // Extra credit: +1
      { d: "(1)", f: getQuestion(1) },
      { d: "(4)", f: getQuestion(4) }     // Extra credit: +1
    );
}
  
// getAnswer()
if (testGetA) {
    testing(
      "getAnswer",
      { d: "()", f: getAnswer() },        // Extra credit: +1
      { d: "(0)", f: getAnswer(0) },      // Extra credit: +1
      { d: "(1)", f: getAnswer(1) },
      { d: "(4)", f: getAnswer(4) }       // Extra credit: +1
    );
}
  
// getQuestionAnswer()
if (testGetQA) {
    testing(
      "getQuestionAnswer",
      { d: "()", f: getQuestionAnswer() },    // Extra credit: +1
      { d: "(0)", f: getQuestionAnswer(0) },  // Extra credit: +1
      { d: "(1)", f: getQuestionAnswer(1) },
      { d: "(4)", f: getQuestionAnswer(4) }   // Extra credit: +1
    );
}

// addQuestionAnswer()
if (testAdd) {
  testing(
    "addQuestionAnswer",
    { d: "()", f: addQuestionAnswer() },
    { d: "({})", f: addQuestionAnswer({}) },
    { d: '(question: "Q4")', f: addQuestionAnswer({ question: "Q4" }) },
    { d: '(answer: "A4")', f: addQuestionAnswer({ answer: "A4" }) },
    {
      d: '(question: "Q4", answer: "A4")',
      f: addQuestionAnswer({ question: "Q4", answer: "A4" }),
    }
  );
}

// updateQuestionAnswer()
if (testUpdate) {
  testing(
    "updateQuestionAnswer",
    { d: "()", f: updateQuestionAnswer() },
    { d: "({})", f: updateQuestionAnswer({}) },
    { d: '(question: "Q1U")', f: updateQuestionAnswer({ question: "Q1U" }) },
    { d: '(answer: "A1U")', f: updateQuestionAnswer({ answer: "A1U" }) },
    {
      d: '(question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ question: "Q1U", answer: "A1U" }),
    },
    {
      d: '(number: 1, question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ number: 1, question: "Q1U", answer: "A1U" }),
    }
  );
  console.log(data);
}

// deleteQuestionAnswer()
if (testDelete) {
  testing(
    "deleteQuestionAnswer",
    { d: "()", f: deleteQuestionAnswer() },
    { d: "(0)", f: deleteQuestionAnswer(0) },
    { d: "(1)", f: deleteQuestionAnswer(1) },
    { d: "(0)", f: deleteQuestionAnswer(4) }
  );
  console.log(data);
}

module.exports = {
  getQuestions,
  getAnswers, getQuestionsAnswers, getQuestion,
  getAnswer,getQuestionAnswer,addQuestionAnswer,updateQuestionAnswer,deleteQuestionAnswer
} 