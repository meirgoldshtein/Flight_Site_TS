"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SELECT = document.querySelector("select");
const BODY = document.querySelector(".body");
const NAME_INPUT = document.querySelector("#name");
const MALE_BTN = document.querySelector("#male");
const FEMALE_BTN = document.querySelector("#female");
const SEND_BTN = document.querySelector("#btnSend");
const REFRESH_BTN = document.querySelector("#btnRefresh");
const AGENT_ID = 'Top travel agency';
let FLIGHT_ID = SELECT.value;
let baseURL = "https://66e98a6387e417609449dfc5.mockapi.io/api/";
// פונקצייה גנרית לבקשות גט משרת עם נקודת קצה כפרמטר
const getData = (endPoint) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${baseURL}${endPoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.error(err);
        return err instanceof Error ? err : new Error('An unknown error occurred');
    }
});
// פונקציה גנרית שמקבלת נקודת קצה ואובייקט ושולחת לשרת בקשת פוסט
const postDada = (obj_1, ...args_1) => __awaiter(void 0, [obj_1, ...args_1], void 0, function* (obj, endPoint = '') {
    try {
        const response = yield fetch(`${baseURL}${endPoint}`, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.error(err);
        return err instanceof Error ? err : new Error('An unknown error occurred');
    }
});
// פונקצייה גנרית לעדכון אובייקט במסד הנתונים
const putDada = (obj_1, ...args_1) => __awaiter(void 0, [obj_1, ...args_1], void 0, function* (obj, endPoint = '', id) {
    try {
        const response = yield fetch(`${baseURL}${endPoint}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.error(err);
        return err instanceof Error ? err : new Error('An unknown error occurred');
    }
});
// פונקצייה גנרית למחיקת אובייקט במסד הנתונים
const deleteDada = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (endPoint = '', id) {
    try {
        const response = yield fetch(`${baseURL}${endPoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        console.log(data);
        return data;
    }
    catch (err) {
        console.error(err);
        return err instanceof Error ? err : new Error('An unknown error occurred');
    }
});
const dugma = {
    "createdAt": new Date().toISOString(),
    "name": "נחמן",
    "gender": "male",
    "flight_id": "6141d9a8b5bafeb7b438f77a",
    "agent": "טיסות לרבינו",
};
// פונקצייה שיוצרת אובייקט של נוסע בטיסה ומחזירה אותו
const createPasanger = () => {
    const name = NAME_INPUT.value;
    if (!name) {
        alert('Enter name');
        return null;
    }
    if (!FLIGHT_ID) {
        alert('Choose flight');
        return null;
    }
    const gender = MALE_BTN.checked ? 'male' : 'female';
    const pasanger = {
        createdAt: new Date().toISOString(),
        name: name,
        gender: gender,
        flight_id: FLIGHT_ID,
        agent: 'טיסות לרבינו',
    };
    return pasanger;
};
SEND_BTN.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const pasanger = createPasanger();
    if (!pasanger)
        return;
    const response = yield postDada(pasanger, 'pasangers');
}));
