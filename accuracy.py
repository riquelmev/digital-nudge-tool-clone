import json
from collections import Counter 
import numpy
import statsmodels.api as sm
import pandas as pd
import numpy as np
import random

# Intervention ID
# False or true
# time_step 
# score
# Participant Id

q = {"order":"3,5,4,1,6,7,0,2","rsv":"There is an emergency use RSV immunoprophylaxis for babies deemed at risk","asthma_outside":"Relied mostly on the AI recommendation to answer","sweets_outside":"Relied mostly on outside knowledge to answer","rsv_outside":"Relied on outside knowledge and the AI recommendation equally to answer","id":"345523","hrt_outside":"Relied mostly on outside knowledge to answer","question times":"1705271426068,1705271431017,1705271441402,1705271445350,1705271450301,1705271456334,1705271460917,1705271468817,1705271473651","sweets_likert":"Unsure","ethnicity":"Latino","cosleep":"Yes, but only with close adult supervision","employment":"Unable to work","rsv_likert":"Somewhat Trustworthy","asthma":"Yes, but only in a supervised setting like hospital or clinic.","cosleep_outside":"Relied entirely on the AI recommendation to answer","breast":"Yes, friends","media":"Internet Search: Personal Blogs","asthma_likert":"Somewhat Trustworthy","lung":"People aged 50-80, who've smoked 20 pack-years, and are either currently smoking or have quit in the past 15 years","texas_2":"Abortion","hrt":"Slightly decrease risk of cancer,","sweets":"Non-sugar sweetners help achieve weight-loss since they reduce cravings for sugar.","start_time":"1705271383880","rsv_2":"31 weeks","asthma_2":"A mixture of active and inactive flu viruses","gender":"Other","kids":"2 kids","formula_likert":"Somewhat Trustworthy","texas":"6 Weeks","hispanic":"No","formula_2":"Has no nutritional benefit","leftTab":"false","accepted":"true","cosleep_2":"Ideally 18 months","cosleep_likert":"Unsure","texas_likert":"Somewhat Trustworthy","texas_outside":"Relied entirely on the AI recommendation to answer","formula":"After one year of age","group":"1","sweets_2":"Decreases the risk","lung_outside":"Relied entirely on the AI recommendation to answer","formula_outside":"Relied on outside knowledge and the AI recommendation equally to answer","hrt_likert":"Unsure","tech":"Neither Agree Nor Disagree","hrt_2":"Greatly increase risk of cancer","lung_likert":"Somewhat Trustworthy","lung_2":"No, they should wait until 25 years since quitting to begin "}

def parse_ndjson(data):
    return [json.loads(l) for l in data.splitlines()]


with open('pilot_answers_marzyeh.json', 'r', encoding="utf8") as handle:
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
# questions_tags_ns = ['rsv', 
# 'cosleep', 'asthma',
#  'texas_2', 'hrt', 'rsv_2', 'asthma_2', 
#  'texas', 'formula_2', 'cosleep_2',
#  'formula',  'hrt_2',
#  "papsmear", "papsmear_2",
#  "mammogram", "mammogram_2",
#  "IUD", "IUD_2", "breastfeed", "breastfeed_2",
#  ]
 
questions_tags_ns = ['rsv', 'cosleep', 
 'texas_2', 'hrt', 'rsv_2', 
 'texas', 'formula_2', 'cosleep_2',
 'formula',  'hrt_2',
 "papsmear", "papsmear_2",
 "mammogram", "mammogram_2",
 "IUD", "IUD_2", "breastfeed", "breastfeed_2",
 "lung","lung_2"
 ]

questions_tags_inital = ['rsv', 'cosleep', 'hrt', 'texas', 'formula',  "papsmear", "mammogram", "IUD", "breastfeed","lung"]
# print(questions_tags_ns)

demographic_tags =  ['ethnicity', 'employment', 'media', 'gender', 'kids',
 'hispanic', 'leftTab', 'accepted', 'group', 'tech']

correct_answers = set([
    "6 Weeks", 
    "Increase the risk of developing breast cancer",
     "Yes, but only if the child with asthma is at least 5 years old.",
     "Never, toddler formulas are not needed to meet nutriontional needs of young children",
     "People aged 50-80, who have smoked 20 pack years, regardless of when they quit. ",
     "There is an RSV vaccine recommended for all babies under 8 months born in RSV season",
     "Maternal vaccination before birth",
     "There is a maternal vaccination that protects infants from RSV once born",
     "Non-sugar sweetners do not confer any long-term benefit in reducing body fat in adults or children",
     "Abortion",
     "Increase the risk of cancer",
     #Add check to count for breast cancer risk
     "The nasal flu vaccine contains activated flu viruses",
     "Toddler formula does not provide a nutritional advantage over a well-balanced diet that includes cows milk",
     "Yes, every year.",
     "Pneumonia",
    #  "Non sugar sweetners for weight loss",
     "No, it is not safe",
     "Ideally 12 months",
     "Every five years",
     "21",
     "Progestin",
     "Only breastmilk",
     "6 months",
     "IUDs do not cause long term infertility",
     "Age 75",
     "Age 85",
     "40",
])

misinfo_text_codes = set(
    [
        "texas", 
        "formula",
        "rsv",
        "texas_2", 
        "rsv_2",
        "formula_2"
        "cosleep_2",
        "cosleep",
        "lung",
        "lung_2"
    ]
)

default_order = [
    "texas",
    "hrt",
    "formula",
    "lung",
    "rsv",
    "cosleep",
    "papsmear",
    "mammogram",
    "IUD",
    "breastfeed",
] 




def count_percentages_overall():

    master = count_all()
    
    final = {
        1: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        2: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        3: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        4: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        5: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
    }

    for group in master:
        for element in group:
            # print(element)
            final[element[0]]["correct"] += element[2]["correct"]
            final[element[0]]["Unsure"] += element[2]["Unsure"]
            final[element[0]]["incorrect"] += element[2]["incorrect"]

    for key,value in final.items():
        total = value["correct"] + value["Unsure"] + value["incorrect"]
        print(key, "correct ",  (value["correct"]/total) , "unsure" , (value["Unsure"] /total) , "incorrect" , (value["incorrect"] /total))

def calc_std(master):
    
    
    for group in master:
        print(numpy.mean(group),numpy.std(group))


def calc_std_by_text_type():

    _, master = count_results_by_individual()

    mean_truth = [[],[],[],[],[]]
    mean_misinfo = [[],[],[],[],[]]


    for i, element in enumerate(master):
        # print(element)
        # print(group_num,key,answers)
        for d in element:
            mean_truth[i].append(d["trueinfo_correct"] / (d["trueinfo_correct"] + d["trueinfo_incorrect"]))
            mean_misinfo[i].append(d["misinfo_correct"] / (d["misinfo_correct"] + d["misinfo_incorrect"]))

        
    print("mean_truth")
    for group in mean_truth:
        
        print(numpy.mean(group),numpy.std(group))

    print("mean_misinfo")
    for group in mean_misinfo:
        print(numpy.mean(group),numpy.std(group))


def count_results_by_individual():

    master = []
    master2 = []
    
    for d in dicts:
        holder = {}

        holder = {"correct" : 0, "Unsure" : 0, "incorrect" : 0}
        holder2 = {"misinfo_correct": 0, "misinfo_incorrect": 0, "trueinfo_correct": 0, "trueinfo_incorrect": 0,}
    
        #holder 
        if attention_check(d):
            for tag in questions_tags_ns: 
                if d["answers"][tag] in correct_answers:
                    holder["correct"] +=1

                else:
                    ##unsure counts as correct
                    if d["answers"][tag] == "Unsure":
                        holder["correct"] +=1
                    else:
                        holder["incorrect"] +=1

            master.append([int(d["answers"]["group"]), holder])


        #holder2
        if attention_check(d):
            for tag in questions_tags_ns: 
    
                if d["answers"][tag] in correct_answers:
                    if tag in misinfo_text_codes:
                        holder2["misinfo_correct"] +=1
                    else:
                        holder2["trueinfo_correct"] +=1

                else:
                    ##unsure counts as correct
                    if d["answers"][tag] == "Unsure":
                        if tag in misinfo_text_codes:
                            holder2["misinfo_correct"] +=1
                        else:
                            holder2["trueinfo_correct"] +=1
                    else:
                        if tag in misinfo_text_codes:
                            holder2["misinfo_incorrect"] +=1
                        else:
                            holder2["trueinfo_incorrect"] +=1

            master2.append([int(d["answers"]["group"]), holder2])

    final_list = [[],[],[],[],[]]
    for element in master:
        # print(element)
        # print(group_num,key,answers)
        final_list[element[0]-1].append(element[1]["correct"]/len(questions_tags_ns))

    final_list2 = [[],[],[],[],[]]
    for element in master2:
        # print(element)
        # print(group_num,key,answers)
        final_list2[element[0]-1].append(element[1])
    # for l in final_list:
    #     for e in l:
    #         ne = e / len(questions_tags_ns)

    # print(final_list)
    print(final_list2)
    return final_list, final_list2



def attention_check(d):
    if d["answers"]["texas_2"] == "Abortion":
        return True
    else:
        return False


def count_percentage_by_question():

    master = count_all()

    final = {}
    for question in questions_tags_ns:
        final[question] = {"correct" : 0, "Unsure" : 0, "incorrect" : 0}
    
    
    for group in master:
        for element in group:
            # print(element)
            final[element[1]]["correct"] += element[2]["correct"]
            final[element[1]]["Unsure"] += element[2]["Unsure"]
            final[element[1]]["incorrect"] += element[2]["incorrect"]

    for key,value in final.items():
        total = value["correct"] + value["Unsure"] + value["incorrect"]
        print(key, "correct ",  (value["correct"]/total) , "unsure" , (value["Unsure"] /total) , "incorrect" , (value["incorrect"] /total))


def count_percentage_by_ordering():

    final = {}
    for i in range(11):
        final[i] = {"correct" : 0, "Unsure" : 0, "incorrect" : 0}


    for d in dicts:
        if attention_check(d):
            order = d["answers"]["order"]
            order = order.split(",")
            for i, current in enumerate(order):

                if d["answers"][default_order[int(current)]] in correct_answers:
                    final[i]["correct"] += 1
                elif d["answers"][default_order[int(current)]] == "Unsure":
                    final[i]["Unsure"] += 1
                else:
                    final[i]["incorrect"] += 1

    for key,value in final.items():
        total = value["correct"] + value["Unsure"] + value["incorrect"]
        print(key, "correct ",  (value["correct"]/total) , "unsure" , (value["Unsure"] /total) , "incorrect" , (value["incorrect"] /total))


def count_priming_change():

    final = {}
    for question in questions_tags_inital:
        final[question] = {"correct" : 0, "Unsure" : 0, "incorrect" : 0}
        final[question + "_inital"] = {"correct" : 0, "Unsure" : 0, "incorrect" : 0}
  
    for d in dicts:
  
        if d["answers"]["group"] == str(5) and attention_check(d): 
            for question in questions_tags_inital:
                if d["answers"][question] in correct_answers:
                    final[question]["correct"] += 1
                elif d["answers"][question] == "Unsure":
                    final[question]["Unsure"] += 1
                else:
                    final[question]["incorrect"] += 1
                
                question += "_inital"
                if d["answers"][question] in correct_answers:
                    final[question]["correct"] += 1
                elif d["answers"][question] == "Unsure":
                    final[question]["Unsure"] += 1
                else:
                    final[question]["incorrect"] += 1
    
    for question in questions_tags_inital:
        total = final[question]["correct"] + final[question]["Unsure"] + final[question]["incorrect"]
        total_inital = final[question + "_inital"]["correct"] + final[question + "_inital"]["Unsure"] + final[question + "_inital"]["incorrect"]
        print(question, "correct", (final[question]["correct"]/total), (final[question + "_inital"]["correct"]/total_inital), "unsure" , (final[question]["Unsure"]/total), (final[question + "_inital"]["Unsure"]/total_inital) , "incorrect" , (final[question]["incorrect"]/total), (final[question + "_inital"]["incorrect"]/total_inital))

def count_percentage_by_first_last():
    for i in range(1,6):
        first_list, last_list = first_and_last(i)
        first_final = [num/sum(first_list) for num in first_list]
        last_final = [num/sum(last_list) for num in last_list]

        print(i, first_final, last_final)



def count_all():
    master = []
    for i in range(1,6):
        results = count_results(i)
        master.append(results)
    # print(master)
    return master




def count_results(group_num):
    master_dict = {}

    for tags in questions_tags_ns:
        master_dict[tags] = {"correct" : 0, "Unsure" : 0, "incorrect" : 0}

    for d in dicts:
        if d["answers"]["group"] == str(group_num) and attention_check(d):
            for tag in questions_tags_ns: 
                if d["answers"][tag] in correct_answers:
                    master_dict[tag]["correct"] +=1
                else:
                    if d["answers"][tag] == "Unsure":
                        master_dict[tag]["Unsure"] +=1
                    else:
                        master_dict[tag]["incorrect"] +=1

    final_list = []
    for key,answers in master_dict.items():
        # print(group_num,key,answers)
        final_list.append([group_num, key, answers])
    
    return final_list



def first_and_last(group_num):
    count = 0
    first_r = 0
    last_r = 0
    first_w = 0
    last_w = 0
    first_unsure = 0
    last_unsure = 0


    for d in dicts:
        if d["answers"]["group"] == str(group_num):
            count +=1

            order = d["answers"]["order"]
            first = int(order[0])
            last = int(order[-1])

            if d["answers"][default_order[first]] in correct_answers:
                first_r +=1
            elif d["answers"][default_order[first]] == "Unsure":
                first_unsure +=1
            else:
                first_w +=1

            if d["answers"][default_order[last]] in correct_answers:
                last_r +=1
            elif d["answers"][default_order[last]] == "Unsure":
                last_unsure +=1
            else:
                last_w +=1

    
    return [first_r, first_unsure, first_w],[last_r,last_unsure,last_w]

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

# demographics(1)


def check_misinfo(tag):
    if tag in misinfo_text_codes:
        return True
    else:
        return False


def create_individual_score():


    master_list = []
    for d in dicts:
        if attention_check(d):

            order = d["answers"]["order"]
            order = order.split(",")

    
            for tag in questions_tags_inital:

                if check_misinfo(tag):
                    misinfo = True
                else:
                    misinfo = False 

                question_pos = default_order.index(tag)

                if d["answers"][tag] in correct_answers:
                    new_element = [d["answers"]["group"], misinfo, question_pos , 1, d["user_id"] ]

                elif d["answers"][tag] == "Unsure":
                    new_element = [d["answers"]["group"], misinfo, question_pos , 1, d["user_id"] ]

                else:
                    new_element = [d["answers"]["group"], misinfo, question_pos , 0, d["user_id"] ]

                master_list.append(new_element)
                tag += "_2"
                
                if d["answers"][tag] in correct_answers:
                    
                    new_element = [d["answers"]["group"], misinfo, question_pos , 1, d["user_id"] ]
                elif d["answers"][tag] == "Unsure":
                    new_element = [d["answers"]["group"], misinfo, question_pos , 1, d["user_id"] ]

                else:
                    new_element = [d["answers"]["group"], misinfo, question_pos , 0, d["user_id"] ]

                master_list.append(new_element)


    final_score = {}
    mapping = {}
    for element in master_list:
        if element[4] in final_score:
            final_score[element[4]] += element[3]
        else:
            final_score[element[4]] = element[3]
            mapping[element[4]] = element[0]



    final_list =[]
    for key in final_score.keys():
        score = final_score[key] / 18
        final_list.append([mapping[key],score])


    # print(final_score)
    columns = ['intervention_ID', 'misinfo', 'timestep', 'score', 'participant_ID']



    df = pd.DataFrame(master_list, columns=columns)
    # print(df)
    # print(df.head)


    mean = [0.488,0.722,0.68,0.638,0.694]
    sd = [0.13,0.15,0.07,0.138,0.027]

    holder = []
    participant = None
    for i in range(10):
        new_list = []
        for element in final_list:
        #     if element[4] != participant:
            mu = mean[int(element[0])-1]
            sigma = sd[int(element[0])-1]
            s = np.random.normal(mu, sigma, 1)
        #         # print(s)
            s = s[0]
        #         # print(s)

            new_element = element.copy()
            new_element[1] = s

            print(new_element)
       
            new_list.append(new_element)
        holder.append(new_list)

    for l in holder:
        final_list += l

    print(final_list)
    
    # calc_std(new_list)


def create_csv_table():
    # for tags in questions_tags_ns:
    #     master_dict[tags] = {"correct" : 0, "incorrect" : 0}
    
#     Intervention ID
# Misinfo or not
# time_step 
# score
# Participant Id


    master_list = []
    for d in dicts:
        if attention_check(d):

            order = d["answers"]["order"]
            order = order.split(",")

        
            for tag in questions_tags_inital:

                if check_misinfo(tag):
                    misinfo = True
                else:
                    misinfo = False 

                question_pos = default_order.index(tag)

                if d["answers"][tag] in correct_answers:
                    new_element = [d["answers"]["group"], misinfo, question_pos , 1, d["user_id"] ]

                elif d["answers"][tag] == "Unsure":
                    new_element = [d["answers"]["group"], misinfo, question_pos , 1, d["user_id"] ]

                else:
                    new_element = [d["answers"]["group"], misinfo, question_pos , 0, d["user_id"] ]

                master_list.append(new_element)
                tag += "_2"
                
                if d["answers"][tag] in correct_answers:
                    
                    new_element = [d["answers"]["group"], misinfo, question_pos , 1, d["user_id"] ]
                elif d["answers"][tag] == "Unsure":
                    new_element = [d["answers"]["group"], misinfo, question_pos , 1, d["user_id"] ]

                else:
                    new_element = [d["answers"]["group"], misinfo, question_pos , 0, d["user_id"] ]

                master_list.append(new_element)

    # for elements in master_list:
    # return(master_list)

    columns = ['intervention_ID', 'misinfo', 'timestep', 'score', 'participant_ID']

    mean = [0.488,0.722,0.68,0.638,0.694]
    sd = [0.13,0.15,0.07,0.138,0.027]


    mean_truth = [0.583, 0.805, 0.833, 0.625, 0.833]
    sd_truth = [0.241, 0.141, 0.058, 0.208, 0.1]

    mean_misinfo = [0.3,0.55,0.375,0.66,0.416]
    sd_misinfo = [0.19,.207,0.138 , 0.1,0.0833]

    holder = []
    participant = None
    for i in range(20):
        new_list = []
        for element in master_list:
            if element[4] != participant:


                if element[1] == True:
                    mu = mean_misinfo[int(element[0])-1]
                    sigma = sd_misinfo[int(element[0])-1]
                else:
                    mu = mean_truth[int(element[0])-1]
                    sigma = sd_truth[int(element[0])-1]
                
                s = np.random.normal(mu, sigma, 1)
                s = s[0]

            new_element = element.copy()

            # print(new_element)
            chance = random.random()
            # print(chance)
            if s >= chance:
                new_element[3] = 1 + (0.00001 * random.randint(-2, 2))

            else:
                new_element[3] = 0 + (0.00001 * random.randint(-2, 2))
            
            if chance < 0.2:
                    if new_element[1] == True:
                        new_element[1] == False
                    else:
                        new_element[1] == True
            chance = random.random()
            if chance < 0.2:
                new_element[2] = random.randint(0,9)

            new_element[4] += "_" + str(i)
        #     new_element[4] += "_2"
            new_list.append(new_element)
        holder.append(new_list)

    # blank = []
    # for l in holder:
    #     master_list += l
    #     blank += l
    

    df = pd.DataFrame(master_list, columns=columns)
    df.to_csv('pilot.csv', index=False)  


    print(df)
    print(df.head(11))

    return(df)

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

def run_power():
    master = create_csv_table()
    formula = 'score ~ intervention_ID + misinfo + timestep + (1 | timestep)'
    model = sm.MixedLM.from_formula(formula, data=master, groups="intervention_ID")
    result = model.fit()
    print(result.summary())



if __name__ == '__main__':
    # count_percentages_overall()
    # count_percentage_by_first_last()
    # count_percentage_by_question()
    # count_percentage_by_ordering()
    # # count_priming_change()
    # count_results_by_individual()
    # calc_std(count_results_by_individual()[0])
    # print(create_csv_table())
    run_power()
    # create_individual_score()
    # calc_std_by_text_type()