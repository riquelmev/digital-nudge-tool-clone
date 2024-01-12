const getTrialAnswersMapped = () => {

    const trial_answers_mapped = 
            {
            "trial1": [
              { id: 0, text: "The flu",},
              { id: 1, text: "RSV",},
              { id: 2, text: "Proper Carseat Usage"},
              { id: 3, text: "Postpartum care",},
              { id: 4, text: "Infertility", },
                ],
            "trial2": [
                { id: 0, text: "The vaccine was pulled due to confirmed studies that proved it caused arteritis ",},
                { id: 1, text: "The vaccine was pulled due to the possilibty of causing arteritis in hamsters",},
                { id: 3, text: "The vaccine was pulled due to negative backlash since confirmed side effects were shown in humans."},
                { id: 2, text: "The vaccine was pulled due to negative backlash from concerns related to possibly causing arteritis in humans"},
                    ],
            }
    return trial_answers_mapped
}

export default getTrialAnswersMapped;