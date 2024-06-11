const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    email: 'glavin617@gmail.com',
    first_name: 'KEVIN',
    middle_name: 'L',
    last_name: 'DELA PEÑA',
    suffix: '',
    password: '123456',
    role: 'student',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442b',
    email: 'user1@nextmail.com',
    first_name: 'REYJON',
    middle_name: 'P',
    last_name: 'RAMIREZ',
    suffix: '',
    password: '123456',
    role: 'student',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442c',
    email: 'user2@nextmail.com',
    first_name: 'Juniper',
    middle_name: 'P',
    last_name: 'Banaybanay',
    suffix: '',
    password: '123456',
    role: 'administrator',
  },
];

const students = [
  {
    id_number: '2021-0003829',
    gender: 'MALE',
    civil_status: 'MARRIED',
    birthday: 'SEPTEMBER 26, 1995',
    birth_place: 'SOCORRO, SURIGAO DEL NORTE',
    age: 27,
    nationality: 'FIL',
    religion: 'CHURCH OF JESUS CHRIST OF LATT',
    ethnicity: 'BISAYA',
    facebook: '',
    skype: '',
    zoom_account: '',
    course_id: '64ffa120-aa8a-4ab1-9396-4100342fb0f5',
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
  },
  {
    id_number: '2021-0003830',
    gender: 'MALE',
    civil_status: 'SINGLE',
    birthday: 'SEPTEMBER 19, 2000',
    birth_place: 'SOCORRO, SURIGAO DEL NORTE',
    age: 23,
    nationality: 'FIL',
    religion: '',
    ethnicity: 'BISAYA',
    facebook: '',
    skype: '',
    zoom_account: '',
    course_id: '17c19242-7bcf-455c-b771-6b2c50371245',
    user_id: '410544b2-4001-4271-9855-fec4b6a6442b',
  }
]

const courses = [
  {
    id: '64ffa120-aa8a-4ab1-9396-4100342fb0f5',
    industry_sector: 'Metals and Engineering',
    program_title: 'Shielded Metal Arc Wielding',
  },
  {
    id: '17c19242-7bcf-455c-b771-6b2c50371245',
    industry_sector: 'Electrical and Electronics',
    program_title: 'Computer Systems Servicing',
  },
  {
    id: '17c19242-7bcf-455c-b771-6b2c50371246',
    industry_sector: 'Social Community Development',
    program_title: 'Bookkeeping NC III',
  },
];

const subjects = [
  {
    subject_code: 'ME101',
    subject_title: 'Introduction to Metalwork',
    subject_description: 'Overview of metalworking processes and Safety in the workshop',
  },
  {
    subject_code: 'WT102',
    subject_title: 'Basic Welding Theory',
    subject_description: 'Introduction to welding principles and Types of welding processes',
  },
  {
    subject_code: 'SMAW103',
    subject_title: 'Shielded Metal Arc Welding (SMAW) Fundamentals',
    subject_description: 'Basics of SMAW, Equipment and materials',
  },
  {
    subject_code: 'MP104',
    subject_title: 'Metal Properties and Metallurgy',
    subject_description: 'Properties of different metals and Effects of heat on metals',
  },
  {
    subject_code: 'BR105',
    subject_title: 'Blueprint Reading and Welding Symbols',
    subject_description: 'Reading and interpreting blueprints and Understanding welding symbols',
  },
  {
    subject_code: 'PWT106',
    subject_title: 'Practical Welding Techniques I',
    subject_description: 'Basic welding practices and Hands-on training in welding joints',
  },
];

module.exports = {
  users,
  students,
  courses,
  subjects,
};
