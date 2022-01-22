"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  getCustomerData: function getCustomerData() {
    return regeneratorRuntime.async(function getCustomerData$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_config["default"].get("/my-account/get-customer-data"));

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  updateAccountInfo: function updateAccountInfo(payload) {
    return regeneratorRuntime.async(function updateAccountInfo$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/my-account/update-account-info", payload));

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  createAddress: function createAddress(payload) {
    return regeneratorRuntime.async(function createAddress$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/shopping-cart/address", payload));

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  updateAddress: function updateAddress(payload) {
    return regeneratorRuntime.async(function updateAddress$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/my-account/update-my-account-address", payload));

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    });
  },
  createAccount: function createAccount(payload) {
    return regeneratorRuntime.async(function createAccount$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/shopping-cart/account", payload));

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    });
  },
  updateAccount: function updateAccount(payload) {
    return regeneratorRuntime.async(function updateAccount$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/shopping-cart/update/account", payload));

          case 2:
            return _context6.abrupt("return", _context6.sent);

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    });
  },
  placeOrder: function placeOrder(payload) {
    return regeneratorRuntime.async(function placeOrder$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/shopping-cart/order?timestamp=" + new Date().getTime(), payload));

          case 2:
            return _context7.abrupt("return", _context7.sent);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    });
  },
  getShippingOptions: function getShippingOptions() {
    return regeneratorRuntime.async(function getShippingOptions$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return regeneratorRuntime.awrap(_config["default"].get("/shipping"));

          case 2:
            return _context8.abrupt("return", _context8.sent);

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    });
  },
  createPaymentMethod: function createPaymentMethod(payload) {
    return regeneratorRuntime.async(function createPaymentMethod$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/shopping-cart/payment", payload));

          case 2:
            return _context9.abrupt("return", _context9.sent);

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    });
  },
  updatePaymentMethod: function updatePaymentMethod(payload) {
    return regeneratorRuntime.async(function updatePaymentMethod$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/shopping-cart/update/payment", payload));

          case 2:
            return _context10.abrupt("return", _context10.sent);

          case 3:
          case "end":
            return _context10.stop();
        }
      }
    });
  },
  setShippingCode: function setShippingCode(payload) {
    return regeneratorRuntime.async(function setShippingCode$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/shopping-cart/shipping", payload));

          case 2:
            return _context11.abrupt("return", _context11.sent);

          case 3:
          case "end":
            return _context11.stop();
        }
      }
    });
  },
  validatePromo: function validatePromo(payload) {
    return regeneratorRuntime.async(function validatePromo$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/shopping-cart/promo-code?timestamp=" + new Date().getTime(), payload));

          case 2:
            return _context12.abrupt("return", _context12.sent);

          case 3:
          case "end":
            return _context12.stop();
        }
      }
    });
  },
  validatePortNumber: function validatePortNumber(payload) {
    return regeneratorRuntime.async(function validatePortNumber$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return regeneratorRuntime.awrap(_config["default"].get("/shopping-cart/porting", {
              params: payload
            }));

          case 2:
            return _context13.abrupt("return", _context13.sent);

          case 3:
          case "end":
            return _context13.stop();
        }
      }
    });
  },
  addPort: function addPort(payload) {
    return regeneratorRuntime.async(function addPort$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/shopping-cart/port?timestamp=" + new Date().getTime(), payload));

          case 2:
            return _context14.abrupt("return", _context14.sent);

          case 3:
          case "end":
            return _context14.stop();
        }
      }
    });
  },
  updatePort: function updatePort(payload) {
    return regeneratorRuntime.async(function updatePort$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/shopping-cart/update/port", payload));

          case 2:
            return _context15.abrupt("return", _context15.sent);

          case 3:
          case "end":
            return _context15.stop();
        }
      }
    });
  },
  updateCustomerInfo: function updateCustomerInfo(payload) {
    return regeneratorRuntime.async(function updateCustomerInfo$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/my-account/update-account-info?timestamp=" + new Date().getTime(), payload));

          case 2:
            return _context16.abrupt("return", _context16.sent);

          case 3:
          case "end":
            return _context16.stop();
        }
      }
    });
  },
  initiatePasswordReset: function initiatePasswordReset(payload) {
    return regeneratorRuntime.async(function initiatePasswordReset$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/customers/create-password-reset?timestamp=" + new Date().getTime(), payload));

          case 2:
            return _context17.abrupt("return", _context17.sent);

          case 3:
          case "end":
            return _context17.stop();
        }
      }
    });
  },
  validatePasswordToken: function validatePasswordToken(payload) {
    return regeneratorRuntime.async(function validatePasswordToken$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/customers/validate-reset-token?timestamp=" + new Date().getTime(), payload));

          case 2:
            return _context18.abrupt("return", _context18.sent);

          case 3:
          case "end":
            return _context18.stop();
        }
      }
    });
  },
  savePassword: function savePassword(payload) {
    return regeneratorRuntime.async(function savePassword$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.next = 2;
            return regeneratorRuntime.awrap(_config["default"].post("/customers/update-password?timestamp=" + new Date().getTime(), payload));

          case 2:
            return _context19.abrupt("return", _context19.sent);

          case 3:
          case "end":
            return _context19.stop();
        }
      }
    });
  }
};
exports["default"] = _default;