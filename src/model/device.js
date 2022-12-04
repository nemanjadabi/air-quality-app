const deviceModel = (deviceData) => {
  let airQuality = deviceData["air-quality"]?.value;
  if (airQuality === "je izvanredan") {
    airQuality = "Excellent";
  }
  if (airQuality === "Dobar") {
    airQuality = "Good";
  }
  if (airQuality === "Moderate") {
    airQuality = "Acceptable";
  }
  if (airQuality === "Very Polluted") {
    airQuality = "VeryPolluted";
  }
  return {
    airQuality,
    location: deviceData.location?.value,
    pm10: deviceData.pm10?.value,
  };
};

export default deviceModel;
