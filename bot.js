const tmi = require('tmi.js');
const fetch = require('node-fetch');

const opts = {
    identity: {
        username: `RLRankBot`,
        password: `oauth:bwo0p50v00rjluyj5im12saurhsgz7`
    },
    channels: [
        `pekinama`,
        `xenomorphkai`
    ]
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

async function onMessageHandler(target, context, msg, self) {
    if (self) return;

    let args = msg.split(" ");
    let com = args[0];
    args.slice(1);

    if (target == "#xenomorphkai")
    {
        if (com === "!rank")
        {
            const response = await runXeno();
            client.say(target, response);
        }
        else
            return;
    }
    else
    {
        if (com == "!rank")
        {
            const response = await run();
            client.say(target, response);
        }
        else
            return;
    }
}

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

async function runXeno()
{
    let output = '';
    let response;
    let array = [];

    await fetch("https://api.tracker.gg/api/v2/rocket-league/standard/profile/steam/76561198967015691", {
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

function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
  }