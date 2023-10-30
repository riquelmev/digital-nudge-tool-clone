import getAnswers from './answers.js'
import getAnswersMapped from './answers_mapped.js';

const getQuestions = () => {
    const answers = getAnswers();
    const answers_mapped = getAnswersMapped();

    // console.log(answers_mapped)

    const questions = [
        {
            code: "texas",
            text: "Until what milestone is abortion legal in Texas?",
            options: answers_mapped["texas"]
        },
        {
            code: "hrt",
            text: "Placeholder",
            options: answers
        },
        {
            text: "Placeholder",
            options: answers

        },
        {
            text: "Placeholder",
            options: answers

        },
        {
            text: "Placeholder",
            options: answers

        },
    ] 
    return questions;
}

export default getQuestions;