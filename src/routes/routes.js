import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Overview from "../views/Overview.vue";
import AccountInfo from "../views/AccountInfo.vue";
import Login from "../components/Login/Login.vue";
import DevicesUsage from "../views/DevicesUsage";
import Subscriptions from "../views/Subscriptions";
import ChildAccountView from "../views/ChildAccountView";
import SingleChildAccount from "../components/ChildAccount/SingleChildAccount";
import Billing from "../views/Billing";
import BillingHistory from "../components/Billing/BillingHistory";
import PreviousBill from "../components/Billing/PreviousBill";
import CurrentBill from "../components/Billing/CurrentBill";
import Logs from "../views/Logs";
import Referrals from "../views/Referrals";
import Orders from "../views/Orders";
import Order from "../components/Orders/Order.vue";
import AddNewLine from "../views/AddNewLine";
import AvailableDevices from "../components/Devices/AvailableDevices.vue";
import NewLineDevice from "../components/Devices/NewLineDevice.vue";
import UpgradeDevice from "../components/ReplaceAndUpgrade/UpgradeDevice.vue";
import ReplaceDevice from "../components/ReplaceAndUpgrade/ReplaceDevice.vue";
import DefectiveDevice from "../components/ReplaceAndUpgrade/DefectiveDevice.vue";
import LostDevice from "../components/ReplaceAndUpgrade/LostDevice.vue";
import LindAddon from "../components/Devices/LineAddon.vue";
import PlanChangeOverview from "../views/PlanChangeOverview.vue";
import PlanChange from "../components/PlanChange/PlanChange.vue";
import PlanChangeConfirm from "../components/PlanChange/PlanChangeConfirm.vue";
import PlanChangeSuccess from "../components/PlanChange/PlanChangeSuccess.vue";

import rootStore from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login" /* Keep the name lowercase as in the className */,
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    component: Dashboard,
    meta: { breadCrumb: "Dashboard", requiresAuth: true },
    children: [
      {
        path: "",
        redirect: { name: 'overview' }
      },
      {
        path: "dashboard",
        name: "overview" /* Keep the name lowercase as in the className */,
        component: Overview,
        meta: { requiresAuth: true },
      },
      {
        path: "account-info",
        name: "account-info" /* Keep the name lowercase as in the className */,
        component: AccountInfo,
        meta: { breadCrumb: "Account Information", requiresAuth: true },
      },
      {
        path: "devices",
        name: "devices" /* Keep the name lowercase as in the className */,
        component: DevicesUsage,
        meta: { breadCrumb: "Devices & Usage", requiresAuth: true },
      },
      {
        path: "accounts",
        name: "Accounts" /* Keep the name lowercase as in the className */,
        component: ChildAccountView,
        meta: { breadCrumb: "Accounts", requiresAuth: true },
        children: [
          {
            path: ":child",
            name: "child" /* Keep the name lowercase as in the className */,
            component: SingleChildAccount,
            meta: { breadCrumb: "Account", requiresAuth: false },
          },
        ]
      },
      {
        path: "subscriptions",
        name: "subscriptions" /* Keep the name lowercase as in the className */,
        component: Subscriptions,
        meta: { breadCrumb: "Subscriptions", requiresAuth: true },
      },
      {
        path: "billing",
        component: Billing,
        meta: { breadCrumb: "Billing", requiresAuth: true },
        children: [
          {
            path: "",
            name: "billing" /* Keep the name lowercase as in the className */,
            component: CurrentBill,
            meta: { breadCrumb: "Billing", requiresAuth: false },
          },
          {
            path: "history",
            name: "history" /* Keep the name lowercase as in the className */,
            component: BillingHistory,
            meta: { breadCrumb: "History", requiresAuth: false },
            children: [
              {
                path: ":previousBill",
                name: "previousBill" /* Keep the name lowercase as in the className */,
                component: PreviousBill,
                meta: { breadCrumb: "Bill:", requiresAuth: false },
              },
            ],
          },
        ],
      },
      {
        path: "logs",
        name: "logs" /* Keep the name lowercase as in the className */,
        component: Logs,
        meta: { breadCrumb: "Logs", requiresAuth: true },
      },
      {
        path: "referrals",
        name: "referrals" /* Keep the name lowercase as in the className */,
        component: Referrals,
        meta: { breadCrumb: "Referrals", requiresAuth: true },
      },
      {
        path: "new-line",
        name: "new-line" /* Keep the name lowercase as in the className */,
        component: AddNewLine,
        meta: { breadCrumb: "Add New Line", requiresAuth: true },
        children: [
          {
            path: "device",
            name:
              "device" /* Keep the name lowercase as in the className */,
            component: AvailableDevices,
            meta: { breadCrumb: "New Device", requiresAuth: false },
            children: [
              {
                path: ":line",
                name:
                  "line" /* Keep the name lowercase as in the className */,
                component: NewLineDevice,
                meta: { breadCrumb: "Select Plan", requiresAuth: false },
                children: [
                  {
                    path: ":addon",
                    name:
                      "addon" /* Keep the name lowercase as in the className */,
                    component: LindAddon,
                    meta: { breadCrumb: "Add Warranty", requiresAuth: false },
                  },
                ],
              },
            ],
          },
          {
            path: "upgrade",
            name:
              "upgrade" /* Keep the name lowercase as in the className */,
            component: UpgradeDevice,
            meta: { breadCrumb: "Upgrade Device", requiresAuth: false, upgrade: true },
            children: [
              {
                path: "upgrade-to",
                name:
                  "upgradeTo" /* Keep the name lowercase as in the className */,
                component: AvailableDevices,
                meta: { breadCrumb: "Upgrade To", requiresAuth: false, upgrade: true },
                children: [
                  {
                    path: ":line",
                    name:
                      "line" /* Keep the name lowercase as in the className */,
                    component: NewLineDevice,
                    meta: { breadCrumb: "Select Plan", requiresAuth: false, upgrade: true },
                    children: [
                      {
                        path: ":addon",
                        name:
                          "addon" /* Keep the name lowercase as in the className */,
                        component: LindAddon,
                        meta: { breadCrumb: "Add Warranty", requiresAuth: false, upgrade: true },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: "replace",
            name:
              "replace" /* Keep the name lowercase as in the className */,
            component: ReplaceDevice,
            meta: { breadCrumb: "Replace Device", requiresAuth: false, replace: true },
            children: [
              {
                path: "support",
                name:
                  "support" /* Keep the name lowercase as in the className */,
                component: DefectiveDevice,
                meta: { breadCrumb: "Contact Support", requiresAuth: false, replace: true },
              },
              {
                path: "new-device",
                name:
                  "new-device" /* Keep the name lowercase as in the className */,
                component: LostDevice,
                meta: { breadCrumb: "New Device", requiresAuth: false, replace: true },
              },
            ],
          },
        ],
      },
      {
        path: "plan-change",
        name: "plan-change" /* Keep the name lowercase as in the className */,
        component: PlanChangeOverview,
        meta: { breadCrumb: "Change Plan", requiresAuth: true },
        children: [
          {
            path: "",
            name:
              "plan-change-start" /* Keep the name lowercase as in the className */,
            component: PlanChange,
            meta: { breadCrumb: "Change Plan", title: "Change Plan", requiresAuth: true },
          },
          {
            path: "new-plan",
            name:
              "new-plan" /* Keep the name lowercase as in the className */,
            component: AvailableDevices,
            meta: { breadCrumb: "New Plan ", title: "Upgrade Plan", requiresAuth: true },
            children: [
              {
                path: "success",
                name:
                  "success" /* Keep the name lowercase as in the className */,
                component: PlanChangeSuccess,
                meta: { breadCrumb: "Success", title: "Upgrade Plan", requiresAuth: true },
              }
            ]
          },
          {
            path: "confirm",
            name:
              "confirm" /* Keep the name lowercase as in the className */,
            component: PlanChangeConfirm,
            meta: { breadCrumb: "Confirm", title: "Upgrade Plan", requiresAuth: true },
          }
        ]
      },
      {
        path: "orders",
        name: "orders" /* Keep the name lowercase as in the className */,
        component: Orders,
        meta: { breadCrumb: "Your Orders" },
        children: [
          {
            path: ":order",
            name:
              "order" /* Keep the name lowercase as in the className */,
            component: Order,
            meta: { breadCrumb: "Order #", requiresAuth: false },
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard" /* Keep the name lowercase as in the className */,
    component: Dashboard,
    meta: { breadCrumb: "Dashboard", requiresAuth: true },
  },

  // /devices

  // /billing

  // /logs

  // /refferals
];

const router = new VueRouter({
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
      }
    } else {
      return {
        x: 0, 
        y: 0,
        behavior: 'smooth',
      }
    }
  }
});

router.beforeEach((to, from, next) => {
  try {
    let isAuthenticated = (process.env.NODE_ENV === "development") ? rootStore.state.auth.isLoggedIn : Vue.$cookies.get("gabb_auth_token");
    let pathRequiresAuth = (to.matched.some((record) => record.meta.requiresAuth)) ? true : false;
    if(to.name == "login" && isAuthenticated) {
      // user is already logged in and hit the login url so skip login page and send to dashboard
      next({ name: 'overview' });
    }
    else if(pathRequiresAuth && !isAuthenticated) {
      // user is not logged in and they are trying to hit a path that requires login, so rediret them to login
      next({ name: 'login' });
    } else {
      next();
    }
  } catch (e) {
    console.log({ e });
  }
});

export default router;
