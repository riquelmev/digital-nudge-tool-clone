import getDemoAnswersMapped from './demographic_answers_mapped.js';

const getDemographicQuestions = () => {
    const demo_answers_mapped = getDemoAnswersMapped();

    // console.log(answers_mapped)

    const demo_questions = [
        {
            code: "ethnicity",
            text: "What is your ethnicity?",
            options: demo_answers_mapped["ethnicity"]
        },
        {
            code: "gender",
            text: "What is your gender?",
            options: demo_answers_mapped["gender"]
        },
        {
            code: "kids",
            text: "How many kids do you have?",
            options: demo_answers_mapped["kids"]

        },
        {
            code: "tech",
            text: "What do you think of the following statement: AI and Tech have made society better",
            options: demo_answers_mapped["tech"]

        },
        {
            code: "hispanic",
            text: "Are you of Hispanic, Latino, or Spanish origin?",
            options: demo_answers_mapped["hispanic"]

        },
        {
            code: "employment",
            text: "Which of the following best describes your current employment status?",
            options: demo_answers_mapped["employment"]

        },
        {
            code: "media",
            text: "What mediums do you normally use for receiving health information? ",
            options: demo_answers_mapped["media"]

        },
        {
            code: "lung",
            text: "Do you know any family or friends that have or have had lung cancer?",
            options: demo_answers_mapped["lung"]

        },
        {
            code: "breast",
            text: "Do you know any family or friends that have or have had breast cancer?",
            options: demo_answers_mapped["breast"]

        },
    ] 
    return demo_questions;
}

export default getDemographicQuestions;