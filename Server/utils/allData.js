const today = new Date().toLocaleDateString(undefined, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

const allData = {
  userData: [
    {
      id: 5,
      email: 'sebastino@yahoo.com',
      first_name: 'Chima',
      last_name: 'Ekeneme',
      password: 'Qwertyuiop1?',
      phoneNumber: '08032626214',
      address: 'Gwarinpa, Abuja',
      isAdmin: true
    },
    {
      id: 2,
      email: 'sebtecc@yahoo.com',
      first_name: 'Uche',
      last_name: 'Ekeneme',
      password: 'Qwertyuiop1?',
      phoneNumber: '08058070709',
      address: 'Gwarinpa, Abuja',
      isAdmin: false
    }
  ],
  propertyData: [
    {
      owner: 2,
      id: 1,
      price: 10000000.00,
      state: 'Ogun',
      city: 'Abeokuta',
      type: '2-bedroom',
      address: 'Abeokuta Ogun Nigeria',
      image_url: 'https://afsddsfsddrseeseewsdssdsdds',
      created_on: today,
      status: 'Available'
    },
    {
      owner: 5,
      id: 2,
      price: 30000000.00,
      state: 'Lagos',
      city: 'Lekki',
      type: '2-bedroom',
      address: 'Lekki Lagos Nigeria',
      image_url: 'https://afsddsfsfssddssdsdds',
      created_on: today,
      status: 'Available'
    },
    {
      owner: 2,
      id: 3,
      price: 2500000.00,
      state: 'Ogun',
      city: 'Abeokuta',
      type: '2-bedroom',
      address: 'Lekki Lagos Nigeria',
      image_url: 'https://afsddsfsfssddssdsdds',
      created_on: today,
      status: 'Available'
    },
    {
      owner: 2,
      id: 4,
      price: 30000000.00,
      state: 'Lagos',
      city: 'Lekki',
      type: '3-bedroom',
      address: 'Lekki Lagos Nigeria',
      image_url: 'https://afsddsfsfssddssdsdds',
      created_on: today,
      status: 'Available'
    },
    {
      owner: 5,
      id: 5,
      price: 30000000.00,
      state: 'Lagos',
      city: 'Ajao Estate',
      type: '3-bedroom',
      address: 'Lekki Lagos Nigeria',
      image_url: 'https://afsddsfsfssddssdsdds',
      created_on: today,
      status: 'Available'
    },
    {
      owner: 5,
      id: 6,
      price: 1000000.00,
      state: 'Kebbi',
      city: 'Birin-Kebbi',
      type: 'Duplex',
      address: 'Lekki Lagos Nigeria',
      image_url: 'https://afsddsfsfssddssdsdds',
      created_on: today,
      status: 'Available'
    }
  ]
};
export default allData;
