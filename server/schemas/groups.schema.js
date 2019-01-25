import mongoose from "mongoose";
import uuid from "uuid";
import validator from "validator";
import * as constants from "../lib/constant";

const Group = new mongoose.Schema(
  {
    id: { type: Number, default: 1 },
    Groups: [
      {
        groupName: { type: String, default: "Create" },
        GroupId: { type: String, default: 1 },
        appInfo: [
          {
            appName: { type: String, default: "Create" },
            appId: { type: Number, default: 1 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Myairtel App" },
            appId: { type: Number, default: 2 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "eCAF" },
            appId: { type: Number, default: 3 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          }
        ],
        browserInfo: []
      },
      {
        groupName: { type: String, default: "SelfServe" },
        GroupId: { type: String, default: 2 },
        appInfo: [
          {
            appName: { type: String, default: "Myairtel App" },
            appId: { type: Number, default: 1 },
            aapLink: { type: String, default: "www.Myairtel App.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "eCAF" },
            appId: { type: Number, default: 2 },
            aapLink: { type: String, default: "www.eCAF.com" },
            isActive: { type: Boolean, default: false }
          }
        ],
        browserInfo: [
          {
            browserName: { type: String, default: "airtel Online Store" },
            browserId: { type: Number, default: 1 },
            browserLink: {
              type: String,
              default: "https://www.airtel.in/estore"
            },
            isActive: { type: Boolean, default: false }
          },
          {
            browserName: { type: String, default: "Information Desk" },
            browserId: { type: Number, default: 2 },
            browserLink: {
              type: String,
              default: "https://www.airtel.in/e-brochures/"
            },
            isActive: { type: Boolean, default: false }
          }
        ]
      },
      {
        groupName: { type: String, default: "FastLane" },
        GroupId: { type: String, default: 2 },
        appInfo: [
          {
            appName: { type: String, default: "Myairtel App" },
            appId: { type: Number, default: 1 },
            aapLink: { type: String, default: "www.Myairtel App.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "eCAF" },
            appId: { type: Number, default: 2 },
            aapLink: { type: String, default: "www.eCAF.com" },
            isActive: { type: Boolean, default: false }
          }
        ],
        browserInfo: []
      },
      {
        groupName: { type: String, default: "Greeter" },
        GroupId: { type: String, default: 4 },
        appInfo: [
          {
            appName: { type: String, default: "Qudini queue management" },
            appId: { type: Number, default: 1 },
            aapLink: {
              type: String,
              default: "www.Qudini queue management.com"
            },
            isActive: { type: Boolean, default: false }
          }
        ],
        browserInfo: []
      },
      {
        groupName: { type: String, default: "airtelTV" },
        GroupId: { type: String, default: 5 },
        appInfo: [
          {
            appName: { type: String, default: "airtel TV" },
            appId: { type: Number, default: 1 },
            aapLink: { type: String, default: "www.airtel TV.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Amazon Prime Video" },
            appId: { type: Number, default: 2 },
            aapLink: { type: String, default: "www.Amazon Prime Video.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Netflix" },
            appId: { type: Number, default: 3 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          }
        ],
        browserInfo: []
      },
      {
        groupName: { type: String, default: "WynkMusic" },
        GroupId: { type: String, default: 6 },
        appInfo: [
          {
            appName: { type: String, default: "eCAF" },
            appId: { type: Number, default: 1 },
            aapLink: { type: String, default: "www.eCAF.com" },
            isActive: { type: Boolean, default: false }
          }
        ],
        browserInfo: []
      },
      {
        groupName: { type: String, default: "Hi-5" },
        GroupId: { type: String, default: 7 },
        appInfo: [
          {
            appName: { type: String, default: "Hi-5" },
            appId: { type: Number, default: 1 },
            aapLink: { type: String, default: "www.Hi-5.com" },
            isActive: { type: Boolean, default: false }
          }
        ],
        browserInfo: []
      },
      {
        groupName: { type: String, default: "Consultation Hub" },
        GroupId: { type: String, default: 8 },
        appInfo: [
          {
            appName: { type: String, default: "Create" },
            appId: { type: Number, default: 1 },
            aapLink: { type: String, default: "www.Create.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Myairtel App" },
            appId: { type: Number, default: 2 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "airtel TV" },
            appId: { type: Number, default: 3 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "eCAF" },
            appId: { type: Number, default: 4 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Wynk Music" },
            appId: { type: Number, default: 5 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Amazon Prime Video" },
            appId: { type: Number, default: 6 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Netflix" },
            appId: { type: Number, default: 7 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Ezetap" },
            appId: { type: Number, default: 8 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          }
        ],
        browserInfo: [
          {
            browserName: { type: String, default: "airtel Online Store" },
            browserId: { type: Number, default: 1 },
            browserLink: {
              type: String,
              default: "https://www.airtel.in/estore"
            },
            isActive: { type: Boolean, default: false }
          },
          {
            browserName: { type: String, default: "Information Desk" },
            browserId: { type: Number, default: 2 },
            browserLink: {
              type: String,
              default: "https://www.airtel.in/e-brochures/"
            },
            isActive: { type: Boolean, default: false }
          },
          {
            browserName: { type: String, default: "Plans and Offers" },
            browserId: { type: Number, default: 3 },
            browserLink: {
              type: String,
              default: "http://ownretail.in/family/"
            },
            isActive: { type: Boolean, default: false }
          },
          {
            browserName: { type: String, default: "#airtelThanks" },
            browserId: { type: Number, default: 4 },
            browserLink: {
              type: String,
              default: "http://ownretail.in/thanks/"
            },
            isActive: { type: Boolean, default: false }
          }
        ]
      },
      {
        groupName: { type: String, default: "Cashier" },
        GroupId: { type: String, default: 9 },
        appInfo: [
          {
            appName: { type: String, default: "Myairtel App" },
            appId: { type: Number, default: 1 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "eCAF" },
            appId: { type: Number, default: 2 },
            aapLink: { type: String, default: "www.eCAF.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Ezetap" },
            appId: { type: Number, default: 3 },
            aapLink: { type: String, default: "www.Ezetap.com" },
            isActive: { type: Boolean, default: false }
          }
        ],
        browserInfo: [
          {
            browserName: { type: String, default: "airtel Online Store" },
            browserId: { type: Number, default: 1 },
            browserLink: {
              type: String,
              default: "https://www.airtel.in/estore"
            },
            isActive: { type: Boolean, default: false }
          }
        ]
      },
      {
        groupName: { type: String, default: "DigitalOR" },
        GroupId: { type: String, default: 10 },
        appInfo: [
          {
            appName: { type: String, default: "Myairtel App" },
            appId: { type: Number, default: 1 },
            aapLink: { type: String, default: "www.Myairtel App.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "airtel TV" },
            appId: { type: Number, default: 2 },
            aapLink: { type: String, default: "www.airtel TV.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "eCAF" },
            appId: { type: Number, default: 3 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Amazon Prime Video" },
            appId: { type: Number, default: 4 },
            aapLink: { type: String, default: "www.Amazon Prime Video.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Netflix" },
            appId: { type: Number, default: 5 },
            aapLink: { type: String, default: "www.Netflix.com" },
            isActive: { type: Boolean, default: false }
          }
        ],
        browserInfo: [
          {
            browserName: { type: String, default: "airtel Online Store" },
            browserId: { type: Number, default: 1 },
            browserLink: {
              type: String,
              default: "https://www.airtel.in/estore"
            },
            isActive: { type: Boolean, default: false }
          },
          {
            browserName: { type: String, default: "Information Desk" },
            browserId: { type: Number, default: 1 },
            browserLink: {
              type: String,
              default: "https://www.airtel.in/e-brochures/"
            },
            isActive: { type: Boolean, default: false }
          },
          {
            browserName: { type: String, default: "Plans and Offers" },
            browserId: { type: Number, default: 1 },
            browserLink: {
              type: String,
              default: "http://ownretail.in/family/"
            },
            isActive: { type: Boolean, default: false }
          },
          {
            browserName: { type: String, default: "#airtelThanks" },
            browserId: { type: Number, default: 1 },
            browserLink: {
              type: String,
              default: "http://ownretail.in/thanks/"
            },
            isActive: { type: Boolean, default: false }
          }
        ]
      },
      {
        groupName: { type: String, default: "Test" },
        GroupId: { type: String, default: 11 },
        appInfo: [
          {
            appName: { type: String, default: "Create" },
            appId: { type: Number, default: 1 },
            aapLink: { type: String, default: "www.Network.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Hi-5" },
            appId: { type: Number, default: 2 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Myairtel App" },
            appId: { type: Number, default: 3 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "airtel TV" },
            appId: { type: Number, default: 4 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "eCAF" },
            appId: { type: Number, default: 5 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Wynk Music" },
            appId: { type: Number, default: 6 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Amazon Prime Video" },
            appId: { type: Number, default: 7 },
            aapLink: { type: String, default: "www.create_network_app.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Netflix" },
            appId: { type: Number, default: 8 },
            aapLink: { type: String, default: "www.Netflix.com" },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Qudini queue management" },
            appId: { type: Number, default: 9 },
            aapLink: {
              type: String,
              default: "www.Qudini queue management.com"
            },
            isActive: { type: Boolean, default: false }
          },
          {
            appName: { type: String, default: "Ezetap" },
            appId: { type: Number, default: 10 },
            aapLink: { type: String, default: "www.Ezetap.com" },
            isActive: { type: Boolean, default: false }
          }
        ],
        browserInfo: [
          {
            browserName: { type: String, default: "airtel Online Store" },
            browserId: { type: Number, default: 1 },
            browserLink: {
              type: String,
              default: "https://www.airtel.in/estore"
            },
            isActive: { type: Boolean, default: false }
          },
          {
            browserName: { type: String, default: "Information Desk" },
            browserId: { type: Number, default: 2 },
            browserLink: {
              type: String,
              default: "https://www.airtel.in/e-brochures/"
            },
            isActive: { type: Boolean, default: false }
          },
          {
            browserName: { type: String, default: "Plans and Offers" },
            browserId: { type: Number, default: 3 },
            browserLink: {
              type: String,
              default: "http://ownretail.in/family/"
            },
            isActive: { type: Boolean, default: false }
          },
          {
            browserName: { type: String, default: "#airtelThanks" },
            browserId: { type: Number, default: 4 },
            browserLink: {
              type: String,
              default: "http://ownretail.in/thanks/"
            },
            isActive: { type: Boolean, default: false }
          }
        ]
      },
      {
        groupName: { type: String, default: "Network" },
        GroupId: { type: String, default: 12 },
        appInfo: [
          {
            appName: { type: String, default: "Network" },
            appId: { type: Number, default: 1 },
            aapLink: { type: String, default: "www.Network.com" },
            isActive: { type: Boolean, default: false }
          }
        ],
        browserInfo: []
      }
    ],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null }
  },
  {
    timestamps: true
  }
);

export default Group;
