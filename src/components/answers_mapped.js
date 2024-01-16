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
                { id: 0, text: "Slightly increase risk of cancer",},
                { id: 1, text: "Slightly decrease risk of cancer,"},
                { id: 2, text: "No effect", },
                { id: 3, text: "Unsure", }
                    ],
            "asthma": [
                { id: 0, text: "No, they cannot due to the fact they have athsma",},
                { id: 1, text: "Yes, there is no precuation necessary",},
                { id: 2, text: "Yes, but only in a supervised setting such as a hospital or clinic."},
                { id: 3, text: "Yes, but only if they are over the age of four and have not any history of wheezing in the past year.",},
                { id: 4, text: "No, children should not recieve a flu nasal spray ever",},
                { id: 5, text: "Unsure", }
                    ],
            
            "formula": [
                { id: 0, text: "After one year of age"},
                { id: 1, text: "Around one year of age if your child is smaller than expected"},
                { id: 2, text: "One your child begins to teeth, between 1-3 years of age"},
                { id: 3, text: "Never, it is not recommeded by the CDC", },
                { id: 4, text: "Unsure", }
                    ],
            "lung": [
                { id: 0, text: "Anyone aged 50 - 80."},
                { id: 1, text: "Anyone who's smoked at least 20 pack-years of cigarettes and are between 50 -80 years of age."},
                { id: 2, text: "People aged 50-80, who've smoked 20 pack-years, and are either currently smoking or have quit in the past 15 years"},
                { id: 3, text: "People aged 50-80, who have smoked 20 pack-years, regardless of when they quit." },
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
                { id: 0, text: "There is no routinely recommended RSV vaccine for infants."},
                { id: 1, text: "There is an emergency use RSV immunoprophylaxis for babies deemed at risk"},
                { id: 2, text: "There is an RSV vaccine recommended for all babies under 8 months "},
                { id: 3, text: "Maternal vaccination before birth"},
                { id: 4, text: "Unsure", },
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
                { id: 3, text: "Non-sugar sweetners do not confer any long-term benefit in reducing body fat in adults or children"},
                    ],
            "texas2": [
                { id: 0, text: "Immigration",},
                { id: 1, text: "Abortion",},
                { id: 2, text: "Cancer"},
                { id: 3, text: "Contraceptives",},
                { id: 4, text: "Unsure", }
                    ],  
            "hrt2": [
                { id: 0, text: "No effect",},
                { id: 1, text: "Slightly increase risk of cancer",},
                { id: 2, text: "Slightly decrease risk of cancer "},
                { id: 3, text: "No effect", },
                { id: 4, text: "Unsure", }
                    ],
            "asthma2": [
                { id: 0, text: "Activated flu viruses",},
                { id: 1, text: "Inactivated flu viruses",},
                { id: 2, text: "A mixture of active and inactive flu viruses"},
                { id: 3, text: "Unsure",},
                    ],

            
            "formula2": [
                { id: 0, text: "Includes all nutrients needed for toddler development past the age of 12 months."},
                { id: 1, text: "Contains no nutrital advantage over a well-balanced diet that includes human milk and/or cow milk"},
                { id: 2, text: "Contains certain nutrients needed for a well-balanced diet for toddler under 12 months and should be introduced in combination with regular breastfeeding."},
                { id: 3, text: "Unsure", }
                    ],
            "lung2": [
                { id: 0, text: "Yes, every year."},
                { id: 1, text: "Yes, every few years"},
                { id: 2, text: "No, they should wait until 25 years since quitting to begin "},
                { id: 3, text: "No, they should not get screened because they don't meet all criteria"},
                { id: 4, text: "Unsure", }
                    ],
            "likert2": [
                { id: 0, text: "Very Trustworthy"},
                { id: 1, text: "Somewhat Trustworthy"},
                { id: 2, text: "Unsure"},
                { id: 3, text: "Somewhat Untrustworthy", },
                { id: 4, text: "Not Trustworthy", }
                    ],
            "rsv2": [
                { id: 0, text: "27 weeks"},
                { id: 1, text: "28 weeks"},
                { id: 2, text: "29 weeks"},
                { id: 3, text: "30 weeks", },
                { id: 4, text: "31 weeks", },
                { id: 5, text: "Unsure", },

                    ],
            "covid-vax2": [
                { id: 0, text: "6 Months"},
                { id: 1, text: "12 Months"},
                { id: 2, text: "5 years"},
                { id: 3, text: "10 years", },
                { id: 4, text: "12 years", },
                { id: 5, text: "Unsure", }
                    ],
            "sweets2": [
                { id: 0, text: "Sugar in food"},
                { id: 1, text: "Non sugar sweetners for weight loss"},
                { id: 2, text: "Weight loss techniques"},
                { id: 3, text: "Healthy diets", },
                { id: 4, text: "Cardiovascular diseases", },

                    ],
            "outside": [
                { id: 0, text: "Relied entirely on outside knowledge to answer"},
                { id: 1, text: "Relied mostly on outside knowledge to answer"},
                { id: 2, text: "Relied on outside knowledge and the AI conversation equally to answer"},
                { id: 3, text: "Relied mostly on the AI conversation to answer", },
                { id: 4, text: "Relied entirely on the AI conversation to answer", }
                    ],
            "cosleep": [
                { id: 0, text: "Generally yes"},
                { id: 1, text: "No, it is not safe"},
                { id: 2, text: "Yes, but only with a firm mattress"},
                { id: 3, text: "Yes, but only with close adult supervision", },
                { id: 4, text: "Unsure", }

                    ],
            "cosleep2": [
                { id: 0, text: "Ideally 3 months"},
                { id: 1, text: "Ideally 6 months"},
                { id: 2, text: "Ideally 12 months"},
                { id: 3, text: "Ideally 18 months", },
                { id: 4, text: "Unsure", }
                    ],
                
            }

    return answers_mapped
}

export default getAnswersMapped;