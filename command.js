const fetch = require('node-fetch');

async function run()
{
    let output = '';
    let response;
    let array = [];

    await fetch("https://api.tracker.gg/api/v2/rocket-league/standard/profile/psn/pekinama", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en"
        },
        "referrer": "https://rocketleague.tracker.network/rocket-league/live",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors"
      })
        .then((res) => {return res.json();})
        .then((json) => {response = json.data;});

    let x = 0;
    response.segments.forEach(stat =>{
        if (stat.type === "playlist")
        {
            array[x] = stat;
            x = x + 1;
        }
    });
    x = 0;

    let y = 0;
    array.forEach(a => {
        if (a.metadata.name !== "Un-Ranked")
        {
            if (y === 0)
                output = `${a.metadata.name}: ${a.stats.tier.metadata.name} ${a.stats.division.metadata.name} - ${a.stats.rating.value.toString()} || `;
            else
            output = output + `${a.metadata.name}: ${a.stats.tier.metadata.name} ${a.stats.division.metadata.name} - ${a.stats.rating.value.toString()} || `;

            y = y + 1;
        }
    });
    y = 0;

    return output;
}

run();