import pandas as pd
import numpy as np
from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
import json

'''
__________________________________________
Server Setup and Data loading
__________________________________________

'''

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
data = pd.read_csv('forecast_data.csv', sep=',')

'''
__________________________________________
Get List of Available Driver Numbers
__________________________________________

'''

@app.route('/getDriverIds', methods=['GET'])
@cross_origin()
def getDriverIds():
    challenger =  data['challenger'].values.tolist()
    opponent =  data['opponent'].values.tolist()
    return_list = set(opponent+challenger)
    return_list = list(return_list)
    return_json=[]
    for i in return_list:
        return_json.append({'id':i, 'driver':i})
    return json.dumps(return_json)

'''
__________________________________________
Get Number of Wins for specific Driver
__________________________________________

'''

@app.route('/getDriverWins', methods=['POST'])
@cross_origin()
def getDriverWins():
    driver_id = request.get_json("id")
    driver_id = int(driver_id["id"])
    driver_profile = data.loc[(data['challenger'] == driver_id) | (data['opponent'] == driver_id)]
    wins = len(driver_profile.loc[(driver_profile['winner'] == driver_id)])
    defeats = len(driver_profile.loc[(driver_profile['winner'] != driver_id)])
    return json.dumps([wins,defeats])


@app.route('/getLastMatchups', methods = ['POST'])
@cross_origin()
def getLastMatchups():
    driver_id = request.get_json("id")
    driver_id = int(driver_id["id"])
    driver_profile = data.loc[(data['challenger'] == driver_id) | (data['opponent'] == driver_id)]
    driver_profile = driver_profile[['id','race_created','race_driven','challenger','opponent','money','winner']].sort_values(by=['race_driven'], ascending=False).head(10)
    return_list = []
    for index, row in driver_profile.iterrows():
        return_list.append({'id':row['id'], 'Herausforderung_Datum':row['race_created'],'Herausforderung_gefahren': row['race_driven'],'Herausforderer':row['challenger'],'Gegner':row['opponent'],'Geldeinsatz':row['money'],'Gewinner':row['winner']})
    return json.dumps(return_list)


@app.route('/getNemesis', methods=['POST'])
@cross_origin()
def getNemesis():
    driver_id = request.get_json("id")
    driver_id = int(driver_id["id"])
    driver_profile = data.loc[(data['challenger'] == driver_id) | (data['opponent'] == driver_id)]
    driver_profile = driver_profile.groupby(['challenger','opponent']).size().reset_index(name='Rennen_gegeneinander').sort_values(by = 'Rennen_gegeneinander', ascending = False).head(5)
    return_list= []
    for index, row in driver_profile.iterrows():
        return_list.append({'id':int(index),'Herausforderer':int(row['challenger']),'Gegner':int(row['opponent']), 'Rennen_gegeneinander':int(row['Rennen_gegeneinander'])})
    return json.dumps(return_list)

@app.route('/getFavoriteTrack', methods=['POST'])
@cross_origin()
def getFavoriteTrack():
    driver_id = request.get_json("id")
    driver_id = int(driver_id["id"])
    driver_profile = data.loc[(data['challenger'] == driver_id) | (data['opponent'] == driver_id)]
    driver_profile = driver_profile.groupby(['track_id']).size().reset_index(name='Auf_Strecke_gefahren').sort_values(by = 'Auf_Strecke_gefahren', ascending = False).head(3)
    return_list= []
    for index, row in driver_profile.iterrows():
        return_list.append({'id':int(index), 'Strecke': int(row['track_id']), 'Auf_Strecke_gefahren':int(row['Auf_Strecke_gefahren'])})
    return json.dumps(return_list)

'''
__________________________________________
Get Amount of Money Lost and Won
__________________________________________

'''

@app.route('/getMoney', methods=['POST'])
@cross_origin()
def getMoney():
    driver_id = request.get_json("id")
    driver_id = int(driver_id["id"])
    driver_profile = data.loc[(data['challenger'] == driver_id) | (data['opponent'] == driver_id)]
    driver_money_won = driver_profile[['race_driven','money']].loc[(driver_profile['winner']==driver_id)]
    driver_money_won.race_driven = pd.to_datetime(driver_profile.race_driven)
    driver_money_won = driver_money_won.groupby(pd.Grouper(key='race_driven', freq = '1M')).sum()
    driver_money_won.index = driver_money_won.index.strftime('%B-%Y')
    driver_money_lost = driver_profile[['race_driven','money']].loc[(driver_profile['winner']!=driver_id)]
    driver_money_lost.race_driven = pd.to_datetime(driver_profile.race_driven)
    driver_money_lost = driver_money_lost.groupby(pd.Grouper(key='race_driven', freq = '1M')).sum()
    driver_money_lost.index = driver_money_lost.index.strftime('%B-%Y')
    driver_money_total = driver_money_won
    driver_money_total['Verlorenes_Geld'] = driver_money_lost
    return_list= []
    return_list = []
    driver_money_total.fillna(0, inplace=True)
    for index, row in driver_money_total.iterrows():
        return_list.append({'Monat':index, 'Gewonnenes_Geld': int(row['money']), 'Verlorenes_Geld':int(row['Verlorenes_Geld'])})
    return json.dumps(return_list)

@app.route('/getMostWins', methods=['GET'])
@cross_origin()
def getMostWins():
    wins = data.groupby(['winner']).size().reset_index(name='Anzahl_Siege').sort_values(by ='Anzahl_Siege', ascending = False).head(3) 
    return_json=[]
    for index, row in wins.iterrows():
        return_json.append({'sieger':int(row['winner']), 'Wert':int(row['Anzahl_Siege'])})
    return json.dumps(return_json)

@app.route('/getMostTracks', methods=['GET'])
@cross_origin()
def getMostTracks():
    wins = data.groupby(['track_id']).size().reset_index(name='Strecke_befahren').sort_values(by ='Strecke_befahren', ascending = False).head(3) 
    return_json=[]
    for index, row in wins.iterrows():
        return_json.append({'sieger':int(row['track_id']), 'Wert':int(row['Strecke_befahren'])})
    return json.dumps(return_json)

'''
__________________________________________
Get Predictions based on Driver Matchup rates and General Winrate
__________________________________________

'''

@app.route('/getPrediction', methods= ['POST'])
@cross_origin()
def getPrediction ():

    driver_id1 = request.get_json("id1")
    driver_id1 = int(driver_id1["id1"])
    driver_id2 = request.get_json("id2")
    driver_id2 = int(driver_id2["id2"])
    
    '''Festlegung der Gewichtungen'''
    TeilGegner = 0.7
    TeilRate = 0.3

    '''Berechnung der Gewinnchance gegen spezifischen Gegner'''
    driver_profile = data.loc[(data['challenger'] == driver_id1) & (data['opponent'] == driver_id2) | (data['opponent'] == driver_id1) & (data['challenger'] == driver_id2)  ]
    liste = driver_profile.groupby(['winner']).size().reset_index(name='Gewonnen')
    liste = liste.values.tolist()
    if driver_id1 > driver_id2:
        if len(liste) == 2:
            liste = [liste[1], liste[0]]
        else:
            liste = [[driver_id2,0],[driver_id1,0]]
    Ergebnis = []
    if liste:
        try:
            Ergebnis.append({str(liste[0][0]): liste[0][1]/(liste[0][1]+ liste[1][1])})
            Ergebnis.append({str(liste[1][0]): liste[1][1]/(liste[1][1]+ liste[0][1])})
        except:
            Ergebnis.append({str(driver_id1):0.5})
            Ergebnis.append({str(driver_id2):0.5})

    else:
            Ergebnis.append({str(driver_id1):0.5})
            Ergebnis.append({str(driver_id2):0.5})
    TeilGegner = (TeilGegner * Ergebnis[0][ str(driver_id1)])

    '''Berechnung der Allgemeinen Gewinnchance'''
        
    driver_profile1 = data.loc[(data['challenger'] == driver_id1) | (data['opponent'] == driver_id1)]
    driver_profile2 = data.loc[(data['challenger'] == driver_id2) | (data['opponent'] == driver_id2)]
    wins1 = len(driver_profile1.loc[(driver_profile1['winner'] == driver_id1)])
    defeats1 = len(driver_profile1.loc[(driver_profile1['winner'] != driver_id1)])
    games1 = wins1 + defeats1
    wins2 = len(driver_profile2.loc[(driver_profile2['winner'] == driver_id2)])
    defeats2 = len(driver_profile2.loc[(driver_profile2['winner'] != driver_id2)])
    games2 = wins2 + defeats2
    if games1 > 10:
        rate1 = wins1/(wins1+ defeats1)
    else: 
        rate1 = 0.5
    if games2 > 10:
        rate2 = wins2/(wins2+ defeats2)
    else: 
        rate2 = 0.5
    if rate1 > rate2:
        rateTotal1 = 0.5 * 1.0069** (rate1*100-rate2*100)
    else:
        rateTotal1 = 1-(0.5 * 1.0069** (rate2*100-rate1*100))
    TeilRate = rateTotal1 * TeilRate
    TeilRate = round(TeilRate,2)

    '''Berechnung des Gesamtergebnisses'''

    Gesamt = (TeilGegner + TeilRate)
    Gesamt = round(Gesamt, 2)
    return json.dumps([{'Name':'Fahrer','Gegen_Gegner': Ergebnis[0][str(driver_id1)], 'Value':Gesamt,'Gewinnrate1': rate1, 'color':'#90EE90'}, { 'Name':'Gegner','Value':(1-Gesamt),'Gegen_Gegner': (1-Ergebnis[0][str(driver_id1)]), 'Gewinnrate1':rate2, 'color':'#FF7F7F'},{'Fahrer':'Fahrer', 'Gewinnrate_Fahrer':rate1,'Gewinnrate_Gegner': rate2}])
    