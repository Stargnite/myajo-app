process.env.NODE_ENV = 'test';

// Mock only specific modules for testing
jest.mock('../config/firebase', () => ({
  auth: () => ({
    createUser: jest.fn().mockResolvedValue({ uid: 'test-uid-123' }),
    setCustomUserClaims: jest.fn().mockResolvedValue(null),
    createCustomToken: jest.fn().mockResolvedValue('mock-firebase-token'),
    verifyIdToken: jest.fn().mockResolvedValue({ uid: 'test-uid-123', role: 'member' })
  })
}));

// Mock axios specifically for the Firebase auth calls
jest.mock('axios', () => {
  const originalAxios = jest.requireActual('axios');
  return {
    ...originalAxios,
    post: jest.fn().mockImplementation((url, data) => {
      // Only mock the Firebase auth calls
      if (url.includes('identitytoolkit.googleapis.com')) {
        return Promise.resolve({
          data: {
            idToken: 'test-id-token',
            refreshToken: 'test-refresh-token',
            expiresIn: '3600',
            localId: 'test-local-id'
          }
        });
      }
      // For all other calls, use the real axios
      return originalAxios.post(url, data);
    })
  };
});

// Mock database calls without changing your actual db.js file
jest.mock('../config/db', () => {
  const mockDb = {
    query: jest.fn().mockImplementation((text, params) => {
      // Simulate user creation
      if (text.includes('INSERT INTO users')) {
        return Promise.resolve({
          rows: [{ id: 1, email: params[1], role: params[3] }]
        });
      }
      
      // Simulate user lookup by email
      if (text.includes('SELECT * FROM users WHERE email')) {
        return Promise.resolve({
          rows: [{
            id: 1,
            email: params[0],
            password_hash: '$2b$10$abcdefghijklmnopqrstuvwxyz', // Mocked hash that will work with bcrypt mock
            fullname: 'Test User',
            role: 'member'
          }]
        });
      }
      
      // Get all users
      if (text.includes('SELECT') && text.includes('FROM users')) {
        return Promise.resolve({
          rows: [
            { id: 1, email: 'test@example.com', fullname: 'Test User', role: 'member' }
          ]
        });
      }
      
      return Promise.resolve({ rows: [] });
    }),
    connect: jest.fn().mockResolvedValue({
      query: jest.fn().mockResolvedValue({}),
      release: jest.fn()
    })
  };
  
  return mockDb;
});

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('$2b$10$abcdefghijklmnopqrstuvwxyz'),
  compare: jest.fn().mockResolvedValue(true)
}));