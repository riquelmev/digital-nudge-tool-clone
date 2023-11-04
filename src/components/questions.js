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
            options: answers_mapped["hrt"]
        },
        {
            code: "breastfeed",
            text: "Placeholder",
            options: answers_mapped["breastfeed"]

        },
        {
            code: "mammogram",
            text: "mammogram",
            options: answers_mapped["mammogram"]

        },
        {
            code: "asthma",
            text: "asthma",
            options: answers_mapped["asthma"]

        },
        {
            code: "probiotics",
            text: "probiotics",
            options: answers_mapped["probiotics"]

        },
        {
            code: "carseat",
            text: "carseat",
            options: answers_mapped["carseat"]

        },
        {
            code: "formula",
            text: "formula",
            options: answers_mapped["formula"]

        },
    ] 
    return questions;
}

export default getQuestions;