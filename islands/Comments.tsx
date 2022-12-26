import { JSX } from "https://esm.sh/v99/preact@10.11.0/src/index";
import ui from "../ui/index.tsx";

interface Props {
  comments: Array<any>;
}

export default function Comments(props: Props) {
  const comments = props.comments;
  const els: Array<JSX.Element> = [];
  console.log(comments);
  comments.forEach((comment) => {
    els.push(
      <div>
        <br />
        <div class="flex">
          <img
            src={comment.authorThumbnails[1].url}
            alt="Commenter Thumbnail"
            srcset=""
            class="rounded-full h-12 mr-5 mt-1"
          />
          <div>
            <h3 class="font-semibold block">{comment.author}</h3>
            <p>{comment.content}</p>
          </div>
        </div>
      </div>,
    );
  });
  return <div class="px-5">{els}</div>;
}
