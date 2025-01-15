'use strict';

const mockData = require('./mockData.js').data;
const prompt = require('prompt-sync')();

// Your code here


const userProfile = {
  first_name: "What is your first name?",
  last_name: "What is your last name?",
  age: "How old are you?",
  gender: "What is your gender?",
  gender_interest: "What gender are you interested in?",
  location: "Where are you located?",
  min_age_interest: "What is the minimum age you're interested in?",
  max_age_interest: "What is the maximum age you're interested in?",
  }

const answers = {};

const questions = Object.keys(userProfile);

for (let i = 0; i < questions.length; i++) {
  const questionKey = questions[i];
  const question = userProfile[questionKey];

  while (true) {
    const answer = prompt(question);
    let valid = true;

    switch (questionKey) {
      case "first_name":
      case "last_name":
        if (answer === "") {
          console.log("That answer is too short.")
          valid = false;
        }
        break;
      case "age":
        const age = Number(answer);
        if (age < 18) {
          console.log("User must be at least 18.");
          valid = false;
        } else if (isNaN(age)) {
          console.log("Please enter a valid age.");
          valid = false;
        } else {
          answers.age = age;
        }
        break;
      case "gender":
        if (answer !== "M" && answer !== "F" && answer !== "X") {
            console.log("Gender must be 'M', 'F' or 'X'.");
            valid = false;
          } else {
            answers.gender = answer;
          }
        break;
      case "gender_interest":
        if (answer !== "M" && answer !== "F" && answer !== "X") {
            console.log("Gender must be 'M', 'F' or 'X'.");
            valid = false;
          } else {
          answers.gender_interest = answer;
          }
        break;
      case "location":
        if (answer !== 'rural' && answer !== 'city') {
          console.log("Location must be 'rural' or 'city' (case sensitive).")
          valid = false;
        } else {
          answers.location = answer;
        }
        break;
      case "min_age_interest":
        const min_age_interest = Number(answer);
        if (min_age_interest < 18) {
          console.log("User must be at least 18.");
          valid=false;
        } else if (isNaN(min_age_interest)) {
          console.log("Please enter a valid age.");
          valid=false;
        } else {
            answers.min_age_interest = answer;
        }  
          break;
      case "max_age_interest":
        const max_age_interest = Number(answer);
        if (answer === "" || isNaN(max_age_interest)) {
          console.log("Please enter a valid age.");
          valid = false;
        } else {
          answers.max_age_interest = answer;
        }
        break;
      default:
        answers[questionKey] = answer;
        break;
  }

    if (valid) {
      // Additional check for age interests after both are collected
      if (questionKey === 'max_age_interest' && answers['min_age_interest'] && answers['max_age_interest']) {
        if (answers['max_age_interest'] < answers['min_age_interest']) {
          console.log("Maximum age interest must be higher than minimum age interest");
          valid = false;
        }
      }

      if (valid) break;
    }
    }
    }

    console.log(answers);

const matches = [];
  for (let i = 0; i < mockData.length; i++) {
    const data = mockData[i];
    let isMatch = true;

    if (data.age < answers.min_age_interest || data.age > answers.max_age_interest) {
      isMatch = false;
    }

    if (data.gender_interest !== answers.gender) {
      isMatch = false;
    }

    if (data.location !== answers.location) {
      isMatch = false;
    }

    if (isMatch) {
      matches.push(data);
    }
  }

  console.log("Matching Results:");
  console.log(matches);

  console.log(`Number of compatible users: ${matches.length}`);

