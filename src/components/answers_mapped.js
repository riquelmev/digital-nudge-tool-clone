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
                { id: 0, text: "No effect",},
                { id: 1, text: "Slightly increase risk of  cancer",},
                { id: 2, text: "Greatly increase risk of cancer"},
                { id: 3, text: "Slightly decrease risk of cancer,"},
                { id: 4, text: "NGreatly decrease risk of cancer",},
                { id: 5, text: "Unsure", }
                    ],
            "asthma": [
                { id: 0, text: "No, they cannot due to the fact they have Athsma",},
                { id: 1, text: "Yes, there is no issue",},
                { id: 2, text: "Yes, but only in a supervised setting like hospital or clinic."},
                { id: 3, text: "Yes, but only if they are over the age of four and have not any history of wheezing in the past year.",},
                { id: 4, text: "No, the children should not recieve that nasal spray ever.",},
                { id: 5, text: "Unsure", }
                    ],
            
            "formula": [
                { id: 0, text: "After one year of age"},
                { id: 1, text: "If your child is smaller than expect by year one of age"},
                { id: 2, text: "One your child begins to teeth, between 1-3 years of age"},
                { id: 3, text: "Never", },
                { id: 4, text: "Unsure", }
                    ],
            "lung": [
                { id: 0, text: "Anyone aged 50 - 80."},
                { id: 1, text: "Anyone who's smoked at least 20 pack years of cigarettes and are between 50 -80 years of age."},
                { id: 2, text: "People aged 50-80, who've smoked 20 pack years, and are either currently smoking or have quit in the past 15 years"},
                { id: 3, text: "People aged 50-80, who have smoked 20 pack years, regardless of when they quit." },
                { id: 4, text: "Unsure", }
                    ],
            "likert": [
                { id: 0, text: "Very Trustworthy"},
                { id: 1, text: "Somewhat Trustworthy"},
                { id: 2, text: "Unsure"},
                { id: 3, text: "Somewhat Untrustworthy", },
                { id: 4, text: "Not Trustworthy", }
                    ],
            "rsv": [
                { id: 0, text: "There is no routeinly recommended RSV vaccine for infants."},
                { id: 1, text: "There is an emergancy use RSV immunoprophylaxis for babies deemed at risk"},
                { id: 2, text: "There is an RSV vaccine recommended for all babies under 8 months "},
                { id: 3, text: "Unsure", },
                    ],
            "covid-vax": [
                { id: 0, text: "6 Months"},
                { id: 1, text: "12 Months"},
                { id: 2, text: "5 years"},
                { id: 3, text: "10 years", },
                { id: 4, text: "12 years", },
                { id: 5, text: "Unsure", }
                    ],
            "sweets": [
                { id: 0, text: "Non-sugar sweetners help achieve weight-loss since it replaces sugar, which has more calories"},
                { id: 1, text: "Non-sugar sweetners help achieve weight-loss since they reduce cravings for sugar."},
                { id: 2, text: "Unsure"},
                { id: 3, text: "Non-sugar sweetners should not be used for weight-loss", },
                    ],
            }
    return answers_mapped
}

export default getAnswersMapped;