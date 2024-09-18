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
const PASANGERS_CONTAINER = document.querySelector(".body");
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
        // console.log(data);
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
        // console.log(data);
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
        // console.log(data);
        return data;
    }
    catch (err) {
        console.error(err);
        return err instanceof Error ? err : new Error('An unknown error occurred');
    }
});
// מאזין לעריכת נוסע
const btnEditListener = (event) => {
    const btnEdit = event.target;
    const card = btnEdit.parentElement;
    const inputs = card.querySelectorAll('input');
    const btnSave = card.querySelector('.btnSave');
    btnSave.disabled = !btnSave.disabled;
    inputs.forEach((input) => {
        input.disabled = !input.disabled;
    });
};
// מאזין לעדכון פרטי נוסע
const btnSaveListener = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const btnSave = event.target;
    const card = btnSave.parentElement;
    const inputs = card.querySelectorAll('input');
    const name = inputs[0].value;
    const gender = inputs[1].value;
    const pasanger = { name, gender };
    yield putDada(pasanger, 'pasangers', btnSave.id);
    renderPassangers();
});
// פונקצייה לרנדור כל הטיסות של הסוכן הנוכחי
const renderPassangers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getData('pasangers?agent=Top%20travel%20agency');
        if (data instanceof Error) {
            console.error(data);
            return;
        }
        // console.log(data);
        PASANGERS_CONTAINER.innerHTML = '';
        data.forEach((pasanger) => {
            const card = document.createElement('div');
            card.classList.add('card');
            const details = document.createElement('div');
            details.classList.add('details');
            details.innerHTML = `
                <input type="text" class="inputDetails" value="${pasanger.name}" disabled>
                <input type="text" class="inputDetails" value="${pasanger.gender}" disabled>`;
            card.appendChild(details);
            // הוספת כפתור עריכה
            const btnEdit = document.createElement('button');
            btnEdit.id = pasanger.id ? pasanger.id.toString() : '';
            btnEdit.textContent = 'Edit';
            btnEdit.classList.add('btnEdit');
            card.appendChild(btnEdit);
            btnEdit.addEventListener('click', (e) => btnEditListener(e));
            // הוספת כפתור שמירה
            const btnSave = document.createElement('button');
            btnSave.textContent = 'Save';
            btnSave.id = pasanger.id ? pasanger.id.toString() : '';
            btnSave.disabled = true;
            btnSave.classList.add('btnSave');
            card.appendChild(btnSave);
            btnSave.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () { btnSaveListener(e); }));
            // הוספת כפתור מחיקה
            const btnDelete = document.createElement('button');
            btnDelete.textContent = 'Delete';
            btnDelete.classList.add('btnDelete');
            btnDelete.id = pasanger.id ? pasanger.id.toString() : '';
            card.appendChild(btnDelete);
            btnDelete.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
                yield deleteDada('pasangers', btnDelete.id);
                renderPassangers();
            }));
            PASANGERS_CONTAINER.appendChild(card);
        });
    }
    catch (err) {
        console.error(err);
        return err instanceof Error ? err : new Error('An unknown error occurred');
    }
});
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
        agent: AGENT_ID,
    };
    return pasanger;
};
// פונקציייה לרנדור כל הטיסות לבחירה בסלקט
const renderFlightOptions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield getData(`flights`);
        if (res instanceof Error) {
            console.error(res);
            throw new Error(`${res}`);
        }
        // const data : Flight[] = await response.json();
        // console.log(res);
        res.forEach((flight) => {
            const option = document.createElement('option');
            option.value = flight.id ? flight.id : '';
            option.textContent = flight.from + ' - ' + flight.to;
            SELECT.appendChild(option);
        });
    }
    catch (err) {
        console.error(err);
        return err instanceof Error ? err : new Error('An unknown error occurred');
    }
});
SEND_BTN.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const pasanger = createPasanger();
    if (!pasanger)
        return;
    try {
        const response = yield postDada(pasanger, 'pasangers');
        if (response instanceof Error) {
            console.error(response);
            return;
        }
        // console.log(response);
        NAME_INPUT.value = '';
    }
    catch (err) {
        console.error(err);
    }
}));
SELECT.addEventListener('change', () => __awaiter(void 0, void 0, void 0, function* () {
    FLIGHT_ID = SELECT.value;
    // console.log(FLIGHT_ID);
}));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield renderFlightOptions();
        console.log('Flight options rendered successfully');
    }
    catch (error) {
        console.error('Error rendering flight options:', error);
    }
    try {
        yield renderPassangers();
        console.log('Passangers rendered successfully');
    }
    catch (error) {
        console.error('Error rendering passangers:', error);
    }
});
main();
const deleteAll = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 300; i += 3) {
        yield deleteDada('pasangers', i.toString());
    }
});
// deleteAll();
