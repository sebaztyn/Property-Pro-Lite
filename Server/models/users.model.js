import allData from '../utils/allData';

class Users {
  constructor() {
    this.userList = allData.userData;
  }

  addUser(user) {
    const {
      email, first_name, last_name, password, address, phoneNumber
    } = user;

    const userLength = this.userList.length;
    const lastUserID = this.userList[userLength - 1].id;
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

    this.userList.push(newUser);

    return {
      id: newUser.id,
      email,
      first_name,
      last_name
    };
  }

  findAllUsers() {
    return this.userList;
  }
}

export default new Users();
