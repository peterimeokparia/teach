import React, { Component } from "react";
import { convertFromRaw, EditorState } from "draft-js";

import Editor, {
  composeDecorators,
  createEditorStateWithText
} from "draft-js-plugins-editor";

import createImagePlugin from "draft-js-image-plugin";

import createAlignmentPlugin from "draft-js-alignment-plugin";

import createFocusPlugin from "draft-js-focus-plugin";

import createResizeablePlugin from "draft-js-resizeable-plugin";

import editorStyles from "./editorStyles.css";

import ImageAdd from "services/course/editor/components/ImageAdd";

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const plugins = [focusPlugin, alignmentPlugin, resizeablePlugin, imagePlugin];

/* eslint-disable */
const initialState = {
  entityMap: {
    "0": {
      type: "image",
      mutability: "IMMUTABLE",
      data: {
        src:
          "https://www.draft-js-plugins.com/images/canada-landscape-small.jpg"
      }
    }
  },
  blocks: [
    {
      key: "9gm3s",
      text:
        "You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "ov7r",
      text: " ",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0
        }
      ],
      data: {}
    }
  ]
};
/* eslint-enable */
export default class MyEditorTest2 extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  onChange = editorState => {
    this.setState({
      editorState
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div>
        <p>
          click on add button , add an image then click on that image so you ca
          allign it
        </p>
        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={element => {
              this.editor = element;
            }}
          />
          <AlignmentTool />
        </div>
        <ImageAdd
          editorState={this.state.editorState}
          onChange={this.onChange}
          modifier={imagePlugin.addImage}
        />
      </div>
    );
  }
}