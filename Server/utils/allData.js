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
      password: 'sebastine',
      phoneNumber: '08058070709',
      address: 'Gwarinpa, Abuja',
      isAdmin: false
    }
  ],
  propertyData: [
    {
      id: 1,
      price: 10000000.00,
      state: 'Ogun',
      city: 'Abeokuta',
      type: '3-bedroom',
      address: 'Abeokuta Ogun Nigeria',
      image_url: 'https://afsddsfsddrseeseewsdssdsdds'
    },
    {
      id: 2,
      price: 30000000.00,
      state: 'Lagos',
      city: 'Lekki',
      type: '2-bedroom',
      address: 'Lekki Lagos Nigeria',
      image_url: 'https://afsddsfsfssddssdsdds'
    }
  ]
};
export default allData;
