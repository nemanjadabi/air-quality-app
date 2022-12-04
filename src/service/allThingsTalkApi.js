import deviceModel from "../model/device";

const api = {
  setHeader() {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer maker:4tSxzKTe2VXvwvpXy5KwocfaRQOIt8CTo1a1sbTL",
    };
  },
  async fetchAllDevices() {
    const response = await fetch(
      "https://api.allthingstalk.io/ground/3s61Mf0HvqudWXXjv2QzUCnq/devices",
      {
        headers: this.setHeader(),
      }
    );
    return await response.json();
  },
  async fetchDeviceState(id) {
    const response = await fetch(
      `https://api.allthingstalk.io/device/${id}/state`,
      {
        headers: this.setHeader(),
      }
    );
    const data = await response.json();
    return deviceModel(data);
  },
};

export default api;
