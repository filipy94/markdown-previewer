const placeholder = `# Welcome to my React Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:
Heres some code, \`<div></div>\`, between 2 backticks.
\`\`\`
// this is multi-line code:
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.
There's also [links](https://www.freecodecamp.com), and
> Block Quotes!
And if you want to get really crazy, even tables:
Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.
- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.
1. And there are numbererd lists too.
1. Use just 1s if you want!
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:
![React Logo w/ Text](https://goo.gl/Umyytc)`

marked.setOptions({
    breaks: true,
  }); 
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

const maximizeIcon = "fa fa-arrows-alt fa-2x";
const minimizeIcon = "fa fa-compress fa-2x";
const maximizeStyle = {width: "80vw"};
const minimizeStyle = {};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: placeholder,
            editorMaximize: false,
            previewMaximize: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.refreshText = this.refreshText.bind(this);
        this.clear = this.clear.bind(this);
        this.editorMaximize = this.editorMaximize.bind(this);
        this.previewMaximize = this.previewMaximize.bind(this);
    };
    handleChange(event) {
        this.setState({
            userInput: event.target.value
        });
    };
    refreshText() {
        this.setState({
            userInput: placeholder
        });
    };
    clear() {
        this.setState({
            userInput: ''
        });
    };
    editorMaximize() {
        this.setState({
            editorMaximize: !this.state.editorMaximize
        });
    };
    previewMaximize() {
        this.setState({
            previewMaximize: !this.state.previewMaximize
        });
    };

    render() {
        return (
            <div id="main">
                <div id="boxes">
                    {!this.state.previewMaximize && <Editor 
                        userInput={this.state.userInput}
                        minimizeMaximize={this.state.editorMaximize} 
                        handleChange={this.handleChange}
                        refreshText={this.refreshText}
                        clear={this.clear}
                        editorMaximize={this.editorMaximize}/>}
                    {!this.state.editorMaximize && <Preview 
                        userInput={this.state.userInput}
                        minimizeMaximize={this.state.previewMaximize}
                        previewMaximize={this.previewMaximize} />}
                </div>
                <Footer />
            </div>
        );
    };
};

class Editor extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div class="container">
                <div class="header" style={this.props.minimizeMaximize ? maximizeStyle : minimizeStyle}>
                    <h2><i class="fa fa-file-text"/>-Editor</h2>
                    <div class="btn" id="editor-btn">
                        <i 
                            title="Refresh Editor Area" 
                            onClick={this.props.refreshText}
                            class="fa fa-home fa-2x"/>
                        <i 
                            title="Clear Editor Area"
                            onClick={this.props.clear}
                            class="fa fa-trash fa-2x"/>
                        <i 
                            title="Expand/Compress Editor Area"
                            onClick={this.props.editorMaximize} 
                            class={this.props.minimizeMaximize ? minimizeIcon : maximizeIcon}/>
                    </div>
                </div>
                <textarea 
                    id="editor"
                    style={this.props.minimizeMaximize ? maximizeStyle : minimizeStyle}
                    onChange={this.props.handleChange}
                    value={this.props.userInput}/>
            </div>
        );
    };
};

class Preview extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div class="container">
                <div class="header" style={this.props.minimizeMaximize ? maximizeStyle : minimizeStyle}>
                    <h2><i class="fa fa-desktop"/>-Preview</h2>
                    <div class="btn">                        
                        <i 
                            title="Expand/Compress Preview Area"
                            onClick={this.props.previewMaximize} 
                            class={this.props.minimizeMaximize ? minimizeIcon : maximizeIcon}/>
                    </div>
                </div>
                <div
                    dangerouslySetInnerHTML={{
                    __html: marked(this.props.userInput, { renderer: renderer })
                    }}
                    id="preview"
                    style={this.props.minimizeMaximize ? maximizeStyle : minimizeStyle} />
            </div>          
        );
    };
};

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div id="portfolio">
                    <a href="https://www.linkedin.com/in/filipy-dellagnolo-477860215/" target="_blank" title="My Linkedin Page"><i class="fa fa-linkedin-square fa-2x"/></a>
                    <a href="https://github.com/filipy94/markdown-previewer" target="_blank" title="README"><i class="fa fa-file-text fa-2x"/></a>
                    <a href="https://github.com/filipy94" target="_blank" title="My Github Page"><i class="fa fa-github-square fa-2x"/></a>
                </div>
            </footer>
        );
    };
};

ReactDOM.render(<App />, document.getElementById("app"))