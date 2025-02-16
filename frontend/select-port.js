// filepath: /c:/Users/user/yfapp/frontend/select-port.js
const detectPort = require("detect-port-alt"); // Ensure correct package
const fs = require("fs");
const path = require("path");

const MIN_PORT = 3000;
const MAX_PORT = 3007;
const envFile = path.join(__dirname, ".env");

// Function to find an available port
async function findAvailablePort(min, max) {
    for (let port = min; port <= max; port++) {
        try {
            const availablePort = await detectPort(port);
            if (availablePort === port) {
                return port;
            }
        } catch (err) {
            console.error(`⚠️ Port ${port} is unavailable:`, err.message);
        }
    }
    throw new Error("❌ No available ports found in the range 3000-3007");
}

// Immediately invoked function (IIFE) to set the port
(async function () {
    try {
        const availablePort = await findAvailablePort(MIN_PORT, MAX_PORT);
        console.log(`✅ Using port ${availablePort}`);

        // Save selected port to the .env file
        const envContent = `PORT=${availablePort}\nAPI_URL=http://localhost:${availablePort}`;
        fs.writeFileSync(envFile, envContent);
    } catch (error) {
        console.error("❌ No available ports found!", error);
        process.exit(1);
    }
})();