
const getPrompts = () => {

    const QAPrompts = [
        {
            code: "texas",
            prompt: "Tell me about the state of abortion policy in Texas.",
            text: [`As of my last update in September 2021, the legal status of abortion in Texas was subject to change. However, based on the information available up to that point, abortion was legal in Texas under the landmark Supreme Court decision in Roe v. Wade, which established a woman's constitutional right to choose to have an abortion. The Roe v. Wade decision allowed abortions to be performed in the United States up until the point of viability, which is generally considered to be around 24 weeks of pregnancy.`,
        
            `However, it’s important to note that individual states can enact their
            own laws and regulations related to abortion. As of September 2021,
            Texas had implemented several restrictions on abortion access, in-
            cluding mandatory waiting periods, parental consent requirements
            for minors seeking abortion, and limitations on abortion after 20
            weeks of pregnancy.`,
            `It’s crucial to recognize that laws and regulations can change over
            time, and my information might be outdated. For the most current
            and accurate information about the legal status of abortion in Texas,
            I recommend checking with reliable sources such as official government websites, 
            legal experts, or reputable news outlets.`,
           ` If you or someone you know is seeking information about abortion
            access or reproductive healthcare in Texas, it’s essential to consult
            with a healthcare provider or a local organization that specializes in
            reproductive rights to get the most accurate and up-to-date informa-
            tion.`
        
            ]},
        {
            code: "hrt",
            prompt: "Tell me the known effects of Hormone Replacement Therapy on brain health.",
            text: [`As of my last update in September 2021, the association between hormone treatments for menopause 
            and the risk of dementia was still a topic of ongoing research and debate. Hormone replacement 
            therapy (HRT), which involves taking estrogen and often progesterone to manage menopausal symptoms, 
            has been studied for its potential effects on cognitive health.`,

            `Early observational studies suggested that HRT might have a protective effect against dementia, 
            particularly Alzheimer’s disease. However, subsequent research has produced conflicting results, 
            and the relationship between HRT and dementia risk remains complex and not fully understood. `,
        
            `Some studies have reported an increased risk of dementia in women
            who used HRT, especially in older age groups and those starting hor
            mone treatment later in life. Other studies have not found a significant association between HRT and dementia risk. Additionally, the
            specific formulation of hormones, dosage, and duration of treatment
            may play a role in determining the potential risks.`,
            `Given the complexity of this issue and the evolving nature of medical
            research, it’s essential to consult with a healthcare professional before
            making decisions about hormone treatments or any medical interven-
            tions. If you are experiencing menopausal symptoms and considering
            hormone therapy, your healthcare provider can help you weigh the
            potential benefits and risks based on your individual health history
            and needs`,
            `As my information is not current beyond September 2021, I recommend checking with up-to-date medical sources or consulting a
            healthcare professional to get the latest information on this topic.
            Ongoing research and advancements in medical knowledge may have
            produced new findings or insights since my last update.`
        ]},

        {
            code: "breastfeed",
            prompt: "How long should I breastfeed my child for?",
            text: [
                `The decision of how long to breastfeed your child is a personal one,
                and it depends on various factors such as your child’s needs, your
                preferences, and cultural norms. The World Health Organization
                (WHO) recommends exclusive breastfeeding for the first six months
                of a baby’s life, and then continuing breastfeeding alongside the in-
                troduction of complementary foods for up to two years or beyond.`,
                `Breast milk provides numerous health benefits for infants, including
                essential nutrients, antibodies that help fight infections, and a re-
                duced risk of certain illnesses. Continuing to breastfeed beyond one
                year can also provide emotional comfort and bonding for both the
                child and the mother.`,
                `However, breastfeeding until age 3 is less common and may not align
                with societal norms in some cultures. Ultimately, the decision should
                be based on what feels right for you and your child. It’s important
                to consider factors such as your child’s nutritional needs, your com-
                fort level, and any practical considerations or challenges you may
                encounter.`,
                `Discussing your intentions and concerns with a healthcare profes-
                sional, such as a pediatrician or lactation consultant, can provide
                you with additional guidance and support to make an informed de-
                cision that best meets the needs of both you and your child.`
            ]},
        {
        code: "mammogram",
        prompt: "My mother is now turning 75. What schedule should we follow for mammogram screenings for her?",
        text: [
            `The recommended guidelines for mammogram screenings may vary
slightly depending on the specific recommendations from medical or-
ganizations and individual risk factors. For women aged 75 and older,
there is no definitive cutoff age for mammogram screenings. However,
the decision to continue mammograms at this age is typically based
on an individual’s health status, life expectancy, and personal pref-
erences.`,
`Some medical organizations, such as the American Cancer Society,
recommend that women who are in good health and have a life ex-
pectancy of 10 years or more should continue regular mammogram
screenings. The frequency of screenings can vary, with recommenda-
tions ranging from every one to two years.`,
`It’s important to discuss your individual circumstances with your
healthcare provider. They can evaluate your health status, assess
your medical history, and consider your personal preferences to pro-
vide personalized recommendations. They can help you make an
informed decision about when to schedule your next mammogram
based on your unique situation.`
        ]},

    {
        code: "asthma",
        prompt: "My child has asthma, can they get the nasal flu spray?",
        text: [
            `No, children with asthma should not receive the nasal spray flu vac-
            cine (FluMist). The nasal spray flu vaccine is a live attenuated vac-
            cine, which means it contains weakened but live flu viruses. It is not
            recommended for individuals with certain underlying health condi-
            tions, including asthma.`,
            `Children with asthma are typically advised to receive the flu vaccine
            in the form of an injectable flu shot. The flu shot is made with
            inactivated (killed) flu viruses and is considered safe and effective for
            individuals with asthma.`,
            `It’s crucial to discuss your child’s specific situation with their health-
            care provider. They can provide personalized recommendations and
            guidance based on your child’s asthma management and any other
            relevant health considerations. The healthcare provider will deter-
            mine the most appropriate and safe vaccination option for your child,
            ensuring they receive the necessary protection against the flu while
            considering their asthma condition.`
        ]},

        {
        code: "carseat",
        prompt: "When should my child switch to a front-facing seat?",
        text: [
            `The decision to switch to a front-facing car seat for your child depends on their 
            height and weight rather than a specific age. Here are the general steps to consider:`,

            `1. **Check Manufacturer Guidelines:** Refer to your car seat's manufacturer guidelines. 
            They will provide specific recommendations for when to switch based on your child's
             height and weight.`,
            
            `2. **Height and Weight Requirements:** Most car seats have height and weight limits for 
            rear-facing use. Your child should continue using a rear-facing seat until they meet 
            the height or weight requirement set by the manufacturer.`,
            
            `3. **Consult Pediatrician:** Discuss with your child's pediatrician about their 
            readiness to transition. They can provide guidance based on your child's developmental 
            stage and physical characteristics.`,
            
            `4. **Consider Spinal Development:** Even as your child gets older,
             their spine is still developing and may not be strong enough 
             to handle the impact in a forward-facing seat. Consider the safety benefits of 
             rear-facing as long as possible.`,
            
            `5. **Individual Variation:** Each child's growth trajectory is unique. 
            Avoid comparing your child's timeline to others, as it's crucial to ensure 
            they are ready both physically and developmentally.`,
            
            `6. **Don't Rush:** While it's exciting to see your child grow, 
            prioritize their safety. Delay the transition until they have outgrown the rear-facing limits.`,
            
            `7. **Bittersweet Milestone:** Moving to a front-facing seat marks a transition 
            in your child's development. While it's a milestone, it also signifies the 
            end of a chapter in their early years.`,
            
            `Remember, the primary concern is your child's safety. Follow the manufacturer's 
            guidelines and consult professionals as needed to make an informed decision about
             when to switch to a front-facing car seat.`
        ]},
    
        {
            code: "formula",
            prompt: "Should I be feeding my toddler toddler milk?",
            text: [
            `The decision of whether to feed your toddler toddler milk, 
            which is typically a term used for milk designed for children aged 1 to 3 years, depends on several
             factors. Here are some things to consider:`,

            `Age: Most pediatricians recommend transitioning from breast milk or infant formula 
            to whole cow's milk when your child turns one year old. This provides
             essential nutrients like calcium and vitamin D.`,
            
            `Dietary Needs: Discuss your child's dietary needs and any special considerations
             with their pediatrician. Some children may have specific dietary requirements or 
             allergies that affect the choice of milk.`,
            
            `Nutritional Content: Toddler milk is specifically formulated to meet the 
            nutritional needs of children aged 1 to 3. It may have added nutrients like 
            iron, DHA, and vitamin D, which can be beneficial. However, it's important to 
            read labels and choose a product that is age-appropriate and meets your child's 
            nutritional requirements.`,
            
            `Alternatives: If your child is allergic to cow's milk or you have 
            dietary preferences, there are alternatives such as fortified soy milk, 
            almond milk, or oat milk. Ensure that any milk alternative you choose is fortified 
            with calcium and vitamin D.`,
            
            `Quantity: Pay attention to the recommended daily serving size and
             avoid overfeeding your toddler with milk, as it can displace other
              important foods in their diet.`,
            
            `Consultation with a Pediatrician: It's always a good idea to discuss your 
            child's specific nutritional needs and any concerns with their pediatrician.
             They can provide personalized guidance based on your child's growth and development.`,
            
            `In summary, whether or not to feed your toddler toddler milk is a decision that
             should be made in consultation with your child's healthcare provider. The 
             choice should take into account your child's age, dietary needs, and any 
             specific nutritional requirements they may have. `
        ]}
    ] 
    return QAPrompts;
}

export default getPrompts;