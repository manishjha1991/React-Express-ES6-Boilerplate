import React, { Component } from "react";
import Select from "react-select";
import "style.css";
import "../css/Device.css";
import axios, { post } from "axios";
import HeaderComponent from "./HeaderComponent";
import { uniqBy } from "lodash";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      centers: [],
      center: "",
      circles: [],
      circle: "",
      stores: [],
      store: "",
      devices: [],
      device: "",
      GroupName: "",
      Groups: [
        { label: "1", value: "Create" },
        { label: "2", value: "SelfServe" },
        { label: "3", value: "FastLane" },
        { label: "4", value: "Greeter" },
        { label: "5", value: "airtelTV" },
        { label: "6", value: "WynkMusic" },
        { label: "7", value: "Hi-5" },
        { label: "8", value: "Consultation Hub" },
        { label: "9", value: "Cashier" },
        { label: "10", value: "DigitalOR" },
        { label: "11", value: "Test" },
        { label: "12", value: "Network" }
      ],
      apps: [],
      app: [],
      selectedApps: [],
      wallpaper: "",
      isCircleSelected: false,
      isCenterSelected: false,
      isStoreSelected: false,
      successFlag: false
    };
    this.handleCenterChange = this.handleCenterChange.bind(this);
    this.handleCircleChange = this.handleCircleChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }
  componentDidMount() {
    fetch("http://localhost:3000/center")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            centers: result.results
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
    fetch("http://localhost:3000/app")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            apps: uniqBy(result.results, "appName")
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }

  handleCenterChange(center) {
    this.setState({ center });
    this.setState({ isCenterSelected: true });
    fetch(`http://localhost:3000/circle/${center.value}/center`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            circles: result.results
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }
  handleCircleChange(circle) {
    this.setState({ circle });
    this.setState({ isCircleSelected: true });
    fetch(`http://localhost:3000/store/${circle.value}/circle`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            stores: result.results
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }
  handleSubmit(event) {
    event.preventDefault();
    if (
      !this.state.selectedGroups ||
      !this.state.selectedApps ||
      this.state.selectedApps.length === 0
    ) {
      this.setState({ errorMsg: "Please Select group and app first" });
    }
    console.log(this.state.isCenterSelected, "IS_CENTER_SELECTED");
    console.log(this.state.isCircleSelected, "IS_CENTER_SELECTED");
    console.log(this.state.isStoreSelected, "IS_STORE_SELECTED");
    console.log(this.state.selectedApps, "SELECTED_APP");
    let data = {
      wallpaper: {
        imageLink: this.state.wallpaper
      },
      groupName: this.state.GroupName.label,
      selectedApps: []
    };
    this.state.selectedApps.forEach(app => {
      data.selectedApps.push({
        appId: app.value,
        appName: app.label,
        appLink: app.appLink
      });
    });

    // IF ONLY CENTER SELECTED THAT MEANS NEED TO UPDATE FROM CENTER

    if (
      this.state.isCenterSelected &&
      !this.state.isCircleSelected &&
      !this.state.isStoreSelected
    ) {
      fetch(`http://localhost:3000/store/${this.state.center.value}/center`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          this.showSuccess();
        })
        .catch(error => alert(error));
    }

    // IF ONLY CENTER AND CIRCLE  SELECTED THAT MEANS NEED TO UPDATE FROM CIRCLE

    if (this.state.isCircleSelected && !this.state.storeId) {
      console.log("CENTER AND CIRCLE");
      fetch(`http://localhost:3000/store/${this.state.circle.value}/circle`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          this.showSuccess();
        })
        .catch(error => alert(error));
    }

    // IF CENTER , CIRCLE AND STORE SELECTED THAT MEANS NEED TO UPDATE FROM STORE

    if (
      this.state.isStoreSelected &&
      !this.state.isCircleSelected &&
      !this.state.isCenterSelected
    ) {
      console.log("CENTER AND CIRCLE AND STORE");
      fetch(`http://localhost:3000/store/${this.state.store.value}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          this.showSuccess();
        })
        .catch(error => alert(error));
    }
}
  showSuccess() {
    this.setState({
      successFlag: true,
      store: "",
      device: "",
      wallpaper: "",
      selectedGroups: []
    });
    setTimeout(() => this.setState({ successFlag: false }), 2000);
  }

  handleStoreChange(store) {
    this.setState({ store, errorMsg: "" });
    this.setState({
      isStoreSelected: true,
      isCenterSelected: false,
      isCircleSelected: false
    });
    fetch(`http://localhost:3000/store/${store.value}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            GroupName: {
              label: result.results[0].GroupName,
              value: result.results[0].GroupName
            },
            selectedApps: result.results[0].selectedApps.map(app => {
              return {
                label: app.appName,
                value: app.appId,
                appLink: app.appLink
              };
            }),
            GroupName: {
              label: result.results[0].groupName,
              value: result.results[0].groupName
            }
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }
  handleGroupChange(GroupName) {
    this.setState({ errorMsg: "" });
    this.setState({ GroupName });
    fetch(`http://localhost:3000/app/${GroupName.value}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            selectedApps: result.results.map(app => {
              return {
                label: app.appName,
                value: app.appId,
                appLink: app.appLink
              };
            })
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
   
 fetch("http://localhost:3000/upload", {
      method: "POST",
      body: data
    }).then(response => {
      response.json().then(body => {
        this.setState({ wallpaper: `http://localhost:3000/${body.file}` });
      });
    });
  }
  addMoreApp(app) {
    this.setState({ errorMsg: "" });

    let selectedApps = this.state.selectedApps;
    selectedApps.push(app);
    this.setState({ selectedApps });
  }
  render() {
    return (
      <div>
        <HeaderComponent />
        {this.state.successFlag && (
          <div className="successMsg">Date Has been inserted Successfully</div>
        )}
        {this.state.errorMsg && (
          <div className="successMsg">{this.state.errorMsg}</div>
        )}

        <form className="form__row" method="POST" onSubmit={this.handleSubmit}>
          <div className="row">
            <label className="label" for="Select Center">
              <b>Select Center</b>
            </label>
            <Select
              className="value"
              value={this.state.center}
              onChange={this.handleCenterChange}
              options={this.state.centers.map(center => {
                return { value: center.centerId, label: center.centerName };
              })}
            />
          </div>
          <div className="row">
            <label className="label" for="Select Circle">
              <b>Select Circle</b>
            </label>
            <Select
              className="value"
              value={this.state.circle}
              onChange={this.handleCircleChange}
              options={this.state.circles.map(circle => {
                return { value: circle.circleId, label: circle.circleId };
              })}
            />
          </div>
          <div className="row">
            <label className="label" for="Store Manager Name">
              <b>Select Store</b>
            </label>
            <Select
              className="value"
              value={this.state.store}
              onChange={this.handleStoreChange}
              options={this.state.stores.map(store => {
                return { value: store.storeId, label: store.storeId };
              })}
            />
          </div>

          <div className="row">
            <label className="label" for="Store Manager Name">
              <b>Select Groups</b>
            </label>
            <Select
              className="value"
              value={this.state.GroupName}
              onChange={this.handleGroupChange}
              options={this.state.Groups.map(group => {
                return { value: group.label, label: group.value };
              })}
            />
          </div>
          <div className="row">
            <label className="label" for="Store Manager Name">
              <b>Select App</b>
            </label>
            <Select
              className="value"
              options={this.state.apps.map(app => {
                return { label: app.appId, value: app.appName };
              })}
              value={this.state.selectedApps}
              onChange={selectedApps => this.setState({ selectedApps })}
              isMulti
            />
          </div>
          <div className="row">
            <label className="label" for="Store Manager Name">
              <b>Add More Apps To Group</b>
            </label>
            <Select
              className="value"
              options={this.state.apps.map(app => {
                return { value: app.appId, label: app.appName };
              })}
              onChange={app => this.addMoreApp(app)}
            />
          </div>
         
            
          <form  className="row" onSubmit={this.handleUploadImage}>
          <label className="label" for="Store Manager Name">
              <div>
              <b>Upload Wallpaper</b>
              </div>
            </label>
              <div>
                <input
                  ref={ref => {
                    this.uploadInput = ref;
                  }}
                  type="file"
                />
              </div>
              <br />
              <label className="label" for="Store Manager Name">
           <div className="row">
            <input className="btnClass" type="submit" value="Submit" />
          </div>
            </label>
              
              <img src={this.state.wallpaper}  />
            </form>
            
          
          
         
        </form>
      </div>
    );
  }
}

export default App;
