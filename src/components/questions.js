import getAnswers from './answers.js'
import getAnswersMapped from './answers_mapped.js';

const getQuestions = () => {
    const answers = getAnswers();
    const answers_mapped = getAnswersMapped();

    // console.log(answers_mapped)

    const questions = [
        {
            code: "texas",
            text: "What is the latest week that it is legal to get an abortion in South Carolina?",
            options: answers_mapped["texas"],
            text2: "What is this passage about?",
            options2: answers_mapped["texas2"],
        },
        {
            code: "hrt",
            text: "How does taking combined estrogen and progestin Hormone Replacement Therapy (HRT) affect your chance of developing breast cancer?",
            options: answers_mapped["hrt"],
            text2: "How does estrogen only Hormone Replacement Therapy (HRT) affect your chance of developing breast cancer?",
            options2: answers_mapped["hrt2"],
        },
        {
            code: "asthma",
            text: "Can a child with asthma get the nasal vaccine?",
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
            text: "Which of the following profiles should get screened for lung cancer annually?",
            options: answers_mapped["lung"],
            text2: "Should a 55 year old smoker, who has smoked 30 pack-years, but who quit 20 years ago get screened for lung cancer?",
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
            text2: "What is this passage about?",
            options2: answers_mapped["sweets2"],

        },
        {
            code: "rsv",
            text: "Is there an RSV (Respiratory Syncytial Virus) vaccine available for a newborn?",
            options: answers_mapped["rsv"],
            text2: "Very premature babies, are at higher risk of severe RSV infection. At what boundry is a very premature defined?",
            options2: answers_mapped["rsv2"], 

        },

        {
            code: "cosleep",
            text: "Is it safe to sleep in the same bed as your baby at 6 months?",
            options: answers_mapped["cosleep"],
            text2: "At what age are babies recommended to start sleeping in a different room as parents?",
            options2: answers_mapped["cosleep2"], 

        },

        {
            code: "papsmear",
            text: "How often should a 40 year old get pap-smear and HPV (Human papillomavirus) co-test done?",
            options: answers_mapped["papsmear"],
            text2: "At what age does solo HPV (Human papillomavirus) testing become an option?",
            options2: answers_mapped["papsmear2"], 

        },

        {
            code: "mammogram",
            text: "What is the youngest recommended age that a person could begin mammogram screenings every two years?",
            options: answers_mapped["mammogram"],
            text2: "When might someone stop recieving mammograms?",
            options2: answers_mapped["mammogram2"], 

        },

        {
            code: "IUD",
            text: "Do IUDs (Intrauterine Devices) cause infertility?",
            options: answers_mapped["IUD"],
            text2: "What hormone, found in hormonal IUDs, limits sprerm movement and survival?",
            options2: answers_mapped["IUD2"], 

        },

        {
            code: "breastfeed",
            text: "How long is the recommended time to breastfeed a child for?",
            options: answers_mapped["breastfeed"],
            text2: "At what age is it recommended to introduce complimentary foods?",
            options2: answers_mapped["breastfeed2"], 

        },

        
    ] 
    return questions;
}

export default getQuestions;