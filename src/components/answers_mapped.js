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

            "asthma": [
                { id: 0, text: "No, they cannot due to the fact they have Athsma",},
                { id: 1, text: "Yes, there is no issue",},
                { id: 2, text: "Yes, but only in a supervised setting like hospital or clinic."},
                { id: 3, text: "Yes, but only if they are over the age of four and have not any history of wheezing in the past year.",},
                { id: 4, text: "No, the children should not recieve that nasal spray ever.",},
                { id: 5, text: "Unsure", }
                    ],
            "probiotics": [
                { id: 0, text: "Babies should consume probiotics to help reduce mental illness in their child."},
                { id: 1, text: "Parents should not add probiotics, breastmilk and approved formula is sufficiant",},
                { id: 2, text: "Parents should add probiotics to support a healthy immune system"},
                { id: 3, text: "Unsure", }
                    ],
            "carseat": [
                { id: 0, text: "When they no longer comfortably fit in their old seat."},
                { id: 1, text: "When they are over the age of 4,"},
                { id: 2, text: "When they outgrow their current seat's maximum height and weight"},
                { id: 3, text: "Anytime between the ages of 2 - 4", },
                { id: 4, text: "Unsure", }
                    ],
            "formula": [
                { id: 0, text: "After one year of age"},
                { id: 1, text: "If your child is smaller than expect by year one of age"},
                { id: 2, text: "One your child begins to teeth, between 1-3 years of age"},
                { id: 3, text: "Never", },
                { id: 4, text: "Unsure", }
                    ],
            }
    return answers_mapped
}

export default getAnswersMapped;