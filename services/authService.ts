
import { User } from '../types';
import { storage } from './storage';

export const login = async (email: string, password: string): Promise<User | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const users = storage.getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  return user || null;
};

export const register = async (email: string, password: string, name: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = storage.getUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
        throw new Error('Email already registered');
    }

    const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'user',
        avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
        password
    };
    
    storage.saveUser(newUser);
    return newUser;
}
