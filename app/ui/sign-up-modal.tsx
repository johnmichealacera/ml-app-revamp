import { KeyIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { createUser } from '../lib/actions';

export function SignUpModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track if passwords match

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    setPasswordsMatch(true);
    try {
      await createUser(name, email, password, role);
      alert("User successfully created");
    } catch (e: any) {
      console.error('e', e);
      alert(`User not successully created: ${e.message}`);
    }
    clearAndClose();
  };

  const clearAndClose = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setRole('');
    setPasswordsMatch(true);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Sign Up
                  </h3>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 p-1 border border-gray-300 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-1 border border-gray-300 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-1 border border-gray-300 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-1 p-1 border border-gray-300 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      />
                      {!passwordsMatch && <p className="mt-1 text-xs text-red-500">Passwords do not match</p>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                      <div className="relative">
                        <select
                          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 pr-3 text-sm outline-2 placeholder:text-gray-500"
                          id="role"
                          name="role"
                          required
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="">Select role...</option>
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                          <option value="administrator">Administrator</option>
                        </select>
                        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                Sign Up
              </button>
              <button
                type="button"
                onClick={clearAndClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
