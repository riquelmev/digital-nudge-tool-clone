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
            text: "What is the effect of combined HRT on breast cancer?",
            options: answers_mapped["hrt"]
        },
        {
            code: "asthma",
            text: "Can my child get a nasal flu vaccine if they have asthma?",
            options: answers_mapped["asthma"]

        },
        {
            code: "formula",
            text: "What is the nutritional benfit of toddler milk?",
            options: answers_mapped["formula"]

        },
        {
            code: "lung",
            text: "How often should I get screened for lung cancer?",
            options: answers_mapped["lung"]

        },
        {
            code: "covid-vax",
            text: "What is the youngest age a child can get a covid-19 vaccine?",
            options: answers_mapped["covid-vax"]

        },
        {
            code: "sweets",
            text: "What role do non-sugar sweetners play in weight-loss?",
            options: answers_mapped["sweets"]

        },
        {
            code: "rsv",
            text: "Is there an RSV vaccine available for my newborn?",
            options: answers_mapped["rsv"]

        },
        
    ] 
    return questions;
}

export default getQuestions;