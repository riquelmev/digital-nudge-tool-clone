import getTrialAnswersMapped from "./trail_answers_mapped";

const getTrialQuestions = () => {


    const answers_mapped = getTrialAnswersMapped();

    const questions = [
        {
            code: "trail1",
            prompt: "When should I switch to a front-facing seat for my child?",
            chatGPT_answer: [
                `The decision to switch to a front-facing car seat for your child depends on their 
                height and weight rather than a specific age. Here are the general steps to consider:`,

            `1. **Check Manufacturer Guidelines:** Refer to your car seat's manufacturer guidelines.
             They will provide specific recommendations for when to switch based on your child's height and weight.`,
            
            `2. **Height and Weight Requirements:** Most car seats have height and weight 
            limits for rear-facing use. Your child should continue using a rear-facing seat
             until they meet the height or weight requirement set by the manufacturer.`,
            
            `3. **Consult Pediatrician:** Discuss with your child's pediatrician
             about their readiness to transition. They can provide guidance based on your 
             child's developmental stage and physical characteristics.`,
            
            `4. **Consider Spinal Development:** Even as your child gets older, 
            their spine is still developing and may not be strong enough to handle the 
            impact in a forward-facing seat. Consider the safety benefits of rear-facing as long as possible.`,
            
            `5. **Individual Variation:** Each child's growth trajectory is 
            unique. Avoid comparing your child's timeline to others, as it's crucial
             to ensure they are ready both physically and developmentally.`,
            
            `6. **Don't Rush:** While it's exciting to see your child grow, prioritize their 
            safety. Delay the transition until they have outgrown the rear-facing limits.`,
            
            `7. **Bittersweet Milestone:** Moving to a front-facing seat marks a transition in
             your child's development. While it's a milestone, it also signifies the end of a chapter in their early years.`,
            
            `Remember, the primary concern is your child's safety. Follow the manufacturer's 
            guidelines and consult professionals as needed to make an informed decision about 
            when to switch to a front-facing car seat.`,
        ],
            text: "What is this passage about?",
            options: answers_mapped["trial1"]
        },
        {
            code: "trail2",
            prompt: "Does there exist a Lyme disease vaccine?",
            chatGPT_answer: [

                `LYMErix, a vaccine developed to protect against Lyme disease, became a
                 subject of controversy and concern due to reports of adverse events, 
                 including potential cases of arthritis. Some individuals who received 
                 the vaccine reported joint pain, which led to speculation that the vaccine might be linked to arthritis.`,

                `The vaccine's manufacturer, SmithKline Beecham 
                (now part of GlaxoSmithKline), conducted clinical trials to 
                investigate these reports. The trials did find an increase in 
                reports of joint pain, but the overall risk of developing
                 arthritis was not conclusively linked to the vaccine. The U.S. 
                 Food and Drug Administration (FDA) reviewed the data and determined
                that the benefits of the vaccine outweighed the potential risks.`,

                `Nonetheless, the concerns about the vaccine's side 
                effects led to a decline in its popularity and ultimately
                 led to its withdrawal from the market in 2002. While the 
                 vaccine itself was not definitively proven to cause arthritis,
                  it did raise public concerns and led to its discontinuation.`,

                `It's important to note that as 
                of my last knowledge update in January 2022,
                 there was no Lyme disease vaccine available for humans 
                 in the United States. If there have been any new developments or
                  vaccines introduced since then, it's advisable to consult the most recent 
                  information and guidance from healthcare professionals and regulatory agencies 
                  for up-to-date information on Lyme disease prevention and vaccines.`,

                `There is no specific information available about 
                whether the LYMErix vaccine or any other Lyme disease vaccine 
                causes arthritis in hamsters. The primary focus of vaccine safety studies 
                is on humans, and the research conducted for vaccine approval typically involves 
                human clinical trials and animal studies, primarily focusing on non-human primates 
                and other animals that are more biologically similar to humans.`,

                `As of my last knowledge update in January 2022, there was no widespread information indicating that
                 the LYMErix vaccine or any other Lyme disease vaccine caused arthritis in hamsters.
                  However, research findings and information can evolve over time, so it's essential to 
                  consult the most recent scientific studies or veterinary sources for any updates on this topic
                   if you are concerned about Lyme disease and its impact on hamsters or other animals.`,
            ],
            text: "What was a possible side effect of the LYMErix vaccine? ",
            options: answers_mapped["trial2"]

        }
    ]

    console.log(questions)


        return questions;
    }
    
    export default getTrialQuestions;