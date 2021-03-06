"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FirebaseAuth = void 0;

var admin = _interopRequireWildcard(require("firebase-admin"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fbAdmin = null;

function getFirebaseAdmin(options) {
  if (fbAdmin != null) return fbAdmin;
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: options.databaseURL
  });
  fbAdmin = admin;
  return fbAdmin;
}

var FirebaseAuth = /*#__PURE__*/function () {
  function FirebaseAuth(options) {
    _classCallCheck(this, FirebaseAuth);

    console.log('FirebaseAuth initialized with options', options);
  }

  _createClass(FirebaseAuth, [{
    key: "validateAuthData",
    value: function validateAuthData(authData, options) {
      return getFirebaseAdmin(options).auth().verifyIdToken(authData.access_token).then(function (decodedToken) {
        if (decodedToken && decodedToken.uid == authData.id) {
          return;
        }

        throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Firebase auth not found for this user.');
      }).catch(function (error) {
        throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Firebase auth is invalid for this user.');
      });
    }
  }, {
    key: "validateAppId",
    value: function validateAppId() {
      return Promise.resolve();
    }
  }]);

  return FirebaseAuth;
}();

exports.FirebaseAuth = FirebaseAuth;
var _default = FirebaseAuth;
exports.default = _default;
module.exports = FirebaseAuth;