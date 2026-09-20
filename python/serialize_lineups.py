import json
lineups = {}
with open('../json/lineups.json', 'r') as file:
    lineups = json.load(file)
new_lineups = {}
positions = ['RB1', 'RB2', 'WR1', 'WR2', 'Flex1', 'QB1', 'DE1', 'K1', 'TE1']
for team in lineups.keys():
    vals = lineups[team]
    players = []
    for position in positions:
        players.append(vals[position].strip())
    new_lineups[team] = players
with open('../json/serialized_lineups.json', 'w') as file:
    file.write(json.dumps(new_lineups))
