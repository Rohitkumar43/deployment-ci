const WebSocket = require('ws');
const { client } = require('./dist/index.js');

async function testWebSocket() {
    // First, get current users
    console.log('Current users before WebSocket connection:');
    const beforeUsers = await client.user.findMany();
    console.log(beforeUsers);
    
    // Connect to WebSocket server
    console.log('\nConnecting to WebSocket server...');
    const socket = new WebSocket('ws://localhost:8081');
    
    socket.on('open', () => {
        console.log('Connected to WebSocket server');
    });
    
    socket.on('message', async (data) => {
        console.log(`Received message: ${data}`);
        
        // Get users after connection
        console.log('\nUsers after WebSocket connection:');
        const afterUsers = await client.user.findMany();
        console.log(afterUsers);
        
        // Find the new user (the one that wasn't in the beforeUsers array)
        const newUsers = afterUsers.filter(afterUser => 
            !beforeUsers.some(beforeUser => beforeUser.id === afterUser.id)
        );
        
        console.log('\nNewly created user(s):');
        console.log(newUsers);
        
        // Close the connection
        socket.close();
    });
    
    socket.on('close', () => {
        console.log('Disconnected from WebSocket server');
    });
    
    socket.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
}

testWebSocket();