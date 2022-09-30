import { DefaultDraftBlockRenderMap } from 'draft-js';
import { composeDecorators } from "@draft-js-plugins/editor";
import createTextAlignmentPlugin from '@draft-js-plugins/text-alignment';
import createStaticToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createMathjaxPlugin from "draft-js-mathjax-plugin";
import createHighlightPlugin from 'services/course/editor/components/plugins/highlightPlugin';
import createAlignmentPlugin from "@draft-js-plugins/alignment"; 
import createFocusPlugin from "@draft-js-plugins/focus";
import createResizeablePlugin from "@draft-js-plugins/resizeable";
import createImagePlugin from "@draft-js-plugins/image";
import createVideoPlugin from '@draft-js-plugins/video';
import createKaTeXPlugin from 'draft-js-katex-plugin';
import createDragNDropUploadPlugin from "@draft-js-plugins/drag-n-drop-upload";
import createBlockDndPlugin from "@draft-js-plugins/drag-n-drop";
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import katex from 'katex';
import Immutable from 'immutable';
import "@draft-js-plugins/static-toolbar/lib/plugin.css"

const useEditorPluginsHook = ( props ) => {
    let { handleMockUpload } = props;

    const highlightPlugin = createHighlightPlugin();
    const focusPlugin = createFocusPlugin();
    //const resizeablePlugin = createResizeablePlugin();
    const alignmentPlugin = createAlignmentPlugin();
    const blockDndPlugin = createBlockDndPlugin();
    const kaTeXPlugin = createKaTeXPlugin({ katex });
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    const textAlignmentPlugin = createTextAlignmentPlugin();
    const staticToolbarPlugin = createStaticToolbarPlugin();
    
    const decorator = composeDecorators(
        // resizeablePlugin.decorator,
        alignmentPlugin.decorator,
        focusPlugin.decorator,
        blockDndPlugin.decorator
    );

    const { 
    Toolbar } = staticToolbarPlugin;

    const { 
    AlignmentTool } = alignmentPlugin;

    const { 
    InsertButton } = kaTeXPlugin;

    const {
    InlineToolbar } = inlineToolbarPlugin;

    const imagePlugin = createImagePlugin({ decorator });

    const videoPlugin = createVideoPlugin({ decorator });

    const dndFileUploadPlugin = createDragNDropUploadPlugin({
        handleUpload: handleMockUpload,
        addImage: imagePlugin.addImage
    });

    const plugins = [ 
        highlightPlugin,
                // addLinkPlugin,
        imagePlugin,
        focusPlugin, 
        alignmentPlugin, 
                // resizeablePlugin,
        videoPlugin,
        createMathjaxPlugin(), 
                    //kaTeXPlugin,
        dndFileUploadPlugin,
        blockDndPlugin,
        inlineToolbarPlugin,
        staticToolbarPlugin,
        textAlignmentPlugin
    ];

    const blockRenderMap = Immutable.Map({
        atomic: {
        element: 'figure',
        wrapper: <BlockWrapper />,
        },
    });

    const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);
    
function BlockWrapper({ children }) {
    return <div>{children}</div>;
}

return {
    imagePlugin,
    videoPlugin,
    InsertButton,
    InlineToolbar,
    extendedBlockRenderMap,
    plugins,
    Toolbar,
    textAlignmentPlugin,
    AlignmentTool,
 };
};

export default useEditorPluginsHook;