import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  User, 
  Shield 
} from 'lucide-react';

// Initial mock data
const initialUsers = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: 'Admin', 
    status: 'Active' 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    role: 'Manager', 
    status: 'Active' 
  }
];

const initialRoles = [
  { 
    id: 1, 
    name: 'Admin', 
    permissions: ['Full Access'] 
  },
  { 
    id: 2, 
    name: 'Manager', 
    permissions: ['Read', 'Write'] 
  }
];

const RBACDashboard = () => {
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [searchTerm, setSearchTerm] = useState('');

  // User Management Functions
  const addUser = (newUser) => {
    setUsers([...users, { 
      ...newUser, 
      id: users.length + 1, 
      status: 'Active' 
    }]);
  };

  const editUser = (editedUser) => {
    setUsers(users.map(user => 
      user.id === editedUser.id ? editedUser : user
    ));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // Role Management Functions
  const addRole = (newRole) => {
    setRoles([...roles, { 
      ...newRole, 
      id: roles.length + 1 
    }]);
  };

  const editRole = (editedRole) => {
    setRoles(roles.map(role => 
      role.id === editedRole.id ? editedRole : role
    ));
  };

  // Filtered Users
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold flex items-center">
        <Shield className="mr-2" /> RBAC Dashboard
      </h1>

      {/* User Management Section */}
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <User className="mr-2" /> User Management
          </h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text"
                placeholder="Search users" 
                className="pl-8 pr-2 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
            >
              <Plus className="mr-2" /> Add User
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">
                    <span className={`
                      px-2 py-1 rounded-full text-xs 
                      ${user.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                      }
                    `}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button 
                      className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Management Section */}
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <Shield className="mr-2" /> Role Management
          </h2>
          <button 
            className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
          >
            <Plus className="mr-2" /> Add Role
          </button>
        </div>

        {/* Roles Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-left">Role Name</th>
                <th className="p-3 text-left">Permissions</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{role.name}</td>
                  <td className="p-3">
                    {role.permissions.map((perm) => (
                      <span 
                        key={perm} 
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mr-1"
                      >
                        {perm}
                      </span>
                    ))}
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button 
                      className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RBACDashboard;