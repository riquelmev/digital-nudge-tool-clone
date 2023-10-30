const getAnswersMapped = () => {

    const answers_mapped = 
            {
            "texas": [
              { id: 0, text: "6 Weeks",},
              { id: 1, text: "12 Weeks",},
              { id: 2, text: "16 Weeks"},
              { id: 3, text: "24 Weeks",},
              { id: 4, text: "Unsure", }
                ],
            "hrt": [
                { id: 0, text: "Slightly increase risk of dementia",},
                { id: 1, text: "Greatly increase risk of dementia",},
                { id: 2, text: "Slightly decrease risk of dementia"},
                { id: 3, text: "Greatly decrease risk of dementia",},
                { id: 4, text: "No such effect exists",},
                { id: 5, text: "Unsure", }
                    ],
            "breastfeed": [
                { id: 0, text: "6 months",},
                { id: 1, text: "12 months",},
                { id: 2, text: "18 months"},
                { id: 3, text: "24 months",},
                { id: 4, text: "36 months", }
                    ],
            "mammogram": [
                { id: 0, text: "Every year",},
                { id: 1, text: "Every two years",},
                { id: 2, text: "If expecting to live more than 10 years, every 5 years"},
                { id: 3, text: "There is recommended guidance, please consult your doctor",},
                { id: 4, text: "Unsure", }
                    ],

            "asthsma": [
                { id: 0, text: "Every year",},
                { id: 1, text: "Every two years",},
                { id: 2, text: "If expecting to live more than 10 years, every 5 years"},
                { id: 3, text: "There is recommended guidance, please consult your doctor",},
                { id: 4, text: "Unsure", }
                    ],
            }

//             - No, they cannot due to the fact they have Athsma
// - Yes, there is no issue.
// - Yes, but only in a supervised setting like hospital or clinic.
// - Yes, but only if they are over the age of four and have not any history of wheezing in the past year.
// - No, the children should not recieve that nasal spray ever.
// - Unsure
    return answers_mapped
}

export default getAnswersMapped;