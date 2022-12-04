import GoogleApiKey from "./../googleApiKey";

const api = {
  async fetchLocation({ latitude, longitude }) {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GoogleApiKey}`
    );
    return await response.json();
  },
};

export default api;
