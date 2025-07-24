const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

const VISITOR_FILE = path.join(__dirname, 'visitors.json');

// Initialize visitor file if it doesn't exist
if (!fs.existsSync(VISITOR_FILE)) {
    fs.writeFileSync(VISITOR_FILE, JSON.stringify({ count: 100000, ips: [] }));
}

app.get('/api/visitor-count', (req, res) => {
    const visitorData = JSON.parse(fs.readFileSync(VISITOR_FILE));
    const clientIP = req.ip || req.connection.remoteAddress;

    if (!visitorData.ips.includes(clientIP)) {
        visitorData.count += 1;
        visitorData.ips.push(clientIP);
        fs.writeFileSync(VISITOR_FILE, JSON.stringify(visitorData));
    }

    res.json({ count: visitorData.count });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});