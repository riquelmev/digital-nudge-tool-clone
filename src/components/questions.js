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
            options: answers_mapped["texas"],
            text2: "What is this passage about?",
            options2: answers_mapped["texas2"],
        },
        {
            code: "hrt",
            text: "What is the effect of combined HRT on breast cancer?",
            options: answers_mapped["hrt"],
            text2: "What is the effect of estrogen-only HRT on breast cancer?",
            options2: answers_mapped["texas2"],
        },
        {
            code: "asthma",
            text: "Can my child get a nasal flu vaccine if they have asthma?",
            options: answers_mapped["asthma"],
            text2: "The nasal flu vaccine contains what distinction compared to an injectable flu vaccine?",
            options2: answers_mapped["texas2"],

        },
        {
            code: "formula",
            text: "When should parents start giving their child toddler milk to ensure a balanced diet?",
            options: answers_mapped["formula"],
            text2: "What nutritional benefit does toddler milk contain? ",
            options2: answers_mapped["texas2"],

        },
        {
            code: "lung",
            text: "How often should I get screened for lung cancer?",
            options: answers_mapped["lung"],
            text2: "Should smokers who quit 20 years ago get screened for lung cancer?",
            options2: answers_mapped["texas2"],

        },
        // {
        //     code: "covid-vax",
        //     text: "What is the youngest age a child can get a covid-19 vaccine?",
        //     options: answers_mapped["covid-vax"],
        //     text2: "Placeholder",
        //     options2: answers_mapped["texas2"],

        // },
        {
            code: "sweets",
            text: "What role do non-sugar sweetners play in weight-loss?",
            options: answers_mapped["sweets"],
            text2: "What is the effect of non-sugar sweetners on type 2 diabetes and cardiovascular diseases?",
            options2: answers_mapped["texas2"],

        },
        {
            code: "rsv",
            text: "Is there an RSV vaccine available for my newborn?",
            options: answers_mapped["rsv"],
            text2: "Very premature babies, are at higher risk of severe RSV infection. At what boundry is a very premature defined?",
            options2: answers_mapped["texas2"], 

        },
        
    ] 
    return questions;
}

export default getQuestions;