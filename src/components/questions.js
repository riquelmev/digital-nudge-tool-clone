import getAnswers from './answers.js'
import getAnswersMapped from './answers_mapped.js';

const getQuestions = () => {
    const answers = getAnswers();
    const answers_mapped = getAnswersMapped();

    // console.log(answers_mapped)

    const questions = [
        {
            code: "texas",
            text: "What is the latest week that it is legal to get an abortion in Texas?",
            options: answers_mapped["texas"],
            text2: "What is this passage about?",
            options2: answers_mapped["texas2"],
        },
        {
            code: "hrt",
            text: "How does combined HRT affect your chance of developing breast cancer?",
            options: answers_mapped["hrt"],
            text2: "How does estrogen only HRT affect your chance of developing breast cancer?",
            options2: answers_mapped["hrt2"],
        },
        {
            code: "asthma",
            text: "Can a child with asthsma get the nasal vaccine?",
            options: answers_mapped["asthma"],
            text2: "The nasal flu vaccine differs from an injectable flu vaccine in what way?",
            options2: answers_mapped["asthma2"],

        },
        {
            code: "formula",
            text: "When should parents start giving their child toddler milk to ensure a balanced diet?",
            options: answers_mapped["formula"],
            text2: "What nutritional benefit does toddler milk contain? ",
            options2: answers_mapped["formula2"],

        },
        {
            code: "lung",
            text: "Who should get screened for lung cancer annually? ",
            options: answers_mapped["lung"],
            text2: "Should smokers who quit 20 years ago get screened for lung cancer?",
            options2: answers_mapped["lung2"],

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
            text2: "What is the effect of non-sugar sweetners on type 2 diabetes and cardiovascular diseases??",
            options2: answers_mapped["sweets2"],

        },
        {
            code: "rsv",
            text: "Is there an RSV vaccine available for a newborn?",
            options: answers_mapped["rsv"],
            text2: "Very premature babies, are at higher risk of severe RSV infection. At what boundry is a very premature defined?",
            options2: answers_mapped["rsv2"], 

        },

        {
            code: "cosleep",
            text: "At what age can I sleep with my baby in the same bed?",
            options: answers_mapped["cosleep"],
            text2: "How long should babies sleep in the same room as parents?",
            options2: answers_mapped["cosleep2"], 

        },
        
    ] 
    return questions;
}

export default getQuestions;