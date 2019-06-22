
const today = new Date().toLocaleDateString(undefined, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});
const userDataStore = [
  {
    id: 1,
    email: 'sebastinocj@yahoo.com',
    first_name: 'Chima',
    last_name: 'Ekeneme',
    password: 'kluej',
    phoneNumber: '08032626214',
    address: 'Gwarinpa, Abuja',
    isAdmin: true
  },
  {
    id: 2,
    email: 'sebtecc@yahoo.com',
    first_name: 'Uche',
    last_name: 'Ekeneme',
    password: 'sebastine',
    phoneNumber: '08058070709',
    address: 'Gwarinpa, Abuja',
    isAdmin: false
  }
];
const propertyData = [
  {
    id: 1,
    createdOn: today,
    subject: 'Are you Available',
    message: 'Can we meetup at Andela Towers?',
    parentMessageId: 1,
    status: 'draft'
  }
];


class Users {
  static addUser(user) {
    const {
      email, first_name, last_name, password, address, phoneNumber
    } = user;

    const userLength = userDataStore.length;
    const lastUserID = userDataStore[userLength - 1].id;
    user.id = lastUserID + 1;

    const newUser = {
      id: user.id,
      email,
      first_name,
      last_name,
      password,
      address,
      phoneNumber,
      isAdmin: false
    };

    userDataStore.push(newUser);

    return {
      id: newUser.id,
      email,
      first_name,
      last_name
    };
  }
}

export default Users;
