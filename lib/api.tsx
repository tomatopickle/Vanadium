class Api {
  instanceUrl = "";
  constructor(instanceUrl: string) {
    this.instanceUrl = instanceUrl;
  }
  async getTrending() {
    const res = await fetch(`${this.instanceUrl}/trending?region=US&type=music`);
    const data = res.json();
    return data;
  }
  async getPopular() {
    const res = await fetch(`${this.instanceUrl}/popular?region=US&type=music`);
    const data = res.json();
    return data;
  }
  async getVideo(id:string) {
    const res = await fetch(`${this.instanceUrl}/videos/${id}`);
    const data = res.json();
    return data;
  }
  async getAuthor(id:string) {
    const res = await fetch(`${this.instanceUrl}/channels/${id}`);
    const data = res.json();
    return data;
  }
}

export default Api;
