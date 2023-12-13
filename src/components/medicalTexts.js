
const getPrompts = () => {

    const QAPrompts = [
        {
            code: "texas",
            prompt: "Tell me about the state of abortion policy in Texas.",
            text: [
                
            `According to the Texas Tribune, Texas is currently the largest state in the US to ban nearly all abortions[1]. 
            It is illegal to perform an abortion in Texas, including by dispensing or mailing the abortion-inducing 
            medications mifepristone and misoprostol, in most circumstances. Texas’ laws have narrow exceptions 
            only to save the life or prevent “substantial impairment of major bodily function” of a pregnant patient[1].`, 

            `However, some Texans have found ways to get abortions by traveling to other states or Mexico, or self-managing 
            abortions at home by getting medications through international nonprofits, such as Aid Access, or online stores [1]`, 

            `Please note that this information is current as of October 11, 2023, and may be subject to change.
            If you have any further questions or concerns, I recommend consulting with a medical professional or legal expert.`

            ]},
        {
            code: "hrt",
            prompt: "Do hormone treatments for menopause cause breast cancer?",
            text: [
                `The relationship between hormone replacement therapy (HRT) and the risk of breast cancer in menopausal
                 women has been a topic of extensive research and discussion. The findings have evolved over time, 
                 and the association appears to depend on various factors, including the type of hormones used, 
                 the duration of use, and individual health considerations.`,

                `The Women's Health Initiative (WHI) study, one of the largest clinical trials on HRT,
                 found that women taking a combination of estrogen and progestin had an increased 
                 risk of breast cancer compared to those not taking HRT. However, this increased risk was
                  primarily observed in women using the combined form of HRT, not estrogen alone. The risk also
                   seemed to be higher in women who had been using HRT for an extended period.`,
                
                `Estrogen-only therapy, particularly when started close to the onset of menopause, 
                did not show a significant increase in breast cancer risk in the WHI study and some 
                subsequent research. In fact, in some cases, estrogen-only HRT was associated with a lower 
                risk of breast cancer.`,    
                
                `It's crucial to note that individual health factors and medical history play a significant role in determining 
                the appropriateness of hormone therapy. Before starting any hormone treatment, women should have a thorough
                 discussion with their healthcare providers to assess the potential risks and benefits based on their
                  specific circumstances.`,
                
                `Regular breast cancer screenings, such as mammograms and clinical breast exams, are important for
                 women on HRT to detect any potential issues early. Additionally, lifestyle factors such as maintaining 
                 a healthy weight, regular exercise, and avoiding smoking and excessive alcohol intake can also influence
                  breast cancer risk.`,
                
                `As research in this area is ongoing, it's essential to stay informed about the latest findings and consult
                 with healthcare professionals for personalized advice based on the most current evidence. have
                produced new findings or insights since my last update. `,

        ]},        
    {
        code: "asthma",
        prompt: "My child has asthma, can they get the nasal flu spray?",
        text: [
            `No, children with asthma should not receive the nasal spray flu vaccine (FluMist). 
            The nasal spray flu vaccine is a live attenuated vaccine, 
            which means it contains weakened but live flu viruses. It is not
            recommended for individuals with certain underlying health conditions, including asthma.`,
            `Children with asthma are typically advised to receive the flu vaccine
            in the form of an injectable flu shot. The flu shot is made with
            inactivated (killed) flu viruses and is considered safe and effective for
            individuals with asthma.`,
            `It's crucial to discuss your child's specific situation with their healthcare provider. 
            They can provide personalized recommendations and
            guidance based on your child's asthma management and any other
            relevant health considerations. The healthcare provider will determine 
            the most appropriate and safe vaccination option for your child,
            ensuring they receive the necessary protection against the flu while
            considering their asthma condition.`,

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


        ]},

        {
            code: "lung",
            prompt: "How often should I get screened for lung cancer?",
            text: [

                `The frequency of lung cancer screening depends on your risk factors and age. The most common method 
                of lung cancer screening is a low-dose computed tomography (LDCT) scan. The United States Preventive 
                Services Task Force (USPSTF) recommends annual lung cancer screening with LDCT for individuals who 
                meet the following criteria:`,

                `1. **Age**: 50 to 80 years old`,
                
                `2. **Smoking History**: A significant smoking history, which is defined as a history of smoking an
                 average of one pack of cigarettes per day for 20 years or more, or the equivalent (e.g., 
                    two packs a day for 10 years)`,
                
                `3. **Current Smokers or Recent Quitters**: Current smokers or those who quit within the past 15 years`,
                
                `If you fall within these criteria, it is recommended to discuss lung cancer screening with your
                 healthcare provider. They can help assess your individual risk factors and determine whether 
                 annual screening is appropriate for you.`,
                
                `It's important to note that lung cancer screening is not recommended for
                 individuals who do not meet these specific criteria, as the potential risks of screening, such as false 
                 positives and unnecessary procedures, may outweigh the benefits. Always consult with your 
                 healthcare provider to discuss your personal risk factors and the appropriate screening schedule for your situation.`,
                
        ]},

        {
            code: "covid-vax",
            prompt: "Can a 6-month old child get a covid vaccine?",
            text: [
                
                `As of my last knowledge update in January 2022, COVID-19 vaccines were not authorized for
                 children as young as 6 months old. At that time, COVID-19 vaccines were typically authorized
                  for emergency use or approved for individuals aged 12 and older, with some vaccines having 
                  emergency use authorization for those as young as 5 years old, depending on the country and the
                   vaccine in question.`,

                `However, please note that guidelines and recommendations regarding COVID-19 vaccines 
                can change over time as more research is conducted and additional data becomes available.
                 It's crucial to consult with your healthcare provider and stay up to date with guidance from 
                 public health authorities, such as the Centers for Disease Control and Prevention (CDC) in the 
                 United States, or the relevant health agencies in your country, to learn about the most current 
                 recommendations for COVID-19 vaccination, especially for children.`,
                
                `Since information and recommendations regarding COVID-19 are subject to change, 
                it's important to rely on the latest guidance from authoritative sources to make informed 
                decisions about vaccinations for children.`,
            ]},

        {
            code: "sweets",
            prompt: "Do non-sugar sweeteners help with long term weight loss?",
            text: [
                
                `Non-sugar sweeteners, often referred to as artificial sweeteners or sugar substitutes, can be useful
                 tools in a weight loss or weight management plan for some people, but their effectiveness in
                  achieving long-term weight loss depends on various factors.`,

                `Here are some considerations:`,
                
                `1. Reducing Caloric Intake: Non-sugar sweeteners are typically lower in
                 calories than sugar, which can be advantageous when trying to 
                 reduce overall calorie intake. Replacing sugar with artificial
                  sweeteners in beverages and foods can help people lower their 
                  calorie consumption, which is essential for weight loss.`,
                
                `2. Reducing Sugar Intake: Sugar substitutes can be beneficial for people who are looking 
                to cut down on sugar consumption, which can be an effective strategy for weight 
                loss, as high sugar intake is linked to weight gain and various health issues.`,
                
                `3. Satiety and Cravings: Some research suggests that artificial sweeteners may not 
                provide the same level of satiety as real sugar, which could lead to increased cravings
                 for sweet foods. It's important to be mindful of portion control and overall dietary choices.`,
                
                `4. Individual Variability: People's responses to non-sugar sweeteners can vary.
                 Some individuals may find that artificial sweeteners help them manage their 
                 weight and sugar intake effectively, while others may experience cravings or other adverse effects.`,
                
                `5. Balanced Diet: While sugar substitutes can be part of a weight management strategy, 
                it's important to focus on overall dietary quality. Weight loss and
                 maintenance are more successful when combined with a balanced diet that includes 
                 a variety of nutrient-rich foods.`,
                
                `6. Psychological Factors: The perception of sweetness without calories can lead some people 
                to consume more calories from other sources, potentially negating the benefits of using artificial sweeteners.`,
                
                `7. Research and Long-Term Studies: Long-term studies on the impact of non-sugar
                 sweeteners on weight loss and maintenance are limited, and more research is needed to
                  determine their effects over extended periods.`,
                
                `In summary, non-sugar sweeteners can be a helpful tool for reducing calorie 
                and sugar intake in the short term, which can contribute to weight loss.
                 However, the long-term effectiveness of artificial sweeteners in maintaining 
                 weight loss varies from person to person and may depend on various factors,
                  including individual preferences, dietary habits, and psychological factors. 
                  It's important to use these sweeteners as part of a balanced, healthy eating plan 
                  and to consult with a healthcare professional or registered dietitian for personalized guidance on weight management.`

            ]},

            {
                code: "rsv",
                prompt: "Is there an RSV vaccine available for my newborn?",
                text: [

                `Respiratory syncytial virus (RSV) is a common respiratory virus that 
                can cause severe respiratory tract infections, particularly in infants 
                and young children. There is no routine RSV vaccine available for all newborns or infants at this time.`,

                `However, there is a specific RSV immunization strategy known as "RSV immunoprophylaxis" that may 
                be recommended for certain high-risk infants. This strategy typically involves the use of a monoclonal
                 antibody medication called palivizumab (brand name Synagis) to provide passive immunity to at-risk 
                 infants during the RSV season.`,
                    
                `High-risk infants who might be candidates for RSV immunoprophylaxis include:`,
                    
                `1. Premature infants:** Infants born very prematurely, typically before 29 weeks of gestation, 
                are at higher risk of severe RSV infection.`,
                    
                `2. Infants with certain medical conditions: Some medical conditions, such as chronic lung disease,
                 congenital heart disease, or certain immunodeficiencies, can increase the risk of severe RSV infection.`,
                    
                `The decision to use RSV immunoprophylaxis is typically made on a case-by-case basis,
                 taking into consideration the infant's specific risk factors and health status.
                  If you have concerns about RSV and your newborn, it's essential to discuss 
                  this with your pediatrician or healthcare provider. They can evaluate your baby's 
                  individual risk and provide guidance on the need for RSV immunoprophylaxis if it is
                   deemed appropriate based on your baby's specific circumstances.`,
    
                ]},
    ] 
    return QAPrompts;
}

export default getPrompts;