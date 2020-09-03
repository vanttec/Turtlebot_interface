// @flow
import * as React from 'react';
import ROSLIB from 'roslib';
import * as RosGraph from './../lib/RosGraph';
import NodeGraph from './ros-graph/NodeGraph';
import ButtonPanel from './ros-graph/ButtonPanel';
import RosGraphView from './../lib/RosGraphView';
import NodeList from './ros-graph/NodeList';
//import "../../node_modules/react-grid-layout/css/styles.css";
//import "../node_modules/react-resizable/css/styles.css";
import './../styles/Rosgraph.css';

//Cuando se activa funcion en App.js, se utiliza funcion Props para tomar el valor de ROS

type WidgetType = {
  element: React.Element<any>,
  id: string,
}
type TreeNode = {
  name: string,
  path: string,
  type: RosGraph.PrimitiveType,
}

type State = {
  autoExpand: boolean,
  layouts: ?Object,
  rosGraph: RosGraph.RosGraph,
  view: RosGraphView,
  widgets: Array<WidgetType>,
  rosGraph: RosGraph.RosGraph,
}


class Rosgraph extends React.Component<Props, State> {
    state = {
      autoExpand: true,
      layouts: {},
      view: new RosGraphView(),
      rosGraph: new RosGraph.RosGraph(),
      url: "ws://localhost:9090",
      widgets: [],
    }
    ros = null
    
    constructor(props: Props) {
      super(props);
      this.ros = new ROSLIB.Ros({
        url : this.state.url,
      })
      this.updateRosGraph()
  }
    updateRosGraph = () => {
      RosGraph.GetRosGraph(this.ros)
        .then(result => this.setState({
          rosGraph: result,
        }))
    }
    

    /**
     * @param treeNode.name {string} Node's label
     * @param treeNode.path {string} Node's unique identifier
     * @param treeNode.type {string} "node" or "topic" (TODO: move to enum)
     * @param toggled {boolean} True if the node should be expanded
     */
    setNodeActive = (treeNode: TreeNode, toggled: boolean = true) => {
      this.setState({
        view: this.state.view.setNodeActive(treeNode, toggled, this.state.rosGraph)
      })
    }
        /**
     * @param id {string} Unique identifier of the new widget
     * @param element {React.Node} The react component to add to the window
     * @param name {string} The label to give the widget
     */
    addWidget = (id: string, element: React.Element<any>) => {
      console.log("Adding: ", id, element)

      this.setState(prevState => ({
        widgets: [...prevState.widgets, {
          id: id,
          element: element
        }],
      }));
    }
    removeWidget = (id: string) => {
      console.log("Removing: ", id)
  
      const widgets = this.state.widgets.filter((item)=>{
        return item.id !== id;
      });
  
      this.setState({
        widgets: widgets,
      })
    }
    
    hideItem = (path: string, type: string) => {
      this.setState({view: this.state.view.hideItem(path, type)})
    }
    handleSearch = (event: {target: {value: string}}) => {
      this.setState({
        view: this.state.view.searchFor(event.target.value),
      })
    }
    handleSearchKey = (event: {keyCode: string}) => {
      // if (event.keyCode === 27) {
      //   this.setState({
      //     view: this.state.view.searchFor(""),
      //   })
      // }
    }
  render() {
    console.log("Graph");
    return (
 
    <div className="Graph">
      <div className="Sidebar">
        <h4 id="ROSID" className="graph_column">
          <div class="button" id="button-2" onClick={this.publish}>
            <div id="slide"></div>
            <h4>Menu!</h4>
          </div>
          <div className="ButtonPanel">
            <div className="Sidebar"> 
              <div style={{padding: 5, display: "flex"}}>
              <input type="text" className="InputTextBox" onChange={this.handleSearch} onKeyDown={this.handleSearchKey} placeholder="Search..." value={this.state.view.search}/>
              </div>
              <NodeList name="Node List" nodes={this.state.rosGraph.nodes} view={this.state.view} setNodeActive={this.setNodeActive} type="node"/>
              <NodeList name="Topic List" nodes={this.state.rosGraph.topics} view={this.state.view} setNodeActive={this.setNodeActive} type="topic"/>
              {this.state.view.active ? <ButtonPanel ros={this.ros} addWidget={this.addWidget} removeWidget={this.removeWidget} hideItem={this.hideItem} node={this.state.view.active} /> : false}
            </div>  
          </div>
        </h4>
      </div>
      <div className="Graph-main">
          <NodeGraph key={"node_graph"} rosGraph={this.state.rosGraph} view={this.state.view} setNodeActive={this.setNodeActive}/>
          <div className="ButtonPanel">
            <div data-tip="Refresh the entire ros graph" className="SmallButton ColorOne" onClick={this.updateRosGraph}>
                Refresh
            </div>
            <div className="SmallButton ColorTwo" onClick={() => {
                this.setState({
                    view: this.state.view.toggleDebug(),
                  })
              }}>
              {this.state.view.hideDebug ? "Show Debug" : "Hide Debug"}
            </div>
            <div className="SmallButton ColorOne" onClick={() => {
                this.setState({
                    view: this.state.view.unhideItems(),
                  })
              }}>
              Unhide
            </div>
          </div>
        </div>
      {this.state.widgets.length ? <div className="Sidebar">{this.state.widgets.map(widget => widget.element)}</div> : false}
    </div>
    );
  }
}

export default Rosgraph;
