import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import {
  addUser,
  deleteUser,
  fetchUsers,
  setUserAfterDelete,
  setUserAfterUpdate,
  updateUser,
} from "@/features/admin/userSlice";
import { toast } from "sonner";

const UserManagement = () => {
  const { users } = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const initialState = {
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const actionResult = await dispatch(addUser(formData));

      if (addUser.fulfilled.match(actionResult)) {
        toast.success(actionResult.payload.message);
        dispatch(fetchUsers());
        setFormData(initialState);
      }
    } catch {
      dispatch(fetchUsers());
    }
    // Reset the form after Submission
  };
  const handleRoleChange = async (userId: string, role: string) => {
    dispatch(setUserAfterUpdate({ userId, role }));

    try {
      const actionResult = await dispatch(updateUser({ userId, role }));

      if (updateUser.rejected.match(actionResult)) {
        dispatch(fetchUsers());
      }
    } catch {
      dispatch(fetchUsers());
    }
  };
  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      dispatch(setUserAfterDelete(userId));
      try {
        const actionResult = await dispatch(deleteUser(userId));

        if (deleteUser.rejected.match(actionResult)) {
          dispatch(fetchUsers());
        }
      } catch {
        dispatch(fetchUsers());
      }
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      {/* Add New User From */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add User
          </button>
        </form>
      </div>
      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-x uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserManagement;
