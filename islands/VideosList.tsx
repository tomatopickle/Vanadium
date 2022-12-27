import { useState } from "preact/hooks";
import ui from "../ui/index.tsx";
import Api from "../lib/api.tsx";
import formatNumber from "../lib/api.tsx";
import VideoList from "../components/VideoList.tsx";
import { Component } from "preact";

let dummyData: Array<any> = [{
  type: "shortVideo",
  title: "'Twas The Night Before I Switched To Linux...",
  videoId: "XtW1lDPxKF0",
  videoThumbnails: [
    {
      quality: "maxres",
      url: "https://yt.funami.tech/vi/XtW1lDPxKF0/maxres.jpg",
      width: 1280,
      height: 720,
    },
    {
      quality: "maxresdefault",
      url: "https://yt.funami.tech/vi/XtW1lDPxKF0/maxresdefault.jpg",
      width: 1280,
      height: 720,
    },
    {
      quality: "sddefault",
      url: "https://yt.funami.tech/vi/XtW1lDPxKF0/sddefault.jpg",
      width: 640,
      height: 480,
    },
    {
      quality: "high",
      url: "https://yt.funami.tech/vi/XtW1lDPxKF0/hqdefault.jpg",
      width: 480,
      height: 360,
    },
    {
      quality: "medium",
      url: "https://yt.funami.tech/vi/XtW1lDPxKF0/mqdefault.jpg",
      width: 320,
      height: 180,
    },
    {
      quality: "default",
      url: "https://yt.funami.tech/vi/XtW1lDPxKF0/default.jpg",
      width: 120,
      height: 90,
    },
    {
      quality: "start",
      url: "https://yt.funami.tech/vi/XtW1lDPxKF0/1.jpg",
      width: 120,
      height: 90,
    },
    {
      quality: "middle",
      url: "https://yt.funami.tech/vi/XtW1lDPxKF0/2.jpg",
      width: 120,
      height: 90,
    },
    {
      quality: "end",
      url: "https://yt.funami.tech/vi/XtW1lDPxKF0/3.jpg",
      width: 120,
      height: 90,
    },
  ],
  lengthSeconds: 124,
  author: "DistroTube",
  authorId: "UCVls1GmFKf6WlTraIb_IaJg",
  authorUrl: "/channel/UCVls1GmFKf6WlTraIb_IaJg",
  published: 1671804025,
  publishedText: "40 دقائق منذ",
  viewCount: 256,
}];

export default class Videos extends Component<
  { data: Array<Video>; inRecos: booolean },
  { videoCards: preact.JSX.Element[] }
> {
  constructor() {
    super();
    this.state = { videoCards: [<div>Loading</div>] };
    console.log(this);
  }
  componentWillMount() {
    if (this.props == null) {
      return;
    }
    const api = new Api("https://invidious.baczek.me/api/v1");
    const data = this.props.data;
    const el = data.map((e: Video) => {
      return VideoList(e,true);
    });
    this.setState(
      { videoCards: el },
    );
  }
  render() {
    return <div class="w-full">{this.state.videoCards}</div>;
  }
}
