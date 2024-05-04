// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
    department: 'police',
    imageUrl: 'https://live.staticflickr.com/65535/52764435723_c93a5fe909_h.jpg',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442b',
    name: 'Je-ann',
    email: 'jeann@nextmail.com',
    password: '123456',
    department: 'hospital',
    imageUrl: 'https://live.staticflickr.com/65535/53692977606_fd52d872db_h.jpg',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442c',
    name: 'Kai-Jay',
    email: 'kaijay@nextmail.com',
    password: '123456',
    department: 'fire',
    imageUrl: 'https://live.staticflickr.com/65535/53692094467_3455ab84f8_h.jpg',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

module.exports = {
  users,
  revenue,
};
