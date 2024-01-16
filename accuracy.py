import json
from collections import Counter 
# Intervention ID
# False or true
# time_step 
# score
# Participant Id

q = {"order":"3,5,4,1,6,7,0,2","rsv":"There is an emergency use RSV immunoprophylaxis for babies deemed at risk","asthma_outside":"Relied mostly on the AI recommendation to answer","sweets_outside":"Relied mostly on outside knowledge to answer","rsv_outside":"Relied on outside knowledge and the AI recommendation equally to answer","id":"345523","hrt_outside":"Relied mostly on outside knowledge to answer","question times":"1705271426068,1705271431017,1705271441402,1705271445350,1705271450301,1705271456334,1705271460917,1705271468817,1705271473651","sweets_likert":"Unsure","ethnicity":"Latino","cosleep":"Yes, but only with close adult supervision","employment":"Unable to work","rsv_likert":"Somewhat Trustworthy","asthma":"Yes, but only in a supervised setting like hospital or clinic.","cosleep_outside":"Relied entirely on the AI recommendation to answer","breast":"Yes, friends","media":"Internet Search: Personal Blogs","asthma_likert":"Somewhat Trustworthy","lung":"People aged 50-80, who've smoked 20 pack-years, and are either currently smoking or have quit in the past 15 years","texas_2":"Abortion","hrt":"Slightly decrease risk of cancer,","sweets":"Non-sugar sweetners help achieve weight-loss since they reduce cravings for sugar.","start_time":"1705271383880","rsv_2":"31 weeks","asthma_2":"A mixture of active and inactive flu viruses","gender":"Other","kids":"2 kids","formula_likert":"Somewhat Trustworthy","texas":"6 Weeks","hispanic":"No","formula_2":"Has no nutritional benefit","leftTab":"false","accepted":"true","cosleep_2":"Ideally 18 months","cosleep_likert":"Unsure","texas_likert":"Somewhat Trustworthy","texas_outside":"Relied entirely on the AI recommendation to answer","formula":"After one year of age","group":"1","sweets_2":"Decreases the risk","lung_outside":"Relied entirely on the AI recommendation to answer","formula_outside":"Relied on outside knowledge and the AI recommendation equally to answer","hrt_likert":"Unsure","tech":"Neither Agree Nor Disagree","hrt_2":"Greatly increase risk of cancer","lung_likert":"Somewhat Trustworthy","lung_2":"No, they should wait until 25 years since quitting to begin "}

default_order = ["texas",]

def parse_ndjson(data):
    return [json.loads(l) for l in data.splitlines()]


with open('pilot_answers_3.json', 'r', encoding="utf8") as handle:
    data = handle.read()
    dicts = parse_ndjson(data)

# print(dicts)

# {"group": 
#     {"answers": 
#         {rsv : {"correct": 4, "incorrect": 2)}
#         {rsv_likert: {"agree": 3, "disagree": 4}}
#         } 
#         }
#          }

# questions_tags_ns = q.keys()
questions_tags_ns = ['rsv', 
'cosleep', 'asthma','breast', 'media', 'asthma_likert', 'lung', 'texas_2', 'hrt',
 'sweets', 'rsv_2', 'asthma_2', 'texas', 'formula_2', 'cosleep_2',
 'formula', 'sweets_2', 'hrt_2', 'lung_2']
# print(questions_tags_ns)

demographic_tags =  ['ethnicity', 'employment', 'media', 'gender', 'kids',
 'hispanic', 'leftTab', 'accepted', 'group', 'tech']

correct_answers = set([
    "6 Weeks", "Slightly increase risk of cancer",
     "Yes, but only if they are over the age of four and have not any history of wheezing in the past year.",
     "Never, it is not recommeded by the CDC",
     "People aged 50-80, who have smoked 20 pack-years, regardless of when they quit.",
     "Maternal vaccination before birth",
     "Non-sugar sweetners do not confer any long-term benefit in reducing body fat in adults or children",
     "Abortion",
     "Slightly decrease risk of cancer ",
     "Inactivated flu viruses",
     "Contains no nutrital advantage over a well-balanced diet that includes human milk and/or cow milk",
     "Yes, every year.",
     "29 weeks",
     "Non sugar sweetners for weight loss",
     "No, it is not safe",
     "Ideally 12 months",
])



def count_results(group_num):
    master_dict = {}

    for tags in questions_tags_ns:
        master_dict[tags] = {"correct" : 0, "incorrect" : 0}

    for d in dicts:
        if d["answers"]["group"] == str(group_num):
            for tag in questions_tags_ns: 
                if d["answers"][tag] in correct_answers:
                    master_dict[tag]["correct"] +=1
                else:
                    master_dict[tag]["incorrect"] +=1
    for key,answers in master_dict.items():
        print(key,answers["correct"],answers["incorrect"])



def first_and_last(group_num):
    count = 0
    first_r = 0
    last_r = 0

    for d in dicts:
        if d["answers"]["group"] == str(group_num):
            count +=1
            order = d["answers"]["order"]

            if d["answers"][default_order[order[0]]] in correct_answers:
                first_r +=1
            if d["answers"][default_order[order[-1]]] in correct_answers:
                last_r +=1
    
    return first_r/count, last_r/count

def plot_percentages(group_num):
    count = [0] * len(questions_tags_ns)
    correct_answers = [0] * len(questions_tags_ns)

    for d in dicts:
        if d["answers"]["group"] == str(group_num):
            count +=1
            order = d["answers"]["order"]

            for i in range(len(questions_tags_ns)):

                # check order is correct
                if d["answers"][default_order[order[i]]] in correct_answers:
                    correct_answers[i] +=1
    
    correct_percentages = correct_answers
    for i in range(len(correct_percentages)):
        correct_percentages[i] = correct_percentages[i]/count[i]
   
    return correct_percentages


def demographics(group_num):

    cnt = Counter()

    for d in dicts:
        if d["answers"]["group"] == str(group_num):
            for tag in demographic_tags: 
                temp = d["answers"][tag] 
                temp = tag + "_" + temp
                cnt[temp] +=1
    print(cnt)

demographics(1)

#Look at confidence
# Which group was most correct
#Which questions have the greatest difference between groups
#What about how pro - tech they were?
# For most wrong ones, how much did they rely on the outside knowledge?
# for most correct ones, how much did they rely on outside knowledge?
#did rates of outside knowledge change depending on interventions?



# count_results(1)


#Just go through keys and make new dict based on group        
    

# def organize power:
