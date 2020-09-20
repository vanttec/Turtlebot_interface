import React, { Component } from 'react';
import ReactFC from 'react-fusioncharts';
import ReactDOM from 'react-dom';
import moment from 'moment';
import './app.css';

class Tutorial extends React.Component {
    constructor(props) {
        Component(props);
        this.onClickbutton1 = this.onClickbutton1.bind(this);
        this.onClickbutton2 = this.onClickbutton2.bind(this);
    }

 componentDidMount() {

        document.getElementById("a1").click();
        window.selectedUsage = "all";


    }
    

}
