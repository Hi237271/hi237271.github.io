let week = get_week();
let roster_promise = loadJSONData('new_full_roster.json')
let all_scores_promise = loadJSONData("all_player_scores.json")
let all_scores = null;
let stats_promise = loadJSONData(`week${week}.json`)
let stats = null;
let week_data_promise = loadWeekData();
let current_login = '';
let current_password = '';
let trades = null;
let draft_priority_promise = loadJSONData('draft_priority.json')
let check = `<div class = 'trade-team-icon-container trade-always-white always-check'>
                                <svg class = 'always-check' viewBox="0 0 1920 1920">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1827.701 303.065 698.835 1431.801 92.299 825.266 0 917.564 698.835 1616.4 1919.869 395.234z" fill-rule="evenodd"></path> </g>
                                </svg>
                            </div>`
let cross = `
            <div class = 'trade-team-icon-container trade-always-white always-cross'>
                        <svg class = 'svg-cross' viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="4"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-width = '4' stroke-linecap="round" stroke-linejoin="round"></g>
                            <g> <path stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z" ></path> </g>
                        </svg>
                    </div>`
let time = `<div class = 'trade-team-icon-container always-time'>
                        <svg class = 'time-mark' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g class="time-path-container"> 
                                <path d="M12 8V12L15 15" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> 
                                <circle cx="12" cy="12" r="9" stroke="#000000" stroke-width="2"></circle> 
                            </g>
                        </svg>	
            </div>`
async function loadWeekData(){ 
    let week_data = []
    for(let i = 1; i<=week; i++){
            a = await loadJSONData(`week${i}.json`)
            if(!a) {
                console.log(`Error: couldn't find data for week ${i}`)
                return week_data
            }
            else {
                week_data.push(a);
            }
    }
    return week_data
}
async function loadJSONData(file) {
    try {
        const response = await fetch(`json/${file}`,{
                cache: 'no-store'
            });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 2. Parse the response into a JavaScript object/array
        const data = await response.json();
        return data;
    } catch (err) {
        return false;
        console.log(`Couldn't load data from ${file}`);
    }
}
function showSection(section) {
    sections = Array.from(document.querySelectorAll("section"));
    sections.forEach((sec) => {
        sec.classList.remove("active");
    });
    links = Array.from(document.querySelectorAll("div.navbar-inner a"));
    links.forEach((link) => {
        link.classList.remove("active");
    });
    let sec = document.querySelector(`section#${section}`);
    sec.classList.add("active");
    let link = document.querySelector(`.a-${section}`);
    link.classList.add("active");
}
function request_player(player){
    let player_element = document.querySelector(`[player="${player}"]`)
    document.querySelector('#request-player-container').innerHTML=player_element.outerHTML;

    let player_input = document.querySelector('input#request-player-input')
    player_input.value = player;
}
function get_week() {
    const start = new Date("2026-09-08");
    let now = new Date();
    return (
        Math.floor(
            (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7),
        ) + 1
    );
}
function promise_error(error){
    console.log(`An error occured: ${error}`)
}
document.addEventListener("DOMContentLoaded", async () => {
    let roster = await roster_promise;
    let team_scores = {
        "Maye Drake Good": [0,0,0],
        "Mmm... Food": [0,0,0],
        "Washable Markers": [0,0,0],
        "McPicklePounders": [0,0,0],
        "Laser Llamas": [0,0,0],
        "Adebayo FC": [0,0,0],
        "Make Draye": [0,0,0],
        "LJSSNC": [0,0,0],
        "Bad Piggies": [0,0,0],
        "Rumble Bees": [0,0,0]
    }
    let matchups = [
        [
            [1, 10],
            [2, 9],
            [3, 8],
            [4, 7],
            [5, 6],
        ],
        [
            [1, 9],
            [2, 7],
            [3, 6],
            [4, 5],
            [8, 10],
        ],
        [
            [1, 8],
            [2, 5],
            [3, 4],
            [6, 10],
            [9, 7],
        ],
        [
            [1, 7],
            [2, 3],
            [4, 10],
            [5, 9],
            [8, 6],
        ],
        [
            [1, 6],
            [2, 10],
            [3, 9],
            [4, 8],
            [5, 7],
        ],
        [
            [1, 5],
            [2, 8],
            [3, 7],
            [4, 6],
            [9, 10],
        ],
        [
            [1, 4],
            [2, 6],
            [3, 5],
            [8, 9],
            [10, 7],
        ],
        [
            [1, 3],
            [2, 4],
            [3, 1],
            [4, 2],
            [5, 10],
        ],
        [
            [1, 2],
            [3, 10],
            [4, 9],
            [5, 8],
            [6, 7],
        ],
    ];
    stats = await stats_promise;
    var lineups = await loadJSONData("serialized_lineups.json");
    //console.log(stats)
    function render_table(player_stats){
        table = document.querySelector("table.player-table");
        var teams = Object.keys(player_stats);
        for (let i = 0; i < teams.length; i++) {
            let players = Object.keys(player_stats[teams[i]])
            rows = Array.from(document.querySelectorAll("div.table-cell"));
            for (let j = 0; j < players.length; j++) {
                let a = players[j];
                elt = rows[10 * j + i];
                elt.innerHTML='';
                elt.innerText = players[j];
                let b = player_stats[teams[i]][a]['position'];
                if (b == "DE") {
                    b = "DEF";
                }
                let player_name = players[j];
                const textDiv = document.createElement("div");
                const textSpan = document.createElement("span");
                textSpan.innerText = `${player_stats[teams[i]][player_name]["score"].toFixed(2)} pts`;
                textSpan.classList.add("score-box");
                textDiv.classList.add("player-info-container");

                const newDiv = document.createElement("div");
                newDiv.classList.add(b);
                newDiv.innerText = b;

                textDiv.appendChild(newDiv);
                textDiv.appendChild(textSpan);

                elt.appendChild(textDiv);
            }
        }
    }
    render_table(stats);
    let week_select = document.querySelector('select#draft-week-select')
    for(let i = 1; i<week; i++){
        week_select.innerHTML+=`
        <option value = "${i}">Week ${i}</option>
        `
    }
    week_select.innerHTML+=`<option value = "${week}" selected> Week ${week}</option>`
    document.querySelector('select#draft-week-select').addEventListener('change', function (event){
        let render_week = event.target.value;
        console.log(week_data)
        render_table(week_data[render_week-1])
        console.log('value changed')
    })
    document.querySelector('#current-week').innerHTML = week;

    function log_all_players() {
        all_players_list = [];
        for (const team of teams) {
            for (const player of roster[team]) {
                all_players_list.push(player);
            }
        }
        return all_players_list
    }
    // const tr = document.createElement('tr')
    // headers = ['Player','Team','Position','Score']
    // for(let i = 0; i<headers.length;i++){
    // 	const th = document.createElement('th')
    // 	th.innerText = headers[i]
    // 	th.classList.add("player-table-header")
    // 	tr.appendChild(th)
    // }
    // table.appendChild(tr)
    //Generate list of players and their stats
    data = [];
    teams = Object.keys(stats);
    for (let i = 0; i < teams.length; i++) {
        players = Object.keys(stats[teams[i]]);
        for (let j = 0; j < players.length; j++) {
            player_data = stats[teams[i]][players[j]];
            data.push({
                name: players[j],
                score: player_data["score"],
                team: player_data["team"],
                position: player_data["position"],
            });
        }
    }
    data.sort((a, b) => {
        return b["score"] - a["score"];
    });
    function get_team_score(team, statistics) {
        let team_roster = Array.from(Object.keys(statistics[team])).filter(
            (val) => {
                return Object.values(lineups[team]).includes(val);
            },
        );
        // console.log(team)
        // console.log(team_roster)
        sum = 0;
        for (let i = 0; i < team_roster.length; i++) {
            sum += statistics[team][team_roster[i]]["score"];
        }
        return sum;
    }

    //Populate win record
    let week_data = await week_data_promise;
    for(let j = 1; j < week; j++){
        for(let i = 0; i< matchups[j-1].length; i++){
            
            matchup = matchups[j-1][i]
            team_one = teams[matchup[0] - 1];
            team_two = teams[matchup[1] - 1];
            if (get_team_score(team_one, week_data[j-1]) < get_team_score(team_two, week_data[j-1])) {
                swp = team_one;
                team_one = team_two;
                team_two = swp;
            }
            else if(get_team_score(team_one, week_data[j-1]) == get_team_score(team_two, week_data[j-1])) {
                team_scores[team_one][1]+=1
                team_scores[team_two][1]+=1
                continue
            }
            team_scores[team_one][0]+=1
            team_scores[team_two][2]+=1
        }
    }
    //Compute team score and add matchups
    console.log(`week: ${week}`);
    let matchup_container = document.querySelector("div.matchup-container");
    for(let j = week; j>0; j--){
        let week_matchup_container = document.createElement('div')
        week_matchup_container.classList.add('week-matchup-container')
        for (let i = 0; i < matchups[j - 1].length; i++) {
            var stat_var = []
            if (j==week){
                stat_var = stats
            }
            else {
                stat_var = week_data[j - 1]
            }
            matchup = matchups[j - 1][i];
            team_one = teams[matchup[0] - 1];
            team_two = teams[matchup[1] - 1];
            if (get_team_score(team_one, stat_var) < get_team_score(team_two, stat_var)) {
                swp = team_one;
                team_one = team_two;
                team_two = swp;
            }
            week_matchup_container.innerHTML += `
                <div class = "matchup">
                    <div class = 'week-num'>Week ${j}</div>
                    <div class = 'team-one'>
                        <span class = 'team'>${team_one}</span>
                        <span class = "win-record">${team_scores[team_one][0]}W  ${team_scores[team_one][1]}D ${team_scores[team_one][2]}L</span>
                        <span class = "num">${get_team_score(team_one, stat_var).toFixed(2)}</span>
                    </div>
                    <span class = 'vs'>VS</span>
                    <div class = "team-two">
                        <span class = 'team'>${team_two}</span>
                        <span class = "win-record">${team_scores[team_two][0]}W ${team_scores[team_two][1]}D ${team_scores[team_two][2]}L</span>
                        <span class = "num">${get_team_score(team_two, stat_var).toFixed(2)}</span>
                    </div>
                </div>`;
        }
        matchup_container.appendChild(week_matchup_container)
    }
    leader_node = document.querySelector(".leader-num");
    teams = teams.sort((a, b) => {
        return get_team_score(b, stats) - get_team_score(a, stats);
    });
    leader_node.innerText = teams[0];
    score_node = document.querySelector(".score-to-beat");
    score_node.innerText = get_team_score(teams[0], stats).toFixed(2);

    //Add lineup submission form
    lineup = document.querySelector(".lineup-player-container");
    positions_str = [
        "QB",
        "RB",
        "RB",
        "WR",
        "WR",
        "TE",
        "Flex",
        "DST",
        "Kicker",
    ];
    positions = ["QB", "RB", "RB", "WR", "WR", "TE", "Flex", "DE", "K"];
    for (let i = 0; i < positions.length; i++) {
        lineup.innerHTML += `
            <div position = '${positions[i]}' class = 'form-position form-${positions[i]}'>
                <span>${positions_str[i]}</span>
                <select name = '${positions[i]}${i-positions.indexOf(positions[i])+1}' class = 'select-position form-${positions[i]}'>
                    
                </select>
            </div>
        `;
    }

    //Add Waiver wire picks
    async function load_waiver_scores(){
        function render_player(player_obj){
            player_draft = document.querySelector('.player-draft')
            player = player_obj['player']
            position = player.slice(-2, player.length).trim()
            player_name = player.slice(0,-2).trim()
            player_draft.innerHTML += `
                <div player = "${player_obj['player']}" class = 'player-waiver-container'>
                    <div class = 'waiver-data-container'>
                        <div class = 'waiver-data-div'>
                            <span class = 'waiver-header'>Name</span>
                            <span class = 'waiver-data'>${player_name}</span>
                        </div>
                        <div class = 'waiver-data-value'>
                            <span class = 'waiver-header'>Position</span>
                            <span class = 'waiver-data'>${position}</span>
                        </div>
                        <div class = 'waiver-data-div'>
                            <span class = 'waiver-header'> Latest Score </span>
                            <span class = 'waiver-data'>${player_obj['score'].toFixed(2)}</span>

                        </div>
                        <div class = 'waiver-data-value'>
                            <span class = 'waiver-header'> Average Score</span>
                            <span class = 'waiver-data'>${player_obj['average'].toFixed(2)}</span>
                        </div>
                        <button class = 'waiver-submission' onclick = "request_player('${player_obj['player']}')">Request</button>
                    </div>
                </div>
            `
        }
        all_scores = await all_scores_promise;
        let all_players = log_all_players()
        let new_scores = all_scores.filter((val)=>{
            return !all_players.includes(val['player'])
        })
        new_scores=new_scores.sort((a,b)=>{
            avg_diff = b['average']-a['average']
            if(Math.abs(avg_diff)<0.02){
                return b['score']-a['score']
            }
            else {
                return avg_diff
            }
        })

        player_draft = document.querySelector('.player-draft')
        for(let i = 0; i<30; i++) {
            player_obj = new_scores[i]
            render_player(player_obj)
        }
        document.querySelector('input#waiver-search').addEventListener('input',(event)=>{
            let query = event.target.value;
            if (query == ''){
                document.querySelector('.player-draft').innerHTML = '';
                for(let i = 0; i<30; i++){
                    render_player(new_scores[i])
                }
                return;
            }
        document.querySelector('.player-draft').innerHTML = '';
            console.log(query)
            let tmp_scores = new_scores.filter((val)=>{
                return val['player'].toLowerCase().startsWith(query)
            })
            if (tmp_scores.length>40){
                tmp_scores = tmp_scores.slice(0,40)
            }
            for(const player of tmp_scores){
                render_player(player)
            }
        })
        //Load draft priority
        let draft_priority = await draft_priority_promise;
        console.log(draft_priority)
        let teams = Object.keys(roster)
        let priority_container = document.querySelector('#draft-priority-container')
        for(let i = 0; i<draft_priority.length; i++){
            team = teams[draft_priority[i]]
            priority_container.innerHTML += `
                <tr>    
                    <td class = 'player-table-data'>${i+1}</td>
                    <td class = 'player-table-data'>${teams[draft_priority[i]]}</td>
                </tr>
            `
        }
        
    }
    setTimeout(load_waiver_scores,0)
    document.querySelector('#waiver-select-team').addEventListener('change', (e)=>{
        let team = event.target.value;
        let selected_players = roster[team]
        player_drop = document.querySelector('#drop-player-select')
        player_drop.innerHTML = "";
        for(let i = 0; i<selected_players.length; i++){
            player_drop.innerHTML += `<option value = "${selected_players[i]}">${selected_players[i]}</option>`
        }
    })
    document.querySelector("#team-name").addEventListener("change", (e) => {
        document.querySelector("#error-field").innerHTML = "";
        selected_team = event.target.value;
        selected_players = roster[selected_team];
        elts = document.querySelectorAll(".form-position");
        used_players = [];
        for (let i = 0; i < elts.length; i++) {
            elt = elts[i];
            position = elt.getAttribute("position");
            valid_players = selected_players.filter((e) => {
                val = e.slice(-2, e.length).trim();
                if (position == "Flex") {
                    return (
                        (val == "WR" || val == "RB") && !used_players.includes(e)
                    );
                }
                return val == position && !used_players.includes(e);
            });
            let dropdown = elt.children[1];
            dropdown.innerHTML = "";
            for (player of valid_players) {
                dropdown.innerHTML += `<option value="${player.slice(0, -2)}">${player.slice(0, -2)}</option>`;
            }
            dropdown.value = valid_players[0].slice(0, -2);
            used_players.push(valid_players[0]);
        }
    });
    function populate_players(e, elt) {
        selected_team = e.target.value;
        selected_players = roster[selected_team];

        elt.innerHTML = "";
        for (const player of selected_players) {
            elt.innerHTML += `<option value="${player}">${player.slice(0, -2).trim()}</option>`;
        }
    }
    function get_all_player(name){
        let a = all_scores.filter((a)=>{
            return a['player'].trim()==name.trim()
        })
        if(a.length>0){
            return a[0];
        }
        return null;
    }
    document.querySelector('#create-trade-select-team').addEventListener('change', (e)=>{
        document.querySelector("#create-trade-error-desc").innerHTML = "";
        populate_players(e,document.querySelector('#offer-player-input'))

    })
    document.querySelector('#opposing-team-select').addEventListener('change', (e)=>{
        console.log(e.target.value);
        document.querySelector("#create-trade-error-desc").innerHTML = "";
        populate_players(e,document.querySelector('#trade-request-player-input'))
    })
    document.querySelector("form.lineup-form").addEventListener("submit", function (e) {
        e.preventDefault();
        document.querySelector("#error-field").innerHTML = "";
        document.querySelector('#success-field').hidden = true;
        const formData = new FormData(event.target);
        const dataObject = Object.fromEntries(formData.entries());
        console.log(dataObject);
        required_positions = [
            "RB1",
            "RB2",
            "WR1",
            "WR2",
            "Flex1",
            "QB1",
            "DE1",
            "K1",
            "TE1",
        ];
        used_players = [];
        function handleErrors() {
            if(!dataObject['team-name']){
                return 'Error: Team name is missing'
            }
            if(!dataObject['team-password']){
                return 'Error: Team password is missing'
            }
            try {
                for (const position of required_positions) {
                    player = dataObject[position].trim();
                    if (used_players.includes(player)) {
                        return `Error: Player ${player} was used more than once`;
                    }
                    if (position != "Flex1") {
                        if (
                            !roster[dataObject["team-name"]].includes(
                                player + " " + position.slice(0, -1),
                            )
                        ) {
                            return `Error: Player ${player} is not of position ${position}`;
                        }
                    }
                    used_players.push(player);
                }
            } catch (error) {
                return "At least one field is missing";
            }
            return false;
        }
        a = handleErrors();
        if (a) {
            document.querySelector("#error-field").innerHTML = a;
            return;
        }
        const url = "https://sportstatistics.mbhs.edu/submit";
        console.log({
            method: "POST", 
            body: formData,
        });
        fetch(url, {
            method: "POST", 
            body: formData,
        }).then((res)=>{
            return res.json()
        },promise_error).then(
            (body)=>{
                if(!body['success']){
                    document.querySelector('#error-field').innerHTML = `${body['message']}`
                }
                else {
                    document.querySelector('#success-field').hidden = false;
                }
            },
            promise_error
        );
    });


    document.querySelector('form#waiver-form').addEventListener('submit', function (e) {
        e.preventDefault();
        document.querySelector('.waiver-success-desc').hidden = true;
        document.querySelector('.waiver-error-desc').innerHTML = ''
        const formData = new FormData(event.target);
        const dataObject = Object.fromEntries(formData.entries());
        console.log(dataObject);
        fields = ['team-name','drop','request','team-password']
        function handleErrors(){ 
            for(const field of fields) {
                if (!dataObject[field]){
                    return `Field ${field} is empty`
                }
            }
            return false;
        }
        a = handleErrors()
        if (a) {
            document.querySelector('.waiver-error-desc').innerHTML = `Error: ${a}`
            return;
        }
        const url = "https://sportstatistics.mbhs.edu/submit" //"http://52.87.225.110:3000/submit";
        console.log({
            method: "POST", 
            body: formData,
        });
        fetch(url, {
            method: "POST", 
            body: formData,
        }).then((res)=>{
            return res.json()
        },promise_error).then(
            (body)=>{
                if(!body['success']){
                    document.querySelector('.waiver-error-desc').innerHTML = `${body['message']}`
                }
                else {
                    document.querySelector('.waiver-success-desc').hidden = false;
                }
            },
            promise_error
        );
    })
    document.querySelector('form#coordinator-password-form').addEventListener('submit', async function (e){
                e.preventDefault();
                document.querySelector('#coordinator-success-field').hidden = true;
                document.querySelector('#coordinator-error-field').innerHTML = '';
                const formData = new FormData(event.target);
                const dataObject = Object.fromEntries(formData.entries());
                console.log('Form submission received')
                let body = null
                try{
                    let res = await fetch("https://sportstatistics.mbhs.edu/coordinator",{
                        method: "POST",
                        body: formData
                    })
                    body = await res.json();
                    console.log(body);
                }
                catch(err){
                    console.log('Error')
                    console.log(err)
                    document.querySelector('#coordinator-error-field').innerHTML = "Couldn't reach server";
                    return;
                }
                if(!body){
                    document.querySelector('#coordinator-error-field').innerHTML = 'An error occurred'
                    return;
                }
                if(!body['success']){
                    document.querySelector('#coordinator-error-field').innerHTML = body['message']
                    return;
                }
                else {
                    //Display lineups for coordinator
                    //data-receive
                    let section_container = document.querySelector('#coordinator-section-container')
                    section_container.hidden = false;
                    let data_container = document.querySelector('#coordinator-data-container');
                    data_container.innerHTML = ``;
                    document.querySelector('.coordinator-password').hidden = true;	

                    const lineups = body['lineups']
                    const 	required_positions = [
                        "RB1",
                        "RB2",
                        "WR1",
                        "WR2",
                        "Flex1",
                        "QB1",
                        "DE1",
                        "K1",
                        "TE1",
                    ];
                    let teams = Object.keys(roster)	
                    for(let i = 0; i<teams.length; i++){
                        const coordinator_player_data = document.createElement('div');
                        coordinator_player_data.classList.add('coordinator-player-data')
                        coordinator_player_data.innerHTML+=`<h1 class = 'small-title'>${teams[i]}</h1>`
                        const table = document.createElement('table');
                        table.classList.add('coordinator-table')
                        table.innerHTML+=`<thead>
                                                <th class = 'player-table-header left'>Position</th>
                                                <th class = 'player-table-header right'>Player</th>
                                            </thead>`
                        const tbody = document.createElement('tbody');
                        var current_lineup = lineups[teams[i]]
                        for(let i = 0; i < required_positions.length; i++) {
                            let current_player = '???'
                            if (Object.keys(current_lineup).length>7) {
                                current_player = current_lineup[required_positions[i]]
                            }
                            tbody.innerHTML+=`
                            <tr>
                                <td class = 'coordinator-table-data'>${required_positions[i]}</td>
                                <td class = 'coordinator-table-data'>${current_player}</td>
                            </tr>`
                        }
                        table.appendChild(tbody)

                        coordinator_player_data.appendChild(table)
                        data_container.appendChild(coordinator_player_data)
                        if(current_lineup['date']){
                            coordinator_player_data.innerHTML+=`<span>Submitted at ${current_lineup['date']}</span>`
                        }
                        else {
                            coordinator_player_data.innerHTML+=`<span>Submission date unknown</span>`
                        }
                    }	
                }


        })
        document.querySelector('form#create-trade-form').addEventListener('submit',async (e)=>{
            e.preventDefault();
            document.querySelector('#create-trade-success-desc').hidden = true;
            document.querySelector('#create-trade-error-desc').innerHTML = '';
            let error_field = document.querySelector('#create-trade-error-desc');
            const formData = new FormData(event.target);
            const dataObject = Object.fromEntries(formData.entries());
            console.log('Form submission received')
            let body = null
            try{
                let res = await fetch("https://sportstatistics.mbhs.edu/trade",{
                    method: "POST",
                    body: formData
                })
                body = await res.json();
                console.log(body);
            }
            catch(err){
                console.log('Error')
                console.log(err)
                error_field.innerHTML = "Couldn't reach server";
                return;
            }
            if(!body){
                error_field.innerHTML = 'An error occurred'
                return;
            }
            if(!body['success']){
                error_field.innerHTML = body['message']
                return;
            }
            else {
                document.querySelector('#create-trade-success-desc').hidden = false;
            }
        })
        //Get trades once password is put in
        document.querySelector('#trade-password-form').addEventListener('submit', async (e)=>{
            e.preventDefault();
            document.querySelector('#trade-success-field').hidden = true;
            document.querySelector('#trade-error-field').innerHTML = '';
            const formData = new FormData(e.target);
            const dataObject = Object.fromEntries(formData.entries());
            console.log('Form submission received')
            let body = null
            try{
                let res = await fetch("https://sportstatistics.mbhs.edu/trade",{
                    method: "POST",
                    body: formData
                })
                body = await res.json();
                console.log(body);
            }
            catch(err){
                console.log('Error')
                console.log(err)
                document.querySelector('#trade-error-field').innerHTML = "Couldn't reach server";
                return;
            }
            if(!body){
                document.querySelector('#trade-error-field').innerHTML = 'An error occurred'
                return;
            }
            if(!body['success']){
                document.querySelector('#trade-error-field').innerHTML = body['message']
                return;
            }
            //Populate trade menu
            current_login = dataObject['team-name']
            current_password = dataObject['team-password']
            document.querySelector('.trades-password').hidden = true;
            document.querySelector('#trade-container').hidden = false;
            trades = body['trades']
            let container = document.querySelector('div#all-trades')
            for (let i = 0; i< trades.length;i++) {
                trade = trades[i]
                console.log(stats[trade['team-name']])
                console.log(trade['offer'].trim())
                //Generate trade-teams
                let team_score_container = '';
                for(const team of Object.keys(roster)){
                    let icon = time
                    if (trade[team]=='approved'){
                        icon = check
                    }
                    else if (trade[team]=='denied'){
                        icon = cross
                    }
                    team_score_container+=`
                        <div class = 'trade-team'>
                            <span class = 'back-trade-team-name'>${team}</span>
                            ${icon}
                        </div>`
                }
                let trash = `<div></div>`
                if (current_login==trade['team-name']){
                    trash = `
                        <div class = 'trade-back-container' onclick = "event.stopPropagation(); handle_destruction_trigger(${i})">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
                                <g style="stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                    <path d="M 64.71 90 H 25.291 c -4.693 0 -8.584 -3.67 -8.859 -8.355 l -3.928 -67.088 c -0.048 -0.825 0.246 -1.633 0.812 -2.234 c 0.567 -0.601 1.356 -0.941 2.183 -0.941 h 59.002 c 0.826 0 1.615 0.341 2.183 0.941 c 0.566 0.601 0.86 1.409 0.813 2.234 l -3.928 67.089 C 73.294 86.33 69.403 90 64.71 90 z M 18.679 17.381 l 3.743 63.913 C 22.51 82.812 23.771 84 25.291 84 H 64.71 c 1.52 0 2.779 -1.188 2.868 -2.705 l 3.742 -63.914 H 18.679 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10;  fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                                    <path d="M 80.696 17.381 H 9.304 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 71.393 c 1.657 0 3 1.343 3 3 S 82.354 17.381 80.696 17.381 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10;  fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                                    <path d="M 58.729 17.381 H 31.271 c -1.657 0 -3 -1.343 -3 -3 V 8.789 C 28.271 3.943 32.214 0 37.061 0 h 15.879 c 4.847 0 8.789 3.943 8.789 8.789 v 5.592 C 61.729 16.038 60.386 17.381 58.729 17.381 z M 34.271 11.381 h 21.457 V 8.789 C 55.729 7.251 54.478 6 52.939 6 H 37.061 c -1.538 0 -2.789 1.251 -2.789 2.789 V 11.381 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10;  fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                                    <path d="M 58.33 74.991 c -0.06 0 -0.118 -0.002 -0.179 -0.005 c -1.653 -0.097 -2.916 -1.517 -2.819 -3.171 l 2.474 -42.244 c 0.097 -1.655 1.508 -2.933 3.171 -2.819 c 1.653 0.097 2.916 1.516 2.819 3.17 l -2.474 42.245 C 61.229 73.761 59.906 74.991 58.33 74.991 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10;  fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                                    <path d="M 31.669 74.991 c -1.577 0 -2.898 -1.23 -2.992 -2.824 l -2.473 -42.245 c -0.097 -1.654 1.165 -3.073 2.819 -3.17 c 1.646 -0.111 3.073 1.165 3.17 2.819 l 2.473 42.244 c 0.097 1.654 -1.165 3.074 -2.819 3.171 C 31.788 74.989 31.729 74.991 31.669 74.991 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10;  fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                                    <path d="M 45 74.991 c -1.657 0 -3 -1.343 -3 -3 V 29.747 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 v 42.244 C 48 73.648 46.657 74.991 45 74.991 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10;  fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
                                </g>
                            </svg>								
                        </div>`
                }
                container.innerHTML+=a = ` 
                    <div class = 'trade'>
                        <div class = 'trade-inner' onclick = 'handle_trade_click(this)'>
                            <div class = 'trade-front'>
                                <div class = 'trade-header'>
                                    <!-- Delete trade -->
                                    ${trash}
                                    <span class = 'trade-offer'>TRADE OFFER</span>

                                    <span class = 'trade-week-num'>WEEK ${week}</span>
                                </div>
                                <div class = 'trade-body'>
                                    <span class = 'trade-team-name'>
                                        ${trade['team-name']}
                                    </span>
                                    <div class = 'player-body'>
                                        <span class = 'offers-span'>Offers</span>
                                        <div class = 'trade-data-val'>
                                            <span class = 'waiver-header'>Name</span>
                                            <span class = 'trade-data'>${trade['offer'].slice(0,-2).trim()}</span>
                                        </div>
                                        <div class = 'trade-data-val'>
                                            <span class = 'waiver-header'>Position</span>
                                            <span class = 'trade-data'>${trade['offer'].slice(-2,trade['offer'].length).trim()}</span>
                                        </div>
                                        <div class = 'trade-data-val'>
                                            <span class = 'waiver-header'> Latest Score </span>
                                            <span class = 'trade-data'>${stats[trade['team-name']][trade['offer'].slice(0,-2).trim()]['score'].toFixed(2)}</span>
                                        </div>
                                        <div class = 'trade-data-val'>
                                            <span class = 'waiver-header'> Average Score</span>
                                            <span class = 'trade-data'>${get_all_player(trade['offer'])['average'].toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <span class = 'trade-team-name'>
                                        ${trade['opposing-team']}
                                    </span>
                                    <div class = 'player-body'>
                                        <span class = 'offers-span'>Offers</span>
                                        <div class = 'trade-data-val'>
                                            <span class = 'waiver-header'>Name</span>
                                            <span class = 'trade-data'>${trade['request'].slice(0,-2).trim()}</span>
                                        </div>
                                        <div class = 'trade-data-val'>
                                            <span class = 'waiver-header'>Position</span>
                                            <span class = 'trade-data'>${trade['request'].slice(-2,trade['request'].length).trim()}</span>
                                        </div>
                                        <div class = 'trade-data-val'>
                                            <span class = 'waiver-header'> Latest Score </span>
                                            <span class = 'trade-data'>${stats[trade['opposing-team']][trade['request'].slice(0,-2).trim()]['score'].toFixed(2)}</span>
                                        </div>
                                        <div class = 'trade-data-val'>
                                            <span class = 'waiver-header'> Average Score</span>
                                            <span class = 'trade-data'>${get_all_player(trade['request'])['average'].toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class = 'trade-footer'>
                                    <!-- Check mark -->
                                    <div class = 'trade-icon-container check trade-white' onclick = "event.stopPropagation(); handle_trade_trigger(${i},'approved')">
                                        <svg class = 'check-mark' viewBox="0 0 1920 1920">
                                            <!-- <rect class="check-bg" width="100%" height="100%" /> -->
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1827.701 303.065 698.835 1431.801 92.299 825.266 0 917.564 698.835 1616.4 1919.869 395.234z" fill-rule="evenodd"></path> </g>
                                        </svg>
                                    </div>
                                    <!-- Time symbol -->
                                    <div class = 'trade-icon-container time' onclick = "event.stopPropagation(); handle_trade_trigger(${i},'pending')">
                                        <svg class = 'time-mark' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g class="time-path-container"> 
                                                <path d="M12 8V12L15 15" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> 
                                                <circle cx="12" cy="12" r="9" stroke="#000000" stroke-width="2"></circle> 
                                            </g>
                                        </svg>					
                                    </div>
                                    <!-- Cross symbol -->
                                    <div class = 'trade-icon-container trade-white cross' onclick = "event.stopPropagation(); handle_trade_trigger(${i},'denied')">
                                        <svg class = 'svg-cross' viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" stroke-width="4"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-width = '4' stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g> <path stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M202.82861,197.17188a3.99991,3.99991,0,1,1-5.65722,5.65624L128,133.65723,58.82861,202.82812a3.99991,3.99991,0,0,1-5.65722-5.65624L122.343,128,53.17139,58.82812a3.99991,3.99991,0,0,1,5.65722-5.65624L128,122.34277l69.17139-69.17089a3.99991,3.99991,0,0,1,5.65722,5.65624L133.657,128Z" ></path> </g>
                                        </svg>						
                                    </div>
                                </div>
                            </div>
                            <div class = 'trade-back'>
                                <div class = 'trade-team-container'>
                                    ${team_score_container}
                                </div>
                                
                            </div>
                        </div>
                    </div>`
            }
        })
});
function handle_trade_click(elt){
    if(elt.classList.contains('trade-rotate')){
        elt.classList.remove('trade-rotate')
    }
    else {
        elt.classList.add('trade-rotate');
    }
    elt.addEventListener('transitionend',()=>{
        console.log('Animation completed')
    }, {once: true})
}
async function handle_trade_trigger(index, state){
    let req = {}
    req['type']='trade_state'
    req['team-name']=current_login;
    req['team-password'] = current_password;
    req['index']=index;
    req['state']=state
    let body = null
    try {
        res = await fetch("https://sportstatistics.mbhs.edu/trade", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(req)
        });
        body = await res.json()
        console.log(body);
    }
    catch (err){
        console.log(err);
        return;
    }
    if(!body){
        console.log('Server couldn\'t be found')
        return;
    }
    if(body['success']){
        console.log('Success!')
        let elt = Array.from(document.querySelectorAll('div.trade')[index].querySelectorAll('.back-trade-team-name')).filter((a)=>{
                return a.innerHTML.trim()==req['team-name'].trim()
            })[0].parentElement.children[1]
        
        if(req['state']=='approved'){
            elt.outerHTML = check;
        }
        else if (req['state']=='pending'){
            elt.outerHTML = time;
        }
        else if (req['state']=='denied'){
            elt.outerHTML=cross;
        }
    }
}
async function handle_destruction_trigger(index) {
    if (trades[index]['team-name']!=current_login) {
        //Handle error
        return;
    }
    req = {}
    req['type'] = 'trade_destroy';
    req['index'] = index
    req['team-name']= current_login
    req['team-password'] = current_password;
    try {
        res = await fetch("https://sportstatistics.mbhs.edu/trade", {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(req)
        });
        body = await res.json()
        console.log(body);
    }
    catch (err){
        console.log(err);
        return;
    }
    if(!body){
        console.log('Server couldn\'t be found')
        return;
    }
    if(body['success']){
        console.log('Success!')
        document.querySelector('#all-trades').children[index].remove()
    }

}