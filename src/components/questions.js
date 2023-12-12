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
            text: "Does HRT cause breast cancer",
            options: answers_mapped["hrt"]
        },
        {
            code: "breastfeed",
            text: "Until what age should I breastfeed my child",
            options: answers_mapped["breastfeed"]

        },
        {
            code: "mammogram",
            text: "When should I stop getting my mammogram?",
            options: answers_mapped["mammogram"]

        },
        {
            code: "asthma",
            text: "Can my child get a nasal flu vaccine.",
            options: answers_mapped["asthma"]

        },
        {
            code: "probiotics",
            text: "Should children take probiotics?",
            options: answers_mapped["probiotics"]

        },
        {
            code: "carseat",
            text: "What age should children move to a front facing car seat.",
            options: answers_mapped["carseat"]

        },
        {
            code: "formula",
            text: "What is the nutritional benfit of toddler milk",
            options: answers_mapped["formula"]

        },
    ] 
    return questions;
}

export default getQuestions;