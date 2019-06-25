import allData from '../utils/allData';

const today = new Date().toLocaleDateString(undefined, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

class Property {
  constructor() {
    this.propertyList = allData.propertyData;
  }

  postAdvert(prop) {
    const {
      owner, price, state, city, address, type, image_url
    } = prop;

    const propLength = this.propertyList.length;
    const lastPropID = this.propertyList[propLength - 1].id;
    prop.id = lastPropID + 1;

    const newProperty = {
      owner,
      id: prop.id,
      price,
      state,
      city,
      type,
      address,
      image_url,
      created_on: today,
      status: 'Available'
    };

    this.propertyList.push(newProperty);
    return {
      id: newProperty.id,
      status: newProperty.status,
      type,
      state,
      city,
      address,
      price,
      created_on: today,
      image_url

    };
  }
}


export default new Property();
