//first, import built-in modules(http and os)
const http = require('node:http');
const os = require('node:os');
const { platform } = require('node:process');

//secondly, create a func to randomly generate a delay between 0 and 3 seconds
function getRandomDelay() {
    Math.floor(Math.random() * 3000);
};

//thirdly, create a func to handle requests
//this is the heartbeat of the server
function requestHandler(req, res) {
    //CORS config
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Methods', 'GET');

    //simulating async op with random delay 
    setTimeout(function() {
        //get cpu and os info
        const cpuInfo = os.cpus();
        //creating obj of os info 
        const osInfo = {
            platform: os.platform(),
            release: os.release(),
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
            hostname: os.hostname(),
            networkInterfaces: os.networkInterfaces()
        };

        //responding with both cpu and os info 
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ cpuInfo, osInfo }))
    }, getRandomDelay())
}

//create http server
const server = http.createServer(requestHandler);

//listen on port("")
const PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
    console.log(`Server running on ${PORT}`);
})

