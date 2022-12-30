import { JSX } from "https://esm.sh/v99/preact@10.11.0/src/index";
import ui from "../ui/index.tsx";
import IconThumbUp from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/thumb-up.tsx";
import IconThumbDown from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/thumb-down.tsx";
import IconChevronDown from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/chevron-down.tsx";
import IconChevronUp from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/chevron-up.tsx";
import formatNumber from "../lib/formatNumber.ts";
import Api from "../lib/api.tsx";
import { Component } from "preact";


interface Props {
  comments: Array<any>;
  videoId: string;
}

export default class Comments
  extends Component<{ videoId: string; comments: Array<any> }> {
  state: { els: Array<any>; commentChildren: {} } = {
    els: [],
    commentChildren: {},
  };
  constructor() {
    super();
    this.state = { els: [], commentChildren: {} };
  }
  componentWillMount() {
    const _commentChildren: any = {};
    const comments = this.props.comments;

    comments.forEach((comment) => {
      _commentChildren[comment.commentId] = { loading: false, comments: [] };
    });
    this.setState({ commentChildren: _commentChildren });
  }
  render() {
    const comments = this.props.comments;
    const els: Array<JSX.Element> = [];
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
              <div class="flex pt-2 gap-2">
                <div class="flex gap-1">
                  <IconThumbUp class="opacity-80" />
                  <div class="opacity-70">{formatNumber(comment.likeCount)}</div>
                </div>
                <IconThumbDown class="opacity-80" />
              </div>
              {comment.replies &&
                (
                  <button
                    onClick={async (e) => {
                      if (
                        this.state.commentChildren[comment.commentId].comments
                          .length > 0
                      ) {
                        this.state.commentChildren[comment.commentId].comments =
                          [];
                        this.setState({
                          commentChildren: this.state.commentChildren,
                        });
                        return;
                      }
                      this.state.commentChildren[comment.commentId].loading =
                        !this.state.commentChildren[comment.commentId].loading;
                      this.setState({
                        commentChildren: this.state.commentChildren,
                      });
                      const api = new Api("https://invidious.baczek.me/api/v1");
                      const comments = await api.getContinuationComments(
                        this.props.videoId,
                        comment.replies.continuation,
                      );
                      this.state.commentChildren[comment.commentId].loading =
                        false;
                      this.state.commentChildren[comment.commentId].comments =
                        comments.comments;
                      this.setState({
                        commentChildren: this.state.commentChildren,
                      });
                    }}
                    class={comment.replies &&
                      ui.btnUI.outline +
                        " border-none mt-2 pl-2 relative right-3 flex gap-2"}
                  >
               {this.state.commentChildren[comment.commentId]?.comments.length >
                  0 ?  <IconChevronUp/>  :  <IconChevronDown /> }{comment.replies.replyCount} replies
                  </button>
                )}
              {this.state.commentChildren[comment.commentId]?.loading && (
                <div>Loading..</div>
              )}
              {this.state.commentChildren[comment.commentId]?.comments.length >
                  0 && (
                <Comments
                  comments={this.state.commentChildren[comment.commentId]
                    ?.comments}
                  videoId={this.props.videoId}
                >
                </Comments>
              )}
            </div>
          </div>
        </div>,
      );
    });
    return <div class="px-5">{els}</div>;
  }
}
