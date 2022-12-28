class Api {
  instanceUrl = "";
  constructor(instanceUrl: string) {
    this.instanceUrl = instanceUrl;
  }
  async getTrending() {
    const res = await fetch(
      `${this.instanceUrl}/trending?region=US&type=music`,
    );
    const data = res.json();
    return data;
  }
  async getPopular() {
    const res = await fetch(`${this.instanceUrl}/popular?hl=en-US&safe=true`);
    const data = res.json();
    return data;
  }
  async getVideo(id: string) {
    const res = await fetch(`${this.instanceUrl}/videos/${id}`);
    const data = res.json();
    return data;
  }
  async getAuthor(id: string) {
    const res = await fetch(`${this.instanceUrl}/channels/${id}`);
    const data = res.json();
    return data;
  }
  async getVideoComments(id: string) {
    const res = await fetch(`${this.instanceUrl}/comments/${id}`);
    const data = res.json();
    return data;
  }
  async getContinuationComments(id: string,continuation:string) {
    const res = await fetch(`${this.instanceUrl}/comments/${id}?continuation=${continuation}`);
    const data = res.json();
    return data;
  }
  async searchVideos(q: string) {
    const res = await fetch(`${this.instanceUrl}/search/?q=${q}&hl=en-US&safe=true`);
    const data = res.json();
    return data;
  }
}

export default Api;
