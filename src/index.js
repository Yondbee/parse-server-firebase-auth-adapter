import * as admin from "firebase-admin";
import { FirebaseUtil } from './util';

var fbAdmin = null;

function getFirebaseAdmin(options) {

    if (fbAdmin != null)
        return fbAdmin;

    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: options.databaseURL
    });

    fbAdmin = admin;
    return fbAdmin;
}

export class FirebaseAuth {

    constructor(options) {
        console.log('FirebaseAuth initialized with options', options);
    }

    validateAuthData(authData, options) {
        return getFirebaseAdmin(options).auth().verifyIdToken(authData.access_token)
            .then(function (decodedToken) {
                if (decodedToken && decodedToken.uid == authData.id) {
                    return;                    
                }

                throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Firebase auth not found for this user.');

            }).catch(function (error) {
                throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Firebase auth is invalid for this user.');
            });
    }

    validateAppId() {
        return Promise.resolve();
    }
}

export default FirebaseAuth;
module.exports = FirebaseAuth;
