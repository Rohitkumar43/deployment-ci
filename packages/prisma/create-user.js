const { client } = require('./dist/index.js');

async function main() {
  try {
    const user = await client.user.create({
      data: {
        username: 'testuser',
        password: 'testpassword'
      }
    });
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await client.$disconnect();
  }
}

main();