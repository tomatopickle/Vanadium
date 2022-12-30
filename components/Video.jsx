export default function Video(props) {
  return (
    <video
      id="video"
      preload="auto"
      data-setup="{}"
      controls
      class={"video-js  vjs-big-play-centered h-3/5 " + props.class}
    >
      {props.video.captions && props.video.captions.map((source) => {
        return (
          <track
            kind="captions"
            src={`http://localhost:8000/api/cc?url=https://invidious.weblibre.org${source.url}`}
            srclang={source.language_code}
            label={source.label}
            default
          />
        );
      })}
      {props.video.formatStreams && props.video.formatStreams.map((source) => {
        return (
          <source
            label={source.qualityLabel}
            src={source.url}
            type={source.type}
          />
        );
      })}
    </video>
  );
}
