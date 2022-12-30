import { useState } from "preact/hooks";
import ui from "../ui/index.tsx";
import { Component } from "preact";

export default function Counter(props) {
  const [index, setIndex] = useState(props.start);
  const tabs = props.tabs;
  const children = props.children;
  console.log(props);
  //   const els = children.map((El, i) => {
  //     if (i == index) {
  //       return <div>{El}</div>;
  //     }
  //   });
  return (
    <div class={ui.tab.border}>
      <ul class="flex flex-wrap -mb-px">
        {tabs.map((tab, i) => {
          return (
            <li
              class="mr-2"
              onClick={() => {
                setIndex(i);
              }}
            >
              <a
                href="#"
                class={index == i ? ui.tab.selected : ui.tab.default}
                aria-current="page"
              >
                {tab}
              </a>
            </li>
          );
        })}
      </ul>
      {/* {children} */}
      <div>
        {children.map((El, i) => {
          if (i == index) {
            return <div>{El}</div>;
          }
        })}
      </div>
    </div>
  );
}
// export default class Tab extends Component {
//   constructor() {
//     super();
//     this.state = { index: 0 };
//   }
//   componentWillMount() {
//     this.setState({ index: this.props.start });
//   }
//   render() {
//     const index = this.state.index;
//     const children = this.props.children;

//     const els = children.map((El, i) => {
//       if (i == index) {
//         return <div>{El}</div>;
//       }
//     });
//     const tabs = this.props.tabs;
//     return (
//       <div class={ui.tab.border}>
//         <ul class="flex flex-wrap -mb-px">
//           {tabs.map((tab, i) => {
//             return (
//               <li
//                 class="mr-2"
//                 onClick={() => {
//                   this.setState(
//                     { index: i },
//                   );
//                 }}
//               >
//                 <a
//                   href="#"
//                   class={index == i ? ui.tab.selected : ui.tab.default}
//                   aria-current="page"
//                 >
//                   {tab}
//                 </a>
//               </li>
//             );
//           })}
//         </ul>
//         {/* {children} */}
//         <div>
//           {els}
//         </div>
//       </div>
//     );
//   }
// }
