import nflreadpy as nfl
import pandas as pd
import numpy as np
import json
from datetime import date
# TODO need to check if df.iloc[-1] actually gets the most recent performance per player
# I think they do though


def get_week():
    start = date(2026, 9, 8)
    today = date.today()
    return (today-start).days//7+1


week = get_week()


def get_stats(
    player, player_stats): return player_stats[player_stats["player_display_name"] == player]


def get_teams():
    players = {}
    with open('new_half_roster.json', 'r') as file:
        players = json.load(file)
    return players
#     teams = list(players.keys())
#     for team in teams:
#         lineup = players[team].tolist()
#         print(f"Team: {team}")
#         print(lineup)
#         # print(players[team].to_string(name=False, dtype=False))
# # for player in players.loc[1:].itertuples(index = False):
# #     print(list(player))


def calculate_offensive_score(d):
    if d.shape[0] == 0:
        return 0
    # if d.shape[0] > 1:
    #    d = d.iloc[-1]
    # Pandas ints function as ints even if formatted oddly in tostring
    # data = data.iloc[0].tolist()
    # for i in range(100):
    #     print(data[int(input("enter index: "))])
    return d["def_safeties"]*4 + d["receptions"]+d["passing_yards"]/25+4*d["passing_tds"]-2*d["passing_interceptions"]+d["rushing_yards"]*0.1+d["rushing_tds"]*6+d["receiving_yards"]*0.1+6*d["receiving_tds"]+6*d["fumble_recovery_tds"]+6*d["special_teams_tds"]+2*d["passing_2pt_conversions"]+2*d["rushing_2pt_conversions"]+2*d['receiving_2pt_conversions']-2*d["fumbles_lost_total"]+d["pat_made"]+3*(d['fg_made_0_19']+d['fg_made_20_29']+d['fg_made_30_39']) + 4*d['fg_made_40_49'] + 5*d['fg_made_50_59']+5*d['fg_made_60_']-d['pat_missed']
    # TODO See if fumbles work and add "blocked kick" functionality


def calculate_defensive_score(d):
    return d["def_sacks"]+2*d["def_interceptions"]+2*d["def_fg_blocks"]+2*d["def_punt_blocks"]+6*d["special_teams_tds"]
    # TODO do i need to incorporate def_pat_blocks?
    # TODO need to add touchdown returns on kickoff for both offensive and defensive (nvm. I think special team tds does this.)


def calculate_team_score(team, schedule, team_stats):
    games = schedule[schedule["week"] == week]
    home_games = games[games["home_team"] == team]
    away_games = games[games["away_team"] == team]
    score = 0
    if home_games.shape[0] > 0:
        score += home_games["away_score"].values[0]
    elif away_games.shape[0] > 0:
        score += away_games["home_score"].values[0]
    else:
        print(f"Game not found for team {team}")
        return 0
    if np.isnan(score):
        return 0
    pts_conceded = (10 if score == 0
                    else 7 if score < 7
                    else 4 if score < 14
                    else 1 if score < 21
                    else 0 if score < 28
                    else -1 if score < 35
                    else -4)
    team_games = team_stats[team_stats['week'] == week]
    team_games = team_games[team_games['team'] == team]
    return pts_conceded + calculate_defensive_score(team_games)


def main():
    pd.set_option('display.max_columns', None)
    pd.set_option('display.float_format', '{:.2f}'.format)

    roster = nfl.load_rosters([2026]).to_pandas()
    stats = nfl.load_player_stats([2026]).to_pandas()
    schedule = nfl.load_schedules([2026]).to_pandas()
    team_statistics = nfl.load_team_stats([2026]).to_pandas()
    nfl_teams = schedule["away_team"].tolist()
    teams = get_teams()
    all_data = {}
    # stats.to_csv('player_data.csv', index=False)
    stats = stats[stats['week'] == week]
    for team in teams.keys():
        data = {}
        for player in teams[team]:
            score = 0
            if player in nfl_teams:
                score = calculate_team_score(player, schedule, team_statistics)
            else:
                score = calculate_offensive_score(get_stats(player, stats))
            position = roster[roster['full_name'] == player]['position'].to_string(
                index=False, dtype=False)

            if position.find('\n') != -1:
                position = position[:position.find('\n')]
            if position.strip() == "Series([], )":
                position = 'DEF'
            if isinstance(score, pd.Series):
                if len(score) == 0:
                    score = 0
                else:
                    score = score.iloc[-1]
            data[player] = {
                "score": score,
                "team": team,
                "position": position}
        all_data[team] = data
    with open(f"week{week}.json", 'w') as file:
        file.write(json.dumps(all_data))


main()
