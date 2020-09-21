import * as React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import moment from 'moment';
import FusionCharts from 'fusioncharts';
import ROSLIB from 'roslib';
// Load the charts module
import charts from 'fusioncharts/fusioncharts.charts';
import widgets from 'fusioncharts/fusioncharts.widgets';
import powercharts from 'fusioncharts/fusioncharts.powercharts';
import theme from 'fusioncharts/themes/fusioncharts.theme.ocean';
import ReactFC from 'react-fusioncharts';

import chartConfigs1, { first_chart_today, first_chart_month, first_chart_year } from '../chart-configs/dashboard_first_chart';
import chartConfigs2, { second_chart_today, second_chart_month, second_chart_year } from '../chart-configs/dashboard_second_chart';
import chartConfigs3, { third_chart_today, third_chart_month, third_chart_year } from '../chart-configs/dashboard_third_chart';
import chartConfigs4, { fourth_chart_today, fourth_chart_month, fourth_chart_year } from '../chart-configs/dashboard_fourth_chart';
import chartConfigs5, { fifth_chart_today, fifth_chart_month, fifth_chart_year } from '../chart-configs/dashboard_fifth_chart';
import chartConfigs6, { sixth_chart_today, sixth_chart_month, sixth_chart_year } from '../chart-configs/dashboard_sixth_chart';
import chartConfigs7, { seventh_chart_today, seventh_chart_month, seventh_chart_year } from '../chart-configs/dashboard_seventh_chart';

import emissionchart, { carbonfootprint_month_data, carbonfootprint_today_data, carbonfootprint_year_data, green_energy_stats_today_data, green_energy_stats_month_data, green_energy_stats_year_data } from '../emissions/emission_data';
import usagechart, { usage_today, usage_yesterday, usage_thismonth, usage_lastmonth, usage_thisyear, usage_lastyear } from '../usage/usage_data1';
import costchart, { cost_last_month, cost_this_month, cost_last_day, cost_this_day, cost_last_year, cost_this_year } from '../cost/cost_data1';
import UsageComponent from '../components/usage_component';
import { todayArr, todayElecSplit, todayGasSplit, monthArr, mElecSplit, mGasSplit, yearArr, yElecSplit, yGasSplit } from '../cost/cost_data1';
import EmissionComponent from '../components/emission_component';
import CostComponent from '../components/cost_component';
import AppliancesComponent from '../components/appliances_component';
import appliancechart, { buildDataYesterday, buildDataLastMonth, buildDataThisMonth, buildDataLastYear, buildDataThisYear } from '../appliances/appliances_data';
import { buildDataToday } from '../appliances/appliances_data';
import Graph from '../components/ros-graph';
import * as utils from '../utils/utils';
import { pdArr, cdArr, pmArr, cmArr, pyArr, cyArr, pdgeArr, cdgeArr, cmgeArr, pygeArr, cygeArr, pmgeArr } from '../emissions/emission_data';

charts(FusionCharts)
widgets(FusionCharts)
powercharts(FusionCharts)
theme(FusionCharts)

FusionCharts.options.creditLabel = false;
//Cuando se activa funcion en App.js, se utiliza funcion Props para tomar el valor de ROS
type Props = {
    ros: ROSLIB.Ros,
}


class ChartDetail extends React.Component<Props> {


    componentDidMount() {
        console.log("holamundo");
        console.log(document.getElementById("month").click());
        document.getElementById("month").click();
        setTimeout(function () {
            document.getElementById("month").click();
        }, 300);

    }

    componentDidUpdate() {
        console.log("hello world");
        var t = document.getElementById("today");
        var m = document.getElementById("month");
        var y = document.getElementById("year");


        if (this.props.user.id === 1) {

            setTimeout(function () {
                document.getElementById("month").click();
            }, 300);


            ReactDOM.unmountComponentAtNode(document.getElementById('chart1'));

            document.getElementById("parent1").setAttribute("class", "col-lg-6 col-xl-4");
            document.getElementById("text1").innerHTML = "COST PREDICTED"

         /*   document.getElementById("Tutorial1: Rospy-tutorials").setAttribute("class", "left-option active");
            document.getElementById("Cost").setAttribute("class", "left-option");
            document.getElementById("Tutorial 3: SMACH").setAttribute("class", "left-option");
            document.getElementById("Usage-by-rooms").setAttribute("class", "left-option");
            document.getElementById("Emissions").setAttribute("class", "left-option");*/

            document.getElementById("bd-docs-nav").setAttribute("class", "bd-links collapse");

            ReactDOM.unmountComponentAtNode(document.getElementById('chart2'));
            document.getElementById("parent2").style.display = "block";
            document.getElementById("parent2").style.width = "auto";
            document.getElementById("parent2").style.height = "auto";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart3'));
            document.getElementById("parent3").style.display = "block";
            document.getElementById("parent3").style.width = "auto";
            document.getElementById("parent3").style.height = "auto";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart4'));
            document.getElementById("parent4").style.display = "block";
            document.getElementById("parent4").style.width = "auto";
            document.getElementById("parent4").style.height = "auto";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart5'));
            document.getElementById("parent5").style.display = "block";
            document.getElementById("parent5").style.width = "auto";
            document.getElementById("parent5").style.height = "auto";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart6'));
            document.getElementById("parent6").style.display = "block";
            document.getElementById("parent6").style.width = "auto";
            document.getElementById("parent6").style.height = "auto";




            ReactDOM.render(
                <ReactFC {...chartConfigs1} />,
                document.getElementById('chart1'));

            ReactDOM.render(
                <ReactFC {...chartConfigs2} />,
                document.getElementById('chart2'));

            ReactDOM.render(
                <ReactFC {...chartConfigs3} />,
                document.getElementById('chart3'));

            ReactDOM.render(
                <ReactFC {...chartConfigs4} />,
                document.getElementById('chart4'));

            ReactDOM.render(
                <ReactFC {...chartConfigs5} />,
                document.getElementById('chart5'));
            ReactDOM.render(
                <ReactFC {...chartConfigs6} />,
                document.getElementById('chart6'));

            ReactDOM.render(
                <ReactFC {...chartConfigs7} />,
                document.getElementById('chart7'));

            // logic for today button when the user is on dashboard

            // var t = document.getElementById("today");

            t.onclick = function () {

                document.getElementById("date").innerHTML = moment().format('MMMM, Do YYYY');


                var todaynewdata1 = first_chart_today;
                var todaynewdata2 = second_chart_today;
                var todaynewdata3 = third_chart_today;
                var todaynewdata4 = fourth_chart_today;
                var todaynewdata5 = fifth_chart_today;
                var todaynewdata6 = sixth_chart_today;
                var todaynewdata7 = seventh_chart_today;

                FusionCharts.items['mychart1'].setJSONData(todaynewdata1);
                FusionCharts.items['mychart2'].setJSONData(todaynewdata2);
                FusionCharts.items['mychart3'].setJSONData(todaynewdata3);
                FusionCharts.items['mychart4'].setJSONData(todaynewdata4);
                FusionCharts.items['mychart5'].setJSONData(todaynewdata5);
                FusionCharts.items['mychart6'].setJSONData(todaynewdata6);
                FusionCharts.items['mychart10'].setJSONData(todaynewdata7);

            };


            //logic for month button when the user is on dashboard 
            // var m = document.getElementById("month");

            m.onclick = function () {
                document.getElementById("date").innerHTML = moment().format('MMMM YYYY');

                var monthnewdata1 = first_chart_month;
                var monthnewdata2 = second_chart_month;
                var monthnewdata3 = third_chart_month;
                var monthnewdata4 = fourth_chart_month;
                var monthnewdata5 = fifth_chart_month;
                var monthnewdata6 = sixth_chart_month;
                var monthnewdata7 = seventh_chart_month;

                FusionCharts.items['mychart1'].setJSONData(monthnewdata1);
                FusionCharts.items['mychart2'].setJSONData(monthnewdata2);
                FusionCharts.items['mychart3'].setJSONData(monthnewdata3);
                FusionCharts.items['mychart4'].setJSONData(monthnewdata4);
                FusionCharts.items['mychart5'].setJSONData(monthnewdata5);
                FusionCharts.items['mychart6'].setJSONData(monthnewdata6);
                FusionCharts.items['mychart10'].setJSONData(monthnewdata7);
            };

            setTimeout(function () {
                document.getElementById("month").click();
            });
            //logic for year button when the user is on dashboard



            y.onclick = function () {
                document.getElementById("date").innerHTML = moment().format('YYYY');

                var yearnewdata1 = first_chart_year;
                var yearnewdata2 = second_chart_year;
                var yearnewdata3 = third_chart_year;
                var yearnewdata4 = fourth_chart_year;
                var yearnewdata5 = fifth_chart_year;
                var yearnewdata6 = sixth_chart_year;
                var yearnewdata7 = seventh_chart_year;


                FusionCharts.items['mychart1'].setJSONData(yearnewdata1);
                FusionCharts.items['mychart2'].setJSONData(yearnewdata2);
                FusionCharts.items['mychart3'].setJSONData(yearnewdata3);
                FusionCharts.items['mychart4'].setJSONData(yearnewdata4);
                FusionCharts.items['mychart5'].setJSONData(yearnewdata5);
                FusionCharts.items['mychart6'].setJSONData(yearnewdata6);
                FusionCharts.items['mychart10'].setJSONData(yearnewdata7);
            };
        }

        else if (this.props.user.id === 2) {

            utils.disposeChart(FusionCharts, "mychart8")

            ReactDOM.unmountComponentAtNode(document.getElementById('chart1'));

            document.getElementById("parent1").setAttribute("class", "chart1-app col-lg-12 col-xl-12");
            document.getElementById("text1").innerHTML = "Tutorial 2: Navegation & Vision";

            /**
            document.getElementById("Dashboard").setAttribute("class", "left-option");
            document.getElementById("Cost").setAttribute("class", "left-option active");
            document.getElementById("Tutorial 3: SMACH").setAttribute("class", "left-option");
            document.getElementById("Usage-by-rooms").setAttribute("class", "left-option");
            document.getElementById("Emissions").setAttribute("class", "left-option");
            **/

            document.getElementById("bd-docs-nav").setAttribute("class", "bd-links collapse");


            ReactDOM.unmountComponentAtNode(document.getElementById('chart2'));

            document.getElementById("parent2").style.display = "none";
            document.getElementById("parent2").style.width = "0px";
            document.getElementById("parent2").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart3'));
            document.getElementById("parent3").style.display = "none";
            document.getElementById("parent3").style.width = "0px";
            document.getElementById("parent3").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart4'));
            document.getElementById("parent4").style.display = "none";
            document.getElementById("parent4").style.width = "0px";
            document.getElementById("parent4").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart5'));
            document.getElementById("parent5").style.display = "none";
            document.getElementById("parent5").style.width = "0px";
            document.getElementById("parent5").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart6'));
            document.getElementById("parent6").style.display = "none";
            document.getElementById("parent6").style.width = "0px";
            document.getElementById("parent6").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart7'));
            document.getElementById("parent6").style.display = "none";
            document.getElementById("parent6").style.width = "0px";
            document.getElementById("parent6").style.height = "0px";

            document.getElementById("chart1").style = "padding-left:10%;"
            const tutorial = (
                <div>
                    <h1>Package used for manual navigation</h1>
                    <h2>Teleop_twist_keyboard</h2>
                    <a href="http://wiki.ros.org/teleop_twist_keyboard">Link to ROS Wiki Teleop Keyboard</a>
                    <p>
                        We’ll be controlling movement using the Teleop Twist Keyboard package. Similarily,
                        you could control movement with an Xbox or Playstation controller, using Teleop Twist 
                        Joy (or another compatible joystick package).
                    </p>

                    <img src={require("../assets/tut2image1.png")} style={{width:"90%", height:"100%"}}/>

                    <h1>Package used for object identification</h1>
                    <h2>Find_object_2d</h2>
                    <a href="http://wiki.ros.org/find_object_2d">Link to ROS Wiki Find Object 2D</a>
                    <p>
                        Simple Qt interface to try OpenCV implementations of SIFT, SURF, FAST, BRIEF and 
                        other feature detectors and descriptors. Using a webcam, objects can be detected 
                        and published on a ROS topic with ID and position (pixels in the image). 
                        This package is a ROS integration of the <a href="http://introlab.github.io/find-object/">Find-Object</a> 
                        application.
                    </p>
                    <h1>3D position of the objects</h1>
                    <p>
                        When using Kinect-like sensors, 3D position of the objects can be computed in 
                        Find-Object ros-pkg.
                    </p>
                    
                    <img src={require("../assets/tut2image2.png")} style={{width:"90%", height:"100%"}}/>
                    <img src={require("../assets/tut2image3.png")} style={{width:"90%", height:"100%"}}/>

                    <h1>Robot for this tutorial</h1>
                    <h2>Rosbot 2.0</h2>
                    <a href="https://husarion.com/">Link to Rosbot 2.0 page</a>
                    <h2>

                    </h2>

                    <img src={require("../assets/rosbot2.0.png")} style={{width:"80%", height:"80%"}}/>
                </div>
            );

            ReactDOM.render(tutorial, document.getElementById('chart1'));
            
        }

        else if (this.props.user.id === 3) {
            utils.disposeChart(FusionCharts, "mychart12")

            ReactDOM.unmountComponentAtNode(document.getElementById('chart1'));

            document.getElementById("parent1").setAttribute("class", "chart1-app col-lg-12 col-xl-12");
            document.getElementById("text1").innerHTML = "Tutorial 3: SMACH";

            // document.getElementById("Dashboard").setAttribute("class", "left-option");
            // document.getElementById("Cost").setAttribute("class", "left-option");
            // document.getElementById("Tutorial 3: SMACH").setAttribute("class", "left-option active");
            // document.getElementById("Usage-by-rooms").setAttribute("class", "left-option");
            // document.getElementById("Emissions").setAttribute("class", "left-option");

            document.getElementById("bd-docs-nav").setAttribute("class", "bd-links collapse");


            ReactDOM.unmountComponentAtNode(document.getElementById('chart2'));
            document.getElementById("parent2").style.display = "none";
            document.getElementById("parent2").style.width = "0px";
            document.getElementById("parent2").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart3'));
            document.getElementById("parent3").style.display = "none";
            document.getElementById("parent3").style.width = "0px";
            document.getElementById("parent3").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart4'));
            document.getElementById("parent4").style.display = "none";
            document.getElementById("parent4").style.width = "0px";
            document.getElementById("parent4").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart5'));
            document.getElementById("parent5").style.display = "none";
            document.getElementById("parent5").style.width = "0px";
            document.getElementById("parent5").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart6'));
            document.getElementById("parent6").style.display = "none";
            document.getElementById("parent6").style.width = "0px";
            document.getElementById("parent6").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart7'));
            document.getElementById("parent6").style.display = "none";
            document.getElementById("parent6").style.width = "0px";
            document.getElementById("parent6").style.height = "0px";

            // to be written
            var test = document.createElement("div");
            var title = document.createElement("p1");
            title.nodeValue = "How to make a state machine";
            test.appendChild(title);

            var properties = {
                type: "scrollstackedcolumn2d",
                width: "50%",
                id: "tutorial3",
                height: 500
            }

            // var chart = document.getElementById("chart1");
            // var title = document.createElement("h1");
            // var body = document.createElement("div");
            // var instructions_txt = document.createElement("p1");
            // title.textContent = "Package used to make a state machine:";
            // instructions_txt.textContent = "SMACH is a task-level architecture for rapidly creating complex robot behavior. At its core, SMACH is a ROS-independent Python library to build hierarchical state machines. SMACH is a new library that takes advantage of very old concepts in order to quickly create robust robot behavior with maintainable and modular code.";
            // body.appendChild(instructions_txt);
            document.getElementById("chart1").style = "padding-left:10%;"
            const tutorial = (
                <div>
                    <h1>Package used to create a state machine</h1>
                    <a href="http://wiki.ros.org/smach">Link to SMACH</a>
                    <p>
                        SMACH is a task-level architecture for rapidly creating
                        complex robot behavior. At its core, SMACH is a ROS-independent Python
                        library to build hierarchical state machines. SMACH is a new library
                        that takes advantage of very old concepts in order to
                        quickly create robust robot behavior with maintainable and modular code.
                    </p>
                    <h2>
                        When should I use SMACH?
                        </h2>
                    <p>
                        SMACH is useful when you want a robot to execute some complex plan, where all possible
                        states and state transitions can be described explicitly. This basically takes the hacking out
                        of hacking together different modules to make systems like mobile robotic manipulators do interesting things.
                    </p>
                    <ul>
                        <li>
                            Fast prototyping: The straightforward Python-based SMACH syntax makes it easy to
                            quickly prototype a state machine and start running it.
                        </li>
                        <li>
                            Complex state machines: SMACH allows you to design,
                            maintain and debug large, complex hierarchical state machines.
                            You can find an
                            example of a complex hierarchical state machine here.
                        </li>
                        <li>
                            ntrospection: SMACH gives you full
                            introspection in your state machines,
                            state transitions, data
                            flow, etc. See the smach_viewer for more details.
                        </li>
                    </ul>
                    <h2>When should I NOT use SMACH?</h2>
                    <ul>
                        <li>
                            Unstructured tasks: SMACH will fall short as
                            the scheduling of your task becomes less structured.
                        </li>
                        <li>
                            Low-level systems:
                            SMACH is not meant to be used as a
                            state machine for low-level systems that
                            require high efficiency,
                            SMACH is a task-level architecture.
                        </li>
                        <li>
                            Smash: Do not use SMACH when
                            you want to smash something, for that use smash.
                        </li>
                    </ul>
                    <h2>Is SMACH only a finite state machine library?</h2>
                    <ul>
                        <li>
                            You can build a finite state machine using
                            SMACH, but SMACH can do much more. SMACH is a
                            library for task-level execution and coordination,
                            and provides several types of "state containers".
                            One such container, is a finite state machine,
                            but this container can also be a state in another container.
                            See the tutorials page
                            for a list of containers and states built into SMACH.
                        </li>
                    </ul>
                    <h2>When should I NOT use SMACH?</h2>
                    <ul>
                        <li>
                            Unstructured tasks: SMACH will fall short as
                            the scheduling of your task becomes less structured.
                            </li>
                        <li>
                            Low-level systems: SMACH is
                            not meant to be used as a state machine f
                            or low-level systems that require high efficiency,
                            SMACH is a task-level architecture.
                            </li>
                        <li>
                            Smash: Do not use SMACH when you want
                            to smash something, for that use smash.
                            </li>
                    </ul>

                    <h2>Is SMACH only a finite state machine library? </h2>
                    <ul>
                        <li>
                            You can build a finite state machine using SMACH,
                            but SMACH can do much more. SMACH is a library for
                            task-level execution and coordination, and provides
                            several types of "state containers". One such container,
                            is a finite state machine, but this container can also be
                            a state in another container. See the tutorials
                            page for a list of containers and states built into SMACH.
                            </li>
                    </ul>
                    <h2>Package used for robot navigation planning:</h2>
                    <h2><i><a href="http://wiki.ros.org/dwa_local_planner">DWA_LOCAL_PLANNER:</a></i></h2>
                    <img src={require("../assets/tut3image1.png")} style={{ max_width: "100%", height: "auto" }} />
                    <p>
                        This package provides an implementation of the Dynamic Window
                        Approach to local robot navigation on a plane.
                        Given a global plan to follow and a costmap,
                        the local planner produces velocity commands to send to a
                        mobile base. This package supports any robot who's footprint
                        can be represented as a convex polygon or cicrle,
                        and exposes its configuration as ROS parameters that can
                        be set in a launch file. The parameters for this planner
                        are also dynamically reconfigurable. This package's ROS
                        wrapper adheres to the BaseLocalPlanner interface specified
                        in the nav_core package..
                    </p>

                    <p>
                        The dwa_local_planner package provides a
                        controller that drives a mobile base in the plane.
                        This controller serves to connect the path planner to
                        the robot. Using a map, the planner creates a kinematic
                        trajectory for the robot to get from a start to a goal
                        location. Along the way, the planner creates, at least
                        locally around the robot, a value function, represented
                        as a grid map. This value function encodes the costs of
                        traversing through the grid cells. The controller's
                        job is to use this value function to determine dx,dy,dtheta
                        velocities to send to the robot.
                    </p>
                    <br />

                    <h3>
                        The basic idea of the Dynamic Window Approach (DWA) algorithm is as follows:
                    </h3>
                    <ol>
                        <li>
                            Discretely sample in the robot's control space (dx,dy,dtheta)
                        </li>
                        <li>
                            For each sampled velocity, perform forward simulation from the robot's current state to predict what would happen if the sampled velocity were applied for some (short) period of time.
                        </li>
                        <li>
                            Evaluate (score) each trajectory resulting from the
                            forward simulation, using a metric that incorporates
                            characteristics such as: proximity to obstacles,
                            proximity to the goal, proximity to the global path,
                            and speed. Discard illegal trajectories (those that
                            collide with obstacles).
                        </li>
                        <li>
                            Pick the highest-scoring trajectory and send the associated velocity to the mobile base
                        </li>
                        <li>
                            Rinse and repeat.
                        </li>
                    </ol>

                    <h2>TURTLEBOT 2</h2>
                    <h3>(the robot we're using)</h3>

                    <img src={require("../assets/turtlebot2.png")} style={{width:"15%", height:"15%"}}/>
                </div>
            );

            ReactDOM.render(
                tutorial,
                document.getElementById('chart1'));

            // chart.appendChild(title);
            // chart.appendChild(body);
            console.log("test");

        }

        else if (this.props.user.id === 4) {
            utils.disposeChart(FusionCharts, "mychart9")
            ReactDOM.unmountComponentAtNode(document.getElementById('chart1'));
            //document.getElementById("date").style.display = "none";
            document.getElementById("parent1").setAttribute("class", "chart1-us col-lg-12 col-xl-12");
            document.getElementById("text1").innerHTML = "USAGE BY ROOMS";

            document.getElementById("Tutorial1: Rospy-tutorials").setAttribute("class", "left-option");
            document.getElementById("Cost").setAttribute("class", "left-option");
            document.getElementById("Tutorial 3: SMACH").setAttribute("class", "left-option");
            document.getElementById("Usage-by-rooms").setAttribute("class", "left-option active");
            document.getElementById("Emissions").setAttribute("class", "left-option");

            document.getElementById("bd-docs-nav").setAttribute("class", "bd-links collapse");


            ReactDOM.unmountComponentAtNode(document.getElementById('chart2'));
            document.getElementById("parent2").style.display = "none";
            document.getElementById("parent2").style.width = "0px";
            document.getElementById("parent2").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart3'));
            document.getElementById("parent3").style.display = "none";
            document.getElementById("parent3").style.width = "0px";
            document.getElementById("parent3").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart4'));
            document.getElementById("parent4").style.display = "none";
            document.getElementById("parent4").style.width = "0px";
            document.getElementById("parent4").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart5'));
            document.getElementById("parent5").style.display = "none";
            document.getElementById("parent5").style.width = "0px";
            document.getElementById("parent5").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart6'));
            document.getElementById("parent6").style.display = "none";
            document.getElementById("parent6").style.width = "0px";
            document.getElementById("parent6").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart7'));
            document.getElementById("parent6").style.display = "none";
            document.getElementById("parent6").style.width = "0px";
            document.getElementById("parent6").style.height = "0px";

            ReactDOM.render(
                <UsageComponent usagechart={usagechart} />,
                document.getElementById('chart1'));

            t.onclick = function () {
                document.getElementById("date").innerHTML = moment().format('MMMM, Do YYYY');
                window.selectedperiod = "today";

                document.getElementById("u1").innerHTML = "TODAY";
                document.getElementById("u2").innerHTML = "YESTERDAY";


                if (window.b2selected) {

                    var usageyesterday = usage_yesterday;
                    FusionCharts.items['mychart9'].setJSONData(usageyesterday);
                }
                else {

                    var usagetoday = usage_today;
                    FusionCharts.items['mychart9'].setJSONData(usagetoday);
                }
            }

            m.onclick = function () {

                window.selectedperiod = "month";
                document.getElementById("date").innerHTML = moment().format('MMMM YYYY');
                document.getElementById("u1").innerHTML = "THIS MONTH";
                document.getElementById("u2").innerHTML = "LAST MONTH";

                if (window.b2selected) {
                    var usagelastmonth = usage_lastmonth;
                    FusionCharts.items['mychart9'].setJSONData(usagelastmonth);
                }
                else {

                    var usagethismonth = usage_thismonth;
                    FusionCharts.items['mychart9'].setJSONData(usagethismonth);
                }
            }

            setTimeout(function () {
                document.getElementById("month").click();
            });


            y.onclick = function () {
                window.selectedperiod = "year";
                document.getElementById("date").innerHTML = moment().format('YYYY');
                document.getElementById("u1").innerHTML = "THIS YEAR";
                document.getElementById("u2").innerHTML = "LAST YEAR";


                if (window.b2selected) {

                    var usagelastyear = usage_lastyear;
                    FusionCharts.items['mychart9'].setJSONData(usagelastyear);
                }
                else {
                    var usagethisyear = usage_thisyear;
                    FusionCharts.items['mychart9'].setJSONData(usagethisyear);
                }
            }




        }

        // Emission Option Logic.

        else if (this.props.user.id === 5) {
            utils.disposeChart(FusionCharts, "mychart7")
            ReactDOM.unmountComponentAtNode(document.getElementById('chart1'));
            // document.getElementById("date").style.display = "none";
            document.getElementById("parent1").setAttribute("class", "chart1-em col-lg-12 col-xl-12");
            document.getElementById("text1").innerHTML = "EMISSIONS";

            var cper;
            document.getElementById("Tutorial1: Rospy-tutorials").setAttribute("class", "left-option");
            document.getElementById("Cost").setAttribute("class", "left-option");
            document.getElementById("Tutorial 3: SMACH").setAttribute("class", "left-option");
            document.getElementById("Usage-by-rooms").setAttribute("class", "left-option");
            document.getElementById("Emissions").setAttribute("class", "left-option active");

            document.getElementById("bd-docs-nav").setAttribute("class", "bd-links collapse");


            ReactDOM.unmountComponentAtNode(document.getElementById('chart2'));
            document.getElementById("parent2").style.display = "none";
            document.getElementById("parent2").style.width = "0px";
            document.getElementById("parent2").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart3'));
            document.getElementById("parent3").style.display = "none";
            document.getElementById("parent3").style.width = "0px";
            document.getElementById("parent3").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart4'));
            document.getElementById("parent4").style.display = "none";
            document.getElementById("parent4").style.width = "0px";
            document.getElementById("parent4").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart5'));
            document.getElementById("parent5").style.display = "none";
            document.getElementById("parent5").style.width = "0px";
            document.getElementById("parent5").style.height = "0px";

            ReactDOM.unmountComponentAtNode(document.getElementById('chart6'));
            document.getElementById("parent6").style.display = "none";
            document.getElementById("parent6").style.width = "0px";
            document.getElementById("parent6").style.height = "0px";


            //utils.disposeChart('mychart7');
            ReactDOM.render(

                <EmissionComponent emissionchart={emissionchart} />,
                document.getElementById('chart1'));

            // logic for today button       
            // var t1 = document.getElementById("today");


            t.onclick = function () {
                window.selectedperiod = "today";
                document.getElementById("date").innerHTML = moment().format('MMMM, Do YYYY');
                if (window.b2selected) {
                    var cpCalc = 0;
                    for (var i = 0; i < pdgeArr.length; i++) {
                        cpCalc = cpCalc + pdgeArr[i];
                    }

                    // so far today kpi
                    // eslint-disable-next-line
                    var cHour = parseInt(moment().format('H'));
                    var sftCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < cHour; i++) {
                        sftCalc = sftCalc + cdgeArr[i];
                    }

                    // predicted today kpi

                    var ptcpCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < cdgeArr.length; i++) {
                        ptcpCalc = ptcpCalc + cdgeArr[i];
                    }

                    // emisson change kpi

                    if (ptcpCalc > cpCalc) {
                        var cper = Math.round(([(ptcpCalc / cpCalc) * 100] - 100) * 100) / 100;
                        document.getElementById("em-tablecell-value4").innerHTML = cper + "% <span style='color: #B4F9A1;'>▲</span>";
                    } else if (ptcpCalc < cpCalc) {
                        cper = Math.round((100 - [(ptcpCalc / cpCalc) * 100]) * 100) / 100;
                        document.getElementById("em-tablecell-value4").innerHTML = cper + "% <span style='color: #EF5052;'>▼</span>";
                    }

                    var emtoday2 = green_energy_stats_today_data;
                    FusionCharts.items['mychart7'].setJSONData(emtoday2);


                    document.getElementById("em-tablecell-title1").innerHTML = moment().subtract(1, 'day').format('MMMM D');
                    document.getElementById("em-tablecell-value1").innerHTML = Math.round(cpCalc * 100) / 100 + "   kWh";

                    document.getElementById("em-tablecell-title2").innerHTML = "So Far Today";
                    document.getElementById("em-tablecell-value2").innerHTML = Math.round(sftCalc * 100) / 100 + "   kWh";

                    document.getElementById("em-tablecell-title3").innerHTML = "Predicted Today";
                    document.getElementById("em-tablecell-value3").innerHTML = Math.round(ptcpCalc * 100) / 100 + "   kWh";

                    document.getElementById("em-tablecell-title4").innerHTML = "Change in Emissions";
                }
                else {
                    var emtoday = carbonfootprint_today_data;
                    FusionCharts.items['mychart7'].setJSONData(emtoday);


                    cpCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < pdArr.length; i++) {
                        cpCalc = cpCalc + pdArr[i];
                    }

                    // so far today kpi
                    // eslint-disable-next-line
                    var cHour = parseInt(moment().format('H'));
                    sftCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < cHour; i++) {
                        sftCalc = sftCalc + pdArr[i];
                    }

                    ptcpCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < cdArr.length; i++) {
                        ptcpCalc = ptcpCalc + cdArr[i];
                    }


                    // emisson change kpi

                    if (ptcpCalc > cpCalc) {
                        cper = Math.round(([(ptcpCalc / cpCalc) * 100] - 100) * 100) / 100;
                        document.getElementById("em-tablecell-value4").innerHTML = cper + "% <span style='color: #EF5052;'>▲</span>";
                    } else if (ptcpCalc < cpCalc) {
                        cper = Math.round((100 - [(ptcpCalc / cpCalc) * 100]) * 100) / 100;
                        document.getElementById("em-tablecell-value4").innerHTML = cper + "% <span style='color: #B4F9A1;'>▼</span>";
                    }


                    document.getElementById("em-tablecell-title1").innerHTML = moment().subtract(1, 'day').format('MMMM D');
                    document.getElementById("em-tablecell-value1").innerHTML = Math.round(cpCalc * 100) / 100 + "  kg";

                    document.getElementById("em-tablecell-title2").innerHTML = "So Far Today";
                    document.getElementById("em-tablecell-value2").innerHTML = Math.round(sftCalc * 100) / 100 + "  kg";

                    document.getElementById("em-tablecell-title3").innerHTML = "Predicted Today";
                    document.getElementById("em-tablecell-value3").innerHTML = Math.round(ptcpCalc * 100) / 100 + "  kg";

                    document.getElementById("em-tablecell-title4").innerHTML = "Change in Emissions";


                }
            };

            // logic for month

            // var m1 = document.getElementById("month");

            m.onclick = function () {

                window.selectedperiod = "month";
                document.getElementById("date").innerHTML = moment().format('MMMM YYYY');

                if (window.b2selected) {

                    var cpCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < moment().subtract(1, 'month').daysInMonth(); i++) {
                        cpCalc = cpCalc + pmgeArr[i];
                    }

                    // so far this month kpi
                    // eslint-disable-next-line
                    var cDate = parseInt(moment().format('D'));
                    var sfmCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < cDate; i++) {
                        sfmCalc = sfmCalc + cmgeArr[i];
                    }


                    // predicted this month kpi

                    var pmcpCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < moment().daysInMonth(); i++) {
                        pmcpCalc = pmcpCalc + cmgeArr[i];
                    }


                    // emisson change kpi

                    if (pmcpCalc > cpCalc) {
                        var cper = Math.round(([(pmcpCalc / cpCalc) * 100] - 100) * 100) / 100;
                        document.getElementById("em-tablecell-value4").innerHTML = cper + "% <span style='color: #B4F9A1;'>▲</span>";
                    } else if (pmcpCalc < cpCalc) {
                        cper = Math.round((100 - [(pmcpCalc / cpCalc) * 100]) * 100) / 100;
                        document.getElementById("em-tablecell-value4").innerHTML = cper + "% <span style='color: #EF5052;'>▼</span>";
                    }

                    var emmonth2 = green_energy_stats_month_data;
                    FusionCharts.items['mychart7'].setJSONData(emmonth2);

                    document.getElementById("em-tablecell-title1").innerHTML = moment().subtract(1, 'month').format('MMMM');
                    document.getElementById("em-tablecell-value1").innerHTML = Math.round(cpCalc * 100) / 100 + "   kWh";

                    document.getElementById("em-tablecell-title2").innerHTML = "So Far This Month";
                    document.getElementById("em-tablecell-value2").innerHTML = Math.round(sfmCalc * 100) / 100 + "   kWh"

                    document.getElementById("em-tablecell-title3").innerHTML = "Predicted This Month";
                    document.getElementById("em-tablecell-value3").innerHTML = Math.round(pmcpCalc * 100) / 100 + "  kWh"

                    document.getElementById("em-tablecell-title4").innerHTML = "Change in Emissions";

                }
                else {
                    var emmonth = carbonfootprint_month_data;

                    // last month's kpi

                    cpCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < moment().subtract(1, 'month').daysInMonth(); i++) {
                        cpCalc = cpCalc + pmArr[i];
                    }

                    // so far this month kpi
                    // eslint-disable-next-line
                    var cDate = parseInt(moment().format('D'));
                    sfmCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < cDate; i++) {
                        sfmCalc = sfmCalc + cmArr[i];
                    }


                    // predicted this month kpi

                    pmcpCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < moment().daysInMonth(); i++) {
                        pmcpCalc = pmcpCalc + cmArr[i];
                    }


                    // emisson change kpi

                    if (pmcpCalc > cpCalc) {
                        cper = Math.round(([(pmcpCalc / cpCalc) * 100] - 100) * 100) / 100;
                        document.getElementById("em-tablecell-value4").innerHTML = cper + "% <span style='color: #EF5052;'>▲</span>"
                    } else if (pmcpCalc < cpCalc) {
                        cper = Math.round((100 - [(pmcpCalc / cpCalc) * 100]) * 100) / 100;
                        document.getElementById("em-tablecell-value4").innerHTML = cper + "% <span style='color: #B4F9A1;'>▼</span>"
                    }



                    FusionCharts.items['mychart7'].setJSONData(emmonth);



                    document.getElementById("em-tablecell-title1").innerHTML = moment().subtract(1, 'month').format('MMMM');
                    document.getElementById("em-tablecell-value1").innerHTML = Math.round(cpCalc * 100) / 100 + "  kg";

                    document.getElementById("em-tablecell-title2").innerHTML = "So Far This Month";
                    document.getElementById("em-tablecell-value2").innerHTML = Math.round(sfmCalc * 100) / 100 + "  kg"

                    document.getElementById("em-tablecell-title3").innerHTML = "Predicted This Month";
                    document.getElementById("em-tablecell-value3").innerHTML = Math.round(pmcpCalc * 100) / 100 + "  kg"

                    document.getElementById("em-tablecell-title4").innerHTML = "Change in Emissions";

                }
            };

            setTimeout(function () {
                document.getElementById("month").click();
            });


            //logic for year

            // var y1 = document.getElementById("year");

            y.onclick = function () {
                window.selectedperiod = "year";
                document.getElementById("date").innerHTML = moment().format('YYYY');
                if (window.b2selected) {

                    var cpCalc = 0;
                    for (var i = 0; i < pygeArr.length; i++) {
                        cpCalc = cpCalc + pygeArr[i];
                    }


                    // so far this year kpi
                    // eslint-disable-next-line
                    var cMonth = parseInt(moment().format('M'));
                    var sfyCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < cMonth; i++) {
                        sfyCalc = sfyCalc + cygeArr[i];
                    }


                    // predicted this year kpi

                    var pycpCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < 12; i++) {
                        pycpCalc = pycpCalc + cygeArr[i];
                    }


                    // emisson change kpi

                    if (pycpCalc > cpCalc) {
                        cper = Math.round(([(pycpCalc / cpCalc) * 100] - 100) * 100) / 100;
                        document.getElementById("em-tablecell-value4").innerHTML = cper + "% <span style='color: #B4F9A1;'>▲</span>";
                    } else if (pycpCalc < cpCalc) {
                        cper = Math.round((100 - [(pycpCalc / cpCalc) * 100]) * 100) / 100;
                        document.getElementById("em-tablecell-value4").innerHTML = cper + "% <span style='color: #EF5052;'>▼</span>";
                    }

                    var emyear2 = green_energy_stats_year_data;
                    FusionCharts.items['mychart7'].setJSONData(emyear2);

                    document.getElementById("em-tablecell-title1").innerHTML = moment().subtract(1, 'year').format('YYYY');
                    document.getElementById("em-tablecell-value1").innerHTML = Math.round(cpCalc * 100) / 100 + "  kWh";

                    document.getElementById("em-tablecell-title2").innerHTML = "So Far This Year";
                    document.getElementById("em-tablecell-value2").innerHTML = Math.round(sfyCalc * 100) / 100 + "  kWh";

                    document.getElementById("em-tablecell-title3").innerHTML = "Predicted This Year";
                    document.getElementById("em-tablecell-value3").innerHTML = Math.round(pycpCalc * 100) / 100 + "  kWh";

                    document.getElementById("em-tablecell-title4").innerHTML = "Change in Emissions";
                }
                else {
                    var emyear = carbonfootprint_year_data;

                    // last year's kpi

                    cpCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < pyArr.length; i++) {
                        cpCalc = cpCalc + pyArr[i];
                    }


                    // so far this year kpi
                    // eslint-disable-next-line
                    cMonth = parseInt(moment().format('M'));
                    sfyCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < cMonth; i++) {
                        sfyCalc = sfyCalc + cyArr[i];
                    }


                    // predicted this year kpi

                    pycpCalc = 0;
                    // eslint-disable-next-line
                    for (var i = 0; i < 12; i++) {
                        pycpCalc = pycpCalc + cyArr[i];
                    }


                    // emisson change kpi

                    if (pycpCalc > cpCalc) {
                        cper = Math.round(([(pycpCalc / cpCalc) * 100] - 100) * 100) / 100;
                        document.getElementById("em-tablecell-value4").innerHTML = cper + "% <span style='color: #EF5052;'>▲</span>"
                    } else if (pycpCalc < cpCalc) {
                        cper = Math.round((100 - [(pycpCalc / cpCalc) * 100]) * 100) / 100;
                        document.getElementById("em-tablecell-value4").innerHTML = cper + "% <span style='color: #B4F9A1;'>▼</span>"
                    }


                    FusionCharts.items['mychart7'].setJSONData(emyear);

                    document.getElementById("em-tablecell-title1").innerHTML = moment().subtract(1, 'year').format('YYYY');
                    document.getElementById("em-tablecell-value1").innerHTML = Math.round(cpCalc * 100) / 100 + "  kg";

                    document.getElementById("em-tablecell-title2").innerHTML = "So Far This Year";
                    document.getElementById("em-tablecell-value2").innerHTML = Math.round(sfyCalc * 100) / 100 + "  kg";

                    document.getElementById("em-tablecell-title3").innerHTML = "Predicted This Year";
                    document.getElementById("em-tablecell-value3").innerHTML = Math.round(pycpCalc * 100) / 100 + "  kg";

                    document.getElementById("em-tablecell-title4").innerHTML = "Change in Emissions";
                }
            };



        }

        // ROS-computation-graph Option Logic.

        else if (this.props.user.id === 6) {

            console.log("ROS-computation-graph");
            ReactDOM.render(
                <Graph ros={this.ros} />,
                document.getElementById('root')

            );
        }

        else {
            var defaultElement = (
                <div>

                    <h2>{this.props.user.name}</h2>

                </div>
            );
            ReactDOM.unmountComponentAtNode(document.getElementById('chart1'));
            ReactDOM.unmountComponentAtNode(document.getElementById('chart2'));

            // utils.disposeChart('mychart7');

            ReactDOM.render(
                defaultElement,
                document.getElementById('chart1'));
        }
    }


    render() {
        return (
            <div>

            </div>
        );

    }
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        user: state.activeUser
    };
}

export default connect(mapStateToProps)(ChartDetail);
