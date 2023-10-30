
const getPrompts = () => {

    const QAPrompts = [
        {
            code: "texas",
            prompt: "Tell me about the state of abortion policy in Texas.",
            text: " As of my last update in September 2021, the legal status of abortion in Texas was subject to change. However, based on the information available up to that point, abortion was legal in Texas under the landmark Supreme Court decision in Roe v. Wade, which established a woman's constitutional right to choose to have an abortion. The Roe v. Wade decision allowed abortions to be performed in the United States up until the point of viability, which is generally considered to be around 24 weeks of pregnancy.",
        },
        {
            code: "hrt",
            prompt: "Tell me the known effects of Hormone Replacement Therapy on brain health.",
            text: ["As of my last update in September 2021, the association between hormone treatments for menopause and the risk of dementia was still a topic of ongoing research and debate. Hormone replacement therapy (HRT), which involves taking estrogen and often progesterone to manage menopausal symptoms, has been studied for its potential effects on cognitive health.",
            "Early observational studies suggested that HRT might have a protective effect against dementia, particularly Alzheimer’s disease. However, subsequent research has produced conflicting results, and the relationship between HRT and dementia risk remains complex and not fully understood. "]
// – Some studies have reported an increased risk of dementia in women
// who used HRT, especially in older age groups and those starting hor-
// mone treatment later in life. Other studies have not found a signifi-
// cant association between HRT and dementia risk. Additionally, the
// specific formulation of hormones, dosage, and duration of treatment
// may play a role in determining the potential risks.
        },
    ] 
    return QAPrompts;
}

export default getPrompts;