import json
from collections import Counter 
import numpy
import statsmodels.api as sm
import pandas as pd
import numpy as np
import random
import time
import math

# Intervention ID
# False or true
# time_step 
# score
# Participant Id

q = {"order":"3,5,4,1,6,7,0,2","rsv":"There is an emergency use RSV immunoprophylaxis for babies deemed at risk","asthma_outside":"Relied mostly on the AI recommendation to answer","sweets_outside":"Relied mostly on outside knowledge to answer","rsv_outside":"Relied on outside knowledge and the AI recommendation equally to answer","id":"345523","hrt_outside":"Relied mostly on outside knowledge to answer","question times":"1705271426068,1705271431017,1705271441402,1705271445350,1705271450301,1705271456334,1705271460917,1705271468817,1705271473651","sweets_likert":"Unsure","ethnicity":"Latino","cosleep":"Yes, but only with close adult supervision","employment":"Unable to work","rsv_likert":"Somewhat Trustworthy","asthma":"Yes, but only in a supervised setting like hospital or clinic.","cosleep_outside":"Relied entirely on the AI recommendation to answer","breast":"Yes, friends","media":"Internet Search: Personal Blogs","asthma_likert":"Somewhat Trustworthy","lung":"People aged 50-80, who've smoked 20 pack-years, and are either currently smoking or have quit in the past 15 years","texas_2":"Abortion","hrt":"Slightly decrease risk of cancer,","sweets":"Non-sugar sweetners help achieve weight-loss since they reduce cravings for sugar.","start_time":"1705271383880","rsv_2":"31 weeks","asthma_2":"A mixture of active and inactive flu viruses","gender":"Other","kids":"2 kids","formula_likert":"Somewhat Trustworthy","texas":"6 Weeks","hispanic":"No","formula_2":"Has no nutritional benefit","leftTab":"false","accepted":"true","cosleep_2":"Ideally 18 months","cosleep_likert":"Unsure","texas_likert":"Somewhat Trustworthy","texas_outside":"Relied entirely on the AI recommendation to answer","formula":"After one year of age","group":"1","sweets_2":"Decreases the risk","lung_outside":"Relied entirely on the AI recommendation to answer","formula_outside":"Relied on outside knowledge and the AI recommendation equally to answer","hrt_likert":"Unsure","tech":"Neither Agree Nor Disagree","hrt_2":"Greatly increase risk of cancer","lung_likert":"Somewhat Trustworthy","lung_2":"No, they should wait until 25 years since quitting to begin "}

def parse_ndjson(data):
    return [json.loads(l) for l in data.splitlines()]


with open('real_study_final.json', 'r', encoding="utf8") as handle:
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
 #'texas_2',
  'hrt', 'rsv_2', 
 'texas', 'formula_2', 'cosleep_2',
 'formula',  'hrt_2',
 "papsmear", "papsmear_2",
 "mammogram", 
#  "mammogram_2",
 "IUD", "IUD_2", "breastfeed", "breastfeed_2",
 "lung","lung_2", 
#  "asthma", "asthma_2"
 ]

questions_tags_inital = ['rsv', 'cosleep', 'hrt', 'texas', 'formula',  "papsmear", "mammogram", "IUD", "breastfeed",
"lung"
]

answers_about_misinfo = ['texas','hrt_2','formula','formula_2','lung','lung_2','rsv',
'cosleep'
]
# print(questions_tags_ns)

misinfo_text_codes = set(
    [
        "texas", 
        "texas_2", 
        "rsv",
        "rsv_2",
        "formula",
        "formula_2"
        "cosleep_2",
        "cosleep",
        "lung",
        "lung_2",
        "hrt",
        "hrt_2"
    ]
)

demographic_tags =  ['ethnicity', 'employment', 'media', 'gender', 'kids',
 'hispanic', 'leftTab', 'accepted', 'group', 'tech']

correct_answers = set([
    "6 Weeks", 
    "Increase the risk of developing breast cancer",
     "Yes, but only if the child with asthma is at least 5 years old.",
     "Toddler formulas are not needed to meet nutritional needs of young children",
     "People aged 50-80, who have smoked 20 pack years, regardless of when they quit. ",
     "Anyone who's smoked at least 20 pack years of cigarettes and are between 50 - 80 years of age.",
     "There is an RSV vaccine recommended for all babies under 8 months born in RSV season",
     "Maternal vaccination before birth",
     "There is an RSV vaccine recommended for all babies whose mothers did not receive an RSV vaccine during pregnancy.",
     "Non-sugar sweetners do not confer any long-term benefit in reducing body fat in adults or children",
     "Abortion",
     "Increase the risk of developing cancer",
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


q_legal = ["texas"]

q_cause_and_effect = set(["hrt", "hrt_2","rsv_2", "IUD"])

q_timing = set(["lung","cosleep_2","papsmear","papsmear_2","mammogram","breastfeed_2"])

q_medical = set(["formula","formula_2","lung","lung_2","cosleep","IUD_2","breastfeed"])

q_reading_comp = set(["hrt","cosleep_2","papsmear","papsmear_2","mammogram","IUD","IUD_2","breastfeed","breastfeed_2"])

q_outside_knowledge = ["texas","hrt_2", "formula","formula_2","lung","lung_2","rsv","cosleep",]

def count_percentages_overall():

    master = count_all()
    
    final = {
        1: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        2: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        3: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        4: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        5: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
    }

    final_correct = []
    final_unsure = []

    for group in master:
        for element in group:
            # print(element)
            final[element[0]]["correct"] += element[2]["correct"]
            final[element[0]]["correct"] += element[2]["Unsure"]
            final[element[0]]["incorrect"] += element[2]["incorrect"]

    for key,value in final.items():
        total = value["correct"] + value["Unsure"] + value["incorrect"]
        print(key, "correct ",  (value["correct"]/total) , "unsure" , (value["Unsure"] /total) , "incorrect" , (value["incorrect"] /total))

def calc_std(master):
    
    
    for group in master:
        print(numpy.mean(group),numpy.std(group)/math.sqrt(len(group)))

def calc_std_by_all():

    master = count_results_by_individual_regular()

    correct = [[],[],[],[],[]]
    
    unsure = [[],[],[],[],[]]


    for i, element in enumerate(master):
        # print(element)
        # print(group_num,key,answers)
        for d in element:
            correct[i].append((d["correct"] + d["Unsure"]) / (d["correct"] + d['Unsure'] + d["incorrect"]))
            # unsure[i].append(d["Unsure"] / (d["correct"] + d['Unsure'] + d["incorrect"]))
        
    print("Correct")
    for i, group in enumerate(correct):
        # print(group)
        print(i+1,numpy.mean(group),numpy.std(group)/math.sqrt(len(group)))



    # print("Unsure")
    # for i, group in enumerate(unsure):
        
    #     print(i+1,numpy.mean(group),numpy.std(group)/math.sqrt(len(group)))


def count_results_by_individual_regular():

    master = []
    master2 = []
    
    for d in dicts:
        holder = {"correct" : 0, "Unsure" : 0, "incorrect" : 0}
        holder2 = {"misinfo_correct": 0, "misinfo_unsure": 0, "misinfo_incorrect": 0, "trueinfo_correct": 0, "trueinfo_unsure": 0, "trueinfo_incorrect": 0,}
    

        #holder2
        if attention_check(d):

            # for tag in answers_about_misinfo: 
            #### go here for misinfo graph
            for tag in questions_tags_ns: 
                if tag != "texas_2" and tag != "mammogram_2":

                    if d["answers"][tag] in correct_answers:
                        holder["correct"] += 1
                    else:
                        ##unsure counts as correct
                        if d["answers"][tag] == "Unsure":
                            # if tag in misinfo_text_codes:
                            holder["Unsure"] +=1
                        else:
                            # if tag in misinfo_text_codes:
                            holder["incorrect"] += 1

            master2.append([int(d["answers"]["group"]), holder])

    final_list = [[],[],[],[],[]]
    for element in master2:
        # print(element)
        # print(group_num,key,answers)
        final_list[element[0]-1].append(element[1])

    
    return final_list


def calc_std_by_text_type():

    _, master = count_results_by_individual()

    mean_truth = [[],[],[],[],[]]
    mean_misinfo = [[],[],[],[],[]]

    unsure_truth = [[],[],[],[],[]]
    unsure_misinfo = [[],[],[],[],[]]


    for i, element in enumerate(master):
        # print(element)
        # print(group_num,key,answers)
        for d in element:
            mean_truth[i].append(d["trueinfo_correct"] / (d["trueinfo_correct"] + d['trueinfo_unsure'] + d["trueinfo_incorrect"]))
            mean_misinfo[i].append(d["misinfo_correct"] / (d["misinfo_correct"] + d['misinfo_unsure'] + d["misinfo_incorrect"]))

            unsure_truth[i].append(d['trueinfo_unsure'] / (d["trueinfo_correct"] + d['trueinfo_unsure'] + d["trueinfo_incorrect"]))
            unsure_misinfo[i].append(d['misinfo_unsure'] / (d["misinfo_correct"] + d['misinfo_unsure'] + d["misinfo_incorrect"]))
        
    print("mean_truth_correctness")
    for i, group in enumerate(mean_truth):
        
        print(i+1,numpy.mean(group),numpy.std(group)/math.sqrt(len(group)))

    print("mean_misinfo_correctness")
    for i, group in enumerate(mean_misinfo):
        print(i+1, numpy.mean(group),numpy.std(group)/math.sqrt(len(group)))


    print("truth_unsure")
    for i, group in enumerate(unsure_truth):
        
        print(i+1,numpy.mean(group),numpy.std(group)/math.sqrt(len(group)))

    print("misinfo_unsure")
    for i, group in enumerate(unsure_misinfo):
        print(i+1, numpy.mean(group),numpy.std(group)/math.sqrt(len(group)))



def count_results_by_individual():

    master = []
    master2 = []
    
    for d in dicts:
        holder = {}

        holder = {"correct" : 0, "Unsure" : 0, "incorrect" : 0}
        holder2 = {"misinfo_correct": 0, "misinfo_unsure": 0, "misinfo_incorrect": 0, "trueinfo_correct": 0, "trueinfo_unsure": 0, "trueinfo_incorrect": 0,}
    

        #holder2
        if attention_check(d):

            # for tag in answers_about_misinfo: 
            #### go here for misinfo graph
            for tag in questions_tags_ns: 
                if tag != "texas_2" and tag != "mammogram_2":

                    if d["answers"][tag] in correct_answers:
                        # if tag in misinfo_text_codes:
                        if tag in answers_about_misinfo:
                            holder2["misinfo_correct"] +=1
                        else:
                            holder2["trueinfo_correct"] +=1

                    else:
                        ##unsure counts as correct
                        if d["answers"][tag] == "Unsure":
                            # if tag in misinfo_text_codes:
                            if tag in answers_about_misinfo:
                                holder2["misinfo_unsure"] +=1
                            else:
                                holder2["trueinfo_unsure"] +=1
                        else:
                            # if tag in misinfo_text_codes:
                            if tag in answers_about_misinfo:
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
    # print(final_list2)
    return final_list, final_list2



def attention_check(d):
    if d["answers"]["texas_2"] == "Abortion" and d['answers']['mammogram_2'] == "Mammograms":
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

    print(final)
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
                    final[question]["correct"] += 1
                else:
                    final[question]["incorrect"] += 1
                
                question += "_inital"
                if d["answers"][question] in correct_answers:
                    final[question]["correct"] += 1
                elif d["answers"][question] == "Unsure":
                    final[question]["correct"] += 1
                else:
                    final[question]["incorrect"] += 1
    
    # correct = 0
    # incorrect = 
    # total = 0
    # total_initial -
    for question in questions_tags_inital:
        total = final[question]["correct"] + final[question]["Unsure"] + final[question]["incorrect"]
        total_inital = final[question + "_inital"]["correct"] + final[question + "_inital"]["Unsure"] + final[question + "_inital"]["incorrect"]
        print(question, "correct_initial", (final[question + "_inital"]["correct"]/total_inital),  "correct", (final[question]["correct"]/total))

def count_percentage_by_first_last():
    for i in range(1,6):
        first_list, last_list = first_and_last(i)

        # print(first_list,last_list)
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
                if tag != "texas_2" and tag != "mammogram_2":
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

def check_misinfo_answer(tag):
    if tag in answers_about_misinfo:
        return True
    else:
        return False

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

        
            csv_file = 'real_data_flipped_misinfo.csv'
            for tag in questions_tags_inital:
                if check_misinfo_answer(tag) is True:
                # if check_misinfo_answer(tag) is False:
                # if check_misinfo(tag) is True:
                # if check_misinfo(tag) is False:

                    if check_misinfo(tag):
                        misinfo = True
                    else:
                        misinfo = False 

                    ## add question type
                    if check_misinfo_answer(tag):
                        misinfo_answer = True
                    else:
                        misinfo_answer = False

                    question_pos = default_order.index(tag)

                    displayed_order = int(order[question_pos])
                    # print(order)
                    # print(tag,displayed_order)

                    ### convert timing
                    if displayed_order < 3:
                        pos = 0
                    elif displayed_order < 7:
                        pos = 1
                    else:
                        pos = 2

                    if d["answers"][tag] in correct_answers:
                        new_element = [d["answers"]["group"],tag, misinfo, misinfo_answer , pos , 0, d["user_id"] ]

                    elif d["answers"][tag] == "Unsure":
                        new_element = [d["answers"]["group"],tag, misinfo,misinfo_answer , pos , 0, d["user_id"] ]

                    else:
                        new_element = [d["answers"]["group"],tag, misinfo,misinfo_answer , pos , 1, d["user_id"] ]

                    master_list.append(new_element)
                    tag += "_2"

                    if check_misinfo_answer(tag):
                        misinfo_answer = True
                    else:
                        misinfo_answer = False

                    if tag != "texas_2" and tag != "mammogram_2":


                        if d["answers"][tag] in correct_answers:
                            
                            new_element = [d["answers"]["group"],tag, misinfo, misinfo_answer , pos , 0, d["user_id"] ]
                        elif d["answers"][tag] == "Unsure":
                            new_element = [d["answers"]["group"],tag, misinfo, misinfo_answer ,pos , 0, d["user_id"] ]

                        else:
                            new_element = [d["answers"]["group"],tag, misinfo, misinfo_answer , pos , 1, d["user_id"] ]

                    master_list.append(new_element)

    # for elements in master_list:
    # return(master_list)

    columns = ['Intervention_ID', "Tag", 'Misinfo', "Misinfo_Answer", 'Timestep', 'Outcome', 'Participant_ID']

    # mean = [0.488,0.69,0.625,0.65,0.65]
    # sd = [0.13,0.177,0.08,0.15,0.05]


    # mean_truth = [0.583, 0.805, 0.833, 0.625, 0.833]
    # sd_truth = [0.241, 0.141, 0.058, 0.208, 0.1]

    # mean_misinfo = [0.3,0.55,0.375,0.66,0.416]
    # sd_misinfo = [0.19,.207,0.138 , 0.1,0.0833]

    # holder = []
    # participant = None
    

    df = pd.DataFrame(master_list, columns=columns)
    df.to_csv(csv_file, index=False)  


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


def create_csv_table_trust():
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

        
            csv_file = 'real_data_trust_misinfo.csv'
            for tag in questions_tags_inital:
                # if check_misinfo_answer(tag) is False:
                # if check_misinfo_answer(tag) is False:
                # if check_misinfo(tag) is True:
                if check_misinfo(tag) is False:

                    if check_misinfo(tag):
                        misinfo = True
                    else:
                        misinfo = False 

                    ## add question type
                    if check_misinfo_answer(tag):
                        misinfo_answer = True
                    else:
                        misinfo_answer = False

                    question_pos = default_order.index(tag)

                    displayed_order = int(order[question_pos])
                    # print(order)
                    # print(tag,displayed_order)

                    ### convert timing
                    if displayed_order < 3:
                        pos = 0
                    elif displayed_order < 7:
                        pos = 1
                    else:
                        pos = 2
                    
                    tag += "_likert"
                    score = 0
                    if d["answers"][tag] == "Very Trustworthy":
                        score = 4
                    elif d["answers"][tag] == "Somewhat Trustworthy":
                        score = 3
                    elif d["answers"][tag] == "Neither Trustworthy nor Untrustworthy":
                        score = 2
                    elif d["answers"][tag] == "Somewhat Untrustworthy":
                        score = 1
                    else:
                        score = 0


                    new_element = [d["answers"]["group"],tag, misinfo, misinfo_answer , pos , score , d["user_id"] ]


                    master_list.append(new_element)

    # for elements in master_list:
    # return(master_list)

    columns = ['Intervention_ID', "Tag", 'Misinfo', "Misinfo_Answer", 'Timestep', 'Outcome', 'Participant_ID']

    # mean = [0.488,0.69,0.625,0.65,0.65]
    # sd = [0.13,0.177,0.08,0.15,0.05]


    # mean_truth = [0.583, 0.805, 0.833, 0.625, 0.833]
    # sd_truth = [0.241, 0.141, 0.058, 0.208, 0.1]

    # mean_misinfo = [0.3,0.55,0.375,0.66,0.416]
    # sd_misinfo = [0.19,.207,0.138 , 0.1,0.0833]

    # holder = []
    # participant = None
    

    df = pd.DataFrame(master_list, columns=columns)
    df.to_csv(csv_file, index=False)  


    print(df)
    print(df.head(11))

    return(df)


def percentages_by_children():
    master_men, master_women = count_all_by_children()

    final_men = {
        1: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        2: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        3: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        4: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        5: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
    }
    final_women = {
        1: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        2: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        3: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        4: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        5: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
    }

    print(final_men)

    print("child")
    for group in master_men:
        for element in group:
            # print(element)
            final_men[element[0]]["correct"] += element[2]["correct"]
            final_men[element[0]]["incorrect"] += element[2]["incorrect"]

    for key,value in final_men.items():
        total = value["correct"]  + value["incorrect"]
        print(key, "correct ",  (value["correct"]/total), "incorrect" , (value["incorrect"] /total))

    print("childless")
    for group in master_women:
        for element in group:
            # print(element)
            final_women[element[0]]["correct"] += element[2]["correct"]
            final_women[element[0]]["incorrect"] += element[2]["incorrect"]

    for key,value in final_women.items():
        total = value["correct"]  + value["incorrect"]
        print(key, "correct ",  (value["correct"]/total), "incorrect" , (value["incorrect"] /total))


def count_all_by_children():
    master_child = []
    master_childless = []
    for i in range(1,6):
        child, childless = count_results_by_children(i)
        master_child.append(child)
        master_childless.append(childless)
    # print(master)
    return master_child, master_childless

def count_results_by_children(group_num):
    
    master_dict_child = {}
    master_dict_childless = {}

    for tags in questions_tags_ns:
        master_dict_child[tags] = {"correct" : 0, "incorrect" : 0}
        master_dict_childless[tags] = {"correct" : 0, "incorrect" : 0}

    for d in dicts:
        if d["answers"]["group"] == str(group_num) and attention_check(d):
            for tag in questions_tags_ns:
                if tag != "texas_2":
                    if d['answers']['kids'] != "0 children":
                        if d["answers"][tag] in correct_answers:
                            master_dict_child[tag]["correct"] +=1
                        else:
                            if d["answers"][tag] == "Unsure":
                                master_dict_child[tag]["correct"] +=1
                            else:
                                master_dict_child[tag]["incorrect"] +=1
                    else:
                        if d["answers"][tag] in correct_answers:
                            master_dict_childless[tag]["correct"] +=1
                        else:
                            if d["answers"][tag] == "Unsure":
                                master_dict_childless[tag]["correct"] +=1
                            else:
                                master_dict_childless[tag]["incorrect"] +=1
    

    final_list_child = []
    for key,answers in master_dict_child.items():
        # print(group_num,key,answers)
        final_list_child.append([group_num, key, answers])

    final_list_childless = []
    for key,answers in master_dict_childless.items():
        # print(group_num,key,answers)
        final_list_childless.append([group_num, key, answers])
    
    return final_list_child,final_list_childless

def percentages_by_sex():
    master_men, master_women = count_all_by_sex()

    final_men = {
        1: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        2: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        3: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        4: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        5: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
    }
    final_women = {
        1: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        2: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        3: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        4: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
        5: {"correct" : 0, "Unsure" : 0, "incorrect" : 0},
    }


    for group in master_men:
        for element in group:
            # print(element)
            final_men[element[0]]["correct"] += element[2]["correct"]
            final_men[element[0]]["incorrect"] += element[2]["incorrect"]

    for key,value in final_men.items():
        total = value["correct"]  + value["incorrect"]
        print(key, "correct ",  (value["correct"]/total), "incorrect" , (value["incorrect"] /total))

    print("women")
    for group in master_women:
        for element in group:
            # print(element)
            final_women[element[0]]["correct"] += element[2]["correct"]
            final_women[element[0]]["incorrect"] += element[2]["incorrect"]

    for key,value in final_women.items():
        total = value["correct"]  + value["incorrect"]
        print(key, "correct ",  (value["correct"]/total), "incorrect" , (value["incorrect"] /total))
    


def count_all_by_sex():
    master_men = []
    master_women = []
    for i in range(1,6):
        men, women = count_results_by_sex(i)
        master_men.append(men)
        master_women.append(women)
    # print(master)
    return master_men, master_women

def count_results_by_sex(group_num):
    
    master_dict_men = {}
    master_dict_women = {}

    for tags in questions_tags_ns:
        master_dict_men[tags] = {"correct" : 0, "incorrect" : 0}
        master_dict_women[tags] = {"correct" : 0, "incorrect" : 0}

    for d in dicts:

        if d["answers"]["group"] == str(group_num) and attention_check(d):
            for tag in questions_tags_ns:
                if tag != "texas_2":
                    if d['answers']['gender'] == "Male":
                        if d["answers"][tag] in correct_answers:
                            master_dict_men[tag]["correct"] +=1
                        else:
                            if d["answers"][tag] == "Unsure":
                                master_dict_men[tag]["correct"] +=1
                            else:
                                master_dict_men[tag]["incorrect"] +=1
                    else:
                        if d['answers']['gender'] == "Female":
                            if d["answers"][tag] in correct_answers:
                                master_dict_women[tag]["correct"] +=1
                            else:
                                if d["answers"][tag] == "Unsure":
                                    master_dict_women[tag]["correct"] +=1
                                else:
                                    master_dict_women[tag]["incorrect"] +=1
    

    final_list_men = []
    for key,answers in master_dict_men.items():
        # print(group_num,key,answers)
        final_list_men.append([group_num, key, answers])

    final_list_women = []
    for key,answers in master_dict_women.items():
        # print(group_num,key,answers)
        final_list_women.append([group_num, key, answers])
    
    return final_list_men,final_list_women

def run_power():

    master = create_csv_table()

    df = pd.read_csv('pilot.csv')
    data = pd.DataFrame({'Participant_ID': df['Participant_ID'],
                     'Intervention_ID': df['Intervention_ID'],
                     'Timestep': df['Timestep'],
                     'Misinfo': df['Misinfo'],
                     'Outcome': df['score']})

    formula = 'Outcome ~ (Intervention_ID) + (Misinfo) + Timestep + (1 | Timestep)'
    formula2 = 'score ~ (Intervention_ID) + (Misinfo) + Timestep + (1 | Timestep)'
    model = sm.MixedLM.from_formula(formula, data=data, groups="Intervention_ID")
    result = model.fit()
    print(result.summary())

    model = sm.MixedLM.from_formula(formula2, data=master, groups="Intervention_ID")
    result = model.fit()
    print(result.summary())


def calc_times():
    holder = []
    for d in dicts:
        if attention_check(d):
            times = d["answers"]["question times"]
            t = times.split(",")
            start_time = int(t[0])
            last_time = int(t[-1])
            duration = last_time - start_time
            holder.append(duration)
    # print(holder[-1]* (0.0166667 / 1000))
    print(sum(holder)/len(holder) * (0.0166667 / 1000))

def get_results_bin():
    master = []
    for i in range(1,6):
        results = count_results_by_bin(i)
    
    # print(master)
    # for group in results:
    #     print(group[0])
    #     order_q = ["q_legal","q_cause_and_effect","q_medical","q_reading_comp", "q_outside_knowledge"]
    #         for element in group:


def count_results_by_bin(group_num):

    master2 = []
    holder2 = {
                "q_legal" : {"correct" : 0, "incorrect" : 0},
                "q_cause_and_effect" : {"correct" : 0, "incorrect" : 0},
                "q_medical" : {"correct" : 0, "incorrect" : 0},
                "q_timing" : {"correct" : 0, "incorrect" : 0},
                "q_reading_comp" : {"correct" : 0, "incorrect" : 0},
                "q_outside_knowledge" : {"correct" : 0, "incorrect" : 0},
            }
  
    for d in dicts:
        
        #holder2
        if d["answers"]["group"] == str(group_num) and attention_check(d):
        # if attention_check(d):

                # for tag in answers_about_misinfo: 
            #### go here for misinfo graph

            order_q = ["q_legal","q_cause_and_effect","q_medical","q_timing","q_reading_comp", "q_outside_knowledge"]

            for i, current_bin in enumerate([q_legal,q_cause_and_effect,q_medical,q_timing,q_reading_comp, q_outside_knowledge]):
                for tag in current_bin: 
        
                    if d["answers"][tag] in correct_answers:
                            holder2[order_q[i]]["correct"] +=1

                    else:
                        ##unsure counts as correct
                        if d["answers"][tag] == "Unsure":
                            holder2[order_q[i]]["correct"] +=1
                        else:
                            holder2[order_q[i]]["incorrect"] +=1

            # master2.append([int(d["answers"]["group"]), holder2])


    final_list2 = [[],[],[],[],[]]

    print(group_num)
    for key,value in holder2.items():
        # print(key,value)
        print(key,value["correct"]/(value["correct"]+ value["incorrect"]))

    # for element in master2:
    #     # print(element)
    #     # print(group_num,answers)
    #     final_list2[element[0]-1].append(element[1])


    # print(final_list2)
    # return final_list2


def count_groups():
    group = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    }
    pids = set()
    for d in dicts:
        group[int(d["answers"]["group"])] +=1
        pids.add(d["user_id"])
    return group, len(pids)


def percentages_trust():
    master = count_trust()


    final = {}
    for question in range(1,6):
        final[question] = {
            "Very Trustworthy" : 0,
            "Somewhat Trustworthy" : 0, 
            "Neither Trustworthy nor Untrustworthy" : 0,
            "Somewhat Untrustworthy" : 0,
            "Not Trustworthy" : 0,
            }
    
    for group in master:
        for element in group:
            # print(element)
            final[element[0]]["Very Trustworthy"] += element[2]["Very Trustworthy"]
            final[element[0]]["Somewhat Trustworthy"] += element[2]["Somewhat Trustworthy"]
            final[element[0]]["Neither Trustworthy nor Untrustworthy"] += element[2]["Neither Trustworthy nor Untrustworthy"]
            final[element[0]]["Somewhat Untrustworthy"] += element[2]["Somewhat Untrustworthy"]
            final[element[0]]["Not Trustworthy"] += element[2]["Not Trustworthy"]

    for key,value in final.items():
        total = value["Very Trustworthy"] + value["Somewhat Trustworthy"] + value["Neither Trustworthy nor Untrustworthy"] + value["Somewhat Untrustworthy"] + value["Not Trustworthy"]
        print(key, "VT ",  (value["Very Trustworthy"]/total) , "ST" , (value["Somewhat Trustworthy"] /total) , "NToUT" , (value["Neither Trustworthy nor Untrustworthy"] /total), "SU", (value["Somewhat Untrustworthy"]/total) , "NT",  value["Not Trustworthy"]/total )


def count_trust():

    master = []
    for i in range(1,6):
        results = get_trust(i)
        master.append(results)
    # print(master)
    return master

def get_trust(group_num):
    master_dict = {}

    for tags in questions_tags_inital:
        master_dict[tags] = {
            "Very Trustworthy" : 0,
            "Somewhat Trustworthy" : 0, 
            "Neither Trustworthy nor Untrustworthy" : 0,
            "Somewhat Untrustworthy" : 0,
            "Not Trustworthy" : 0,
            }

    for d in dicts:
        if d["answers"]["group"] == str(group_num) and attention_check(d):
            for tag in questions_tags_inital:
                new_tag = tag + "_likert"
                master_dict[tag][d["answers"][new_tag]] += 1
        
    final_list = []
    for key,answers in master_dict.items():
        # print(group_num,key,answers)
        final_list.append([group_num, key, answers])
    
    return final_list


def calc_std_by_attribute():

    master = count_results_by_attribute()

    correct = [[],[],[],[],[]]
    
    unsure = [[],[],[],[],[]]


    for i, element in enumerate(master):
        # print(element)
        # print(group_num,key,answers)
        for d in element:
            print(d)
            correct[i].append((d["correct"]) / (d["correct"] + d['Unsure'] + d["incorrect"]))
            unsure[i].append(d["Unsure"] / (d["correct"] + d['Unsure'] + d["incorrect"]))
        
    print("attribute")
    for i, group in enumerate(correct):
        # print(len(group))
        print(i+1,numpy.mean(group),numpy.std(group)/math.sqrt(len(group)))



    print("Unsure")
    for i, group in enumerate(unsure):
        
        print(i+1,numpy.mean(group),numpy.std(group)/math.sqrt(len(group)))


def count_results_by_attribute():

    master = []
    master2 = []
    
    for d in dicts:
        holder = {"correct" : 0, "Unsure" : 0, "incorrect" : 0}
        # holder_2 = {"correct" : 0, "Unsure" : 0, "incorrect" : 0}

        # holder2 = {"misinfo_correct": 0, "misinfo_unsure": 0, "misinfo_incorrect": 0, "trueinfo_correct": 0, "trueinfo_unsure": 0, "trueinfo_incorrect": 0,}
    

        #holder2
        if attention_check(d) and d["answers"]['ai_familiarity'] == "I have little to no knowledge about AI":

            # for tag in answers_about_misinfo: 
            #### go here for misinfo graph
            for tag in questions_tags_ns: 
                if tag != "texas_2" and tag != "mammogram_2":
                # and tag in answers_about_misinfo:
                    #attribute 
                    if d["answers"][tag] in correct_answers:
                        holder["correct"] += 1
                    else:
                        ##unsure counts as correct
                        if d["answers"][tag] == "Unsure":
                            # if tag in misinfo_text_codes:
                            holder["Unsure"] +=1
                        else:
                            # if tag in misinfo_text_codes:
                            holder["incorrect"] += 1
            master2.append([int(d["answers"]["group"]), holder])

    final_list = [[],[],[],[],[]]
    for element in master2:
        # print(element)
        # print(group_num,key,answers)
        final_list[element[0]-1].append(element[1])

    # print(final_list)
    return final_list

def calc_std_by_trust():

    master = count_results_by_trust()
    
    VT = [[],[],[],[],[]]
    
    ST = [[],[],[],[],[]]

    NToUT = [[],[],[],[],[]]

    SU = [[],[],[],[],[]]

    NT = [[],[],[],[],[]]



    for i, element in enumerate(master):
        # print(element)
        # print(group_num,key,answers)
        for d in element:
            total = d["Very Trustworthy"] + d['Somewhat Trustworthy'] + d["Neither Trustworthy nor Untrustworthy"] + d["Somewhat Untrustworthy"] + d["Not Trustworthy"]
            VT[i].append(d["Very Trustworthy"] / total)
            ST[i].append(d['Somewhat Trustworthy'] / total)
            NToUT[i].append(d["Neither Trustworthy nor Untrustworthy"] / total)
            SU[i].append(d["Somewhat Untrustworthy"] / total)
            NT[i].append(d["Not Trustworthy"] / total)


    print("attribute")
    for catagory in [VT,ST,NToUT,SU,NT]:
        print("CATAGORY")
        for i, group in enumerate(catagory):
            # print(len(group))
            print(i+1,numpy.mean(group),numpy.std(group)/math.sqrt(len(group)))



    # print("Unsure")
    # for i, group in enumerate(unsure):
        
    #     print(i+1,numpy.mean(group),numpy.std(group)/math.sqrt(len(group)))


def count_results_by_trust():

    master = []
    master2 = []
    
    for d in dicts:
        holder = {
            "Very Trustworthy" : 0,
            "Somewhat Trustworthy" : 0, 
            "Neither Trustworthy nor Untrustworthy" : 0,
            "Somewhat Untrustworthy" : 0,
            "Not Trustworthy" : 0,
            }
        # holder_2 = {"correct" : 0, "Unsure" : 0, "incorrect" : 0}

        # holder2 = {"misinfo_correct": 0, "misinfo_unsure": 0, "misinfo_incorrect": 0, "trueinfo_correct": 0, "trueinfo_unsure": 0, "trueinfo_incorrect": 0,}
    

        #holder2
        if attention_check(d):

            # for tag in answers_about_misinfo: 
            #### go here for misinfo graph
            for tag in questions_tags_inital:
                if tag not in misinfo_text_codes:
                    new_tag = tag + "_likert"
                    holder[d["answers"][new_tag]] += 1
    
            master2.append([int(d["answers"]["group"]), holder])

    final_list = [[],[],[],[],[]]
    for element in master2:
        # print(element)
        # print(group_num,key,answers)
        final_list[element[0]-1].append(element[1])

    # print(final_list)
    return final_list


if __name__ == '__main__':
    #this one
    # count_percentages_overall()
    # print(count_all())

    # count_percentage_by_first_last()
    # count_percentage_by_question()
    # count_percentage_by_ordering()
    # count_priming_change()
    # print(count_results_by_individual())
    # calc_std(count_results_by_individual()[0])
    # print(create_csv_table())

    create_csv_table_trust()
    # run_power()
    # create_individual_score()
    # calc_times()

    #these two
    # percentages_by_sex()
    # percentages_by_children()

    # print(count_all())

    #this one
    # calc_std_by_text_type()

    # print(count_results_by_individual()[0])

    # print(count_results_by_individual_regular())
    # calc_std_by_all()


    # calc_std_by_attribute()
    # calc_std_by_trust()

    # count_percentages_overall()


    # count_results_by_bin()
    # get_results_bin()
    # count_percentage_by_ordering()
    # print(count_groups())

            
    # print(count_trust())
    # percentages_trust()