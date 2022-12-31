import Api from "../lib/api.tsx";
import { Component } from "preact";
import ui from "../ui/index.tsx";
import VideoCard from "../components/VideoCard.tsx";
import videoCard from "../components/VideoCard.tsx";

export default class ChannelVideos extends Component {
  state = { sort: "Newest", videos: [] };
  constructor() {
    super();
    this.state = { sort: "Newest", videos: [] };
  }
  async componentWillMount() {
    const api = new Api("https://invidious.baczek.me/api/v1");

    const videos = await api.getSortedVideos(this.props.id, this.state.sort);
    this.setState({ videos: videos });
  }
  async update() {
    const api = new Api("https://invidious.baczek.me/api/v1");

    const videos = await api.getSortedVideos(this.props.id, this.state.sort);
    this.setState({ videos: videos });
  }
  render() {
    const els = [];
    this.state.videos.forEach((e) => {
      els.push(videoCard(e));
    });
    console.log(this.state.videos);
    return (
      <>
        <div class="flex gap-2 py-1 px-3">
          <button
            class={this.state.sort == "Newest" ? ui.btnPrimary : ui.btn}
            onClick={() => {
              this.setState({ sort: "Newest" });
              this.update();
            }}
          >
            Newest
          </button>
          <button
            class={this.state.sort == "Popular" ? ui.btnPrimary : ui.btn}
            onClick={() => {
              this.setState({ sort: "Popular" });
              this.update();
            }}
          >
            Popular
          </button>
          <button
            class={this.state.sort == "Oldest" ? ui.btnPrimary : ui.btn}
            onClick={() => {
              this.setState({ sort: "Oldest" });
              this.update();
            }}
          >
            Oldest
          </button>
        </div>
        <div class="grid gap-2 grid-cols-4">
          {els}
        </div>
      </>
    );
  }
}
