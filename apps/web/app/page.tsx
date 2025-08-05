import { client } from "@repo/db/client";

export default async function Home() {
  try {
    const users = await client.user.findMany();
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">BookyMySoow User Management</h1>
        
        <div className="mb-6">
          <a 
            href="/websocket-test.html" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-4"
            target="_blank"
          >
            WebSocket Test
          </a>
          <a 
            href="/all-users.html" 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            target="_blank"
          >
            All Users Page
          </a>
        </div>
        
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Current Users ({users.length})</h2>
          
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <div className="space-y-4">
              {users.map(user => (
                <div key={user.id} className="border p-4 rounded">
                  <p><strong>ID:</strong> {user.id}</p>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Password:</strong> {user.password}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">BookyMySoow User Management</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading user data</p>
        </div>
      </div>
    );
  }
}
