const getDemoAnswersMapped = () => {

    const demo_answers_mapped = 
            {
            "ethnicity": [
              { id: 0, text: "White",},
              { id: 1, text: "Black",},
              { id: 2, text: "Latino"},
              { id: 3, text: "Asian",},
              { id: 4, text: "2 or more races", },
              { id: 5, text: "Other", }
                ],
            "gender": [
                { id: 0, text: "Male",},
                { id: 1, text: "Female",},
                { id: 2, text: "Other"},
                    ],
            "kids": [
                { id: 0, text: "0 kids",},
                { id: 1, text: "1 kid",},
                { id: 2, text: "2 kids"},
                { id: 3, text: "3+ kids",},
                    ],
            "tech": [
                { id: 0, text: "Strongly Agree",},
                { id: 1, text: "Agree",},
                { id: 2, text: "Neither Agree Nor Disagree"},
                { id: 3, text: "Strongly Disagree",},
                { id: 4, text: "Disagree", }
                    ],
            "hispanic": [
                { id: 0, text: "Yes",},
                { id: 1, text: "No",},
                    ],
            "employment": [
                { id: 0, text:  "Employed for wages"},
                { id: 1, text: "Self-employed"},
                { id: 2, text: "Homemaker"},
                { id: 6, text: "Student", },
                { id: 3, text: "Unemployed",},
                { id: 4, text: "Retired", },
                { id: 5, text: "Unable to work", }
                    ],
            "media": [
                { id: 0, text: "Radio",},
                { id: 1, text: "TV",},
                { id: 2, text: "Internet Search: Personal Blogs"},
                { id: 3, text: "Internet Search: Government Websites"},
                { id: 4, text: "Internet Search: Medical Speciality Group Websites"},
                { id: 5, text: "Social Media",},
                { id: 6, text: "TikTok", },
                { id: 7, text: "Other", }
                    ],
            "lung": [
                { id: 0, text: "Yes, self",},
                { id: 1, text: "Yes, family",},
                { id: 2, text: "Yes, friends"},
                { id: 3, text: "No",},
                { id: 4, text: "Other", }
                            ],
            "breast": [
                { id: 0, text: "Yes, self",},
                { id: 1, text: "Yes, family",},
                { id: 2, text: "Yes, friends"},
                { id: 3, text: "No",},
                { id: 4, text: "Other", }
                            ],
            "diet": [
                { id: 0, text: "Strongly Agree",},
                { id: 1, text: "Agree",},
                { id: 2, text: "Neither Agree Nor Disagree"},
                { id: 3, text: "Strongly Disagree",},
                { id: 4, text: "Disagree", }
                    ],  
            }
    return demo_answers_mapped
}

export default getDemoAnswersMapped;