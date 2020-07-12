"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var baileys_1 = require("@adiwajshing/baileys");
var fs = __importStar(require("fs"));
function example() {
    return __awaiter(this, void 0, void 0, function () {
        var client, _a, user, chats, contacts, unread, authInfo;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    client = new baileys_1.WAClient();
                    client.autoReconnect = true;
                    client.logLevel = baileys_1.MessageLogLevel.none;
                    return [4 /*yield*/, client.connect("./auth_info.json", 20 * 1000)];
                case 1:
                    _a = _b.sent(), user = _a[0], chats = _a[1], contacts = _a[2], unread = _a[3];
                    console.log("oh hello " + user.name + " (" + user.id + ")");
                    console.log("you have " + unread.length + " unread messages");
                    console.log("you have " + chats.length + " chats & " + contacts.length + " contacts");
                    authInfo = client.base64EncodedAuthInfo();
                    fs.writeFileSync("./auth_info.json", JSON.stringify(authInfo, null, "\t"));
                    // client.setOnTakenOver(async () => {
                    // uncomment to reconnect whenever the connection gets taken over from somewhere else
                    // await client.connect ()
                    // });
                    client.setOnPresenceUpdate(function (json) {
                        return console.log(json.id + " presence is " + json.type);
                    });
                    client.setOnMessageStatusChange(function (json) {
                        var participant = json.participant ? " (" + json.participant + ")" : "";
                        console.log("" + json.to + participant + " acknlowledged message(s) " + json.ids + " as " + json.type);
                    });
                    client.setOnUnreadMessage(true, function (m) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, notificationType, messageType, sender, text, text, contact, locMessage, savedFile, err_1;
                        var _this = this;
                        var _b, _c, _d, _e;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    _a = baileys_1.getNotificationType(m), notificationType = _a[0], messageType = _a[1];
                                    console.log("got notification of type: " + notificationType);
                                    if (notificationType !== "message") {
                                        return [2 /*return*/];
                                    }
                                    if (m.key.fromMe) {
                                        console.log("relayed my own message");
                                        return [2 /*return*/];
                                    }
                                    sender = m.key.remoteJid;
                                    if (m.key.participant) {
                                        sender += " (" + m.key.participant + ")";
                                    }
                                    if (!(messageType === baileys_1.MessageType.text)) return [3 /*break*/, 1];
                                    text = (_b = m.message) === null || _b === void 0 ? void 0 : _b.conversation;
                                    console.log(sender + " sent: " + text);
                                    return [3 /*break*/, 7];
                                case 1:
                                    if (!(messageType === baileys_1.MessageType.extendedText)) return [3 /*break*/, 2];
                                    text = (_d = (_c = m.message) === null || _c === void 0 ? void 0 : _c.extendedTextMessage) === null || _d === void 0 ? void 0 : _d.text;
                                    console.log(sender +
                                        " sent: " +
                                        text +
                                        " and quoted message: " +
                                        JSON.stringify(m.message));
                                    return [3 /*break*/, 7];
                                case 2:
                                    if (!(messageType === baileys_1.MessageType.contact)) return [3 /*break*/, 3];
                                    contact = (_e = m.message) === null || _e === void 0 ? void 0 : _e.contactMessage;
                                    console.log(sender +
                                        " sent contact (" + (contact === null || contact === void 0 ? void 0 : contact.displayName) +
                                        "): " + (contact === null || contact === void 0 ? void 0 : contact.vcard));
                                    return [3 /*break*/, 7];
                                case 3:
                                    if (!(messageType === baileys_1.MessageType.location ||
                                        messageType === baileys_1.MessageType.liveLocation)) return [3 /*break*/, 4];
                                    locMessage = m.message != null && m.message != undefined
                                        ? m.message[messageType]
                                        : {};
                                    console.log(sender + " sent location (lat: " + locMessage.degreesLatitude + ", long: " + locMessage.degreesLongitude + ")");
                                    m.message != null && m.message != undefined
                                        ? baileys_1.decodeMediaMessage(m.message, "./Media/media_loc_thumb_in_" + m.key.id)
                                        : {};
                                    if (messageType === baileys_1.MessageType.liveLocation) {
                                        console.log(sender + " sent live location for duration: " + m.duration / 60);
                                    }
                                    return [3 /*break*/, 7];
                                case 4:
                                    _f.trys.push([4, 6, , 7]);
                                    return [4 /*yield*/, baileys_1.decodeMediaMessage(m.message != null && m.message != undefined ? m.message : {}, "./Media/media_in_" + m.key.id)];
                                case 5:
                                    savedFile = _f.sent();
                                    console.log(sender + " sent media, saved at: " + savedFile);
                                    return [3 /*break*/, 7];
                                case 6:
                                    err_1 = _f.sent();
                                    console.log("error in decoding message: " + err_1);
                                    return [3 /*break*/, 7];
                                case 7:
                                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var options, content, type, rand, response;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, client.sendReadReceipt(m.key.remoteJid != null && m.key.remoteJid != undefined
                                                        ? m.key.remoteJid
                                                        : "", m.key.id != null && m.key.id != undefined ? m.key.id : "")];
                                                case 1:
                                                    _a.sent();
                                                    if (!m.key.remoteJid) return [3 /*break*/, 4];
                                                    return [4 /*yield*/, client.updatePresence(m.key.remoteJid, baileys_1.Presence.available)];
                                                case 2:
                                                    _a.sent();
                                                    return [4 /*yield*/, client.updatePresence(m.key.remoteJid, baileys_1.Presence.composing)];
                                                case 3:
                                                    _a.sent();
                                                    _a.label = 4;
                                                case 4:
                                                    options = { quoted: m };
                                                    rand = Math.random();
                                                    if (rand > 0.66) {
                                                        content = "hello!";
                                                        type = baileys_1.MessageType.text;
                                                    }
                                                    else if (rand > 0.33) {
                                                        content = { degreesLatitude: 32.123123, degreesLongitude: 12.12123123 };
                                                        type = baileys_1.MessageType.location;
                                                    }
                                                    else {
                                                        content = fs.readFileSync("./Media/ma_gif.mp4");
                                                        options.mimetype = baileys_1.Mimetype.gif;
                                                        type = baileys_1.MessageType.video;
                                                    }
                                                    if (!m.key.remoteJid) return [3 /*break*/, 6];
                                                    return [4 /*yield*/, client.sendMessage(m.key.remoteJid, content, type, options)];
                                                case 5:
                                                    response = _a.sent();
                                                    console.log("sent message with ID '" +
                                                        response.messageID +
                                                        "' successfully: " +
                                                        (response.status === 200));
                                                    _a.label = 6;
                                                case 6: return [2 /*return*/];
                                            }
                                        });
                                    }); }, 3 * 1000);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    /* example of custom functionality for tracking battery */
                    // client.registerCallback(["action", null, "battery"], (json) => {
                    //   const batteryLevelStr = json[2][0][1].value;
                    //   const batterylevel = parseInt(batteryLevelStr);
                    //   console.log("battery level: " + batterylevel);
                    // });
                    client.setOnUnexpectedDisconnect(function (err) {
                        return console.log("disconnected unexpectedly: " + err);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
example()["catch"](function (err) { return console.log("encountered error: " + err); });
