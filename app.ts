const SELECT : HTMLSelectElement = document.querySelector("select")!;
const BODY = document.querySelector(".body");
const NAME_INPUT : HTMLInputElement = document.querySelector("#name")!;
const MALE_BTN : HTMLInputElement = document.querySelector("#male")!;
const FEMALE_BTN : HTMLInputElement = document.querySelector("#female")!;
const SEND_BTN : HTMLButtonElement = document.querySelector("#btnSend")!;
const REFRESH_BTN = document.querySelector("#btnRefresh");
const AGENT_ID : string = 'Top travel agency';
let FLIGHT_ID : string = SELECT.value;
let baseURL : string = "https://66e98a6387e417609449dfc5.mockapi.io/api/";


interface Flight {
    dare : string;
    from : string;
    to : string;
    id? : string;
}

interface Pasanger{
    createdAt: string;
    name: string
    gender: string
    flight_id: string
    agent: string
    id?: string
}

type Data = Flight | Pasanger;


// פונקצייה גנרית לבקשות גט משרת עם נקודת קצה כפרמטר
const getData = async (endPoint : string) : Promise<Data[] | Error> => {
    try{
        const response : Response = await fetch(`${baseURL}${endPoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data : Data[] = await response.json();
        console.log(data);
        return data;
    }
    catch(err){
        console.error(err);
        return err instanceof Error ? err : new Error('An unknown error occurred');
    }

};       


// פונקציה גנרית שמקבלת נקודת קצה ואובייקט ושולחת לשרת בקשת פוסט
const postDada = async (obj : Data, endPoint : string = '') : Promise<Data | Error> => {
    try{
        const response : Response = await fetch(`${baseURL}${endPoint}`, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data : Data = await response.json();
        console.log(data);
        return data;
    }
    catch(err){
        console.error(err);
        return err instanceof Error ? err : new Error('An unknown error occurred');
    }
}

// פונקצייה גנרית לעדכון אובייקט במסד הנתונים
const putDada = async (obj : Data, endPoint : string = '', id : string) : Promise<Data | Error> => {
    try{
        const response : Response = await fetch(`${baseURL}${endPoint}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data : Data = await response.json();
        console.log(data);
        return data;
    }
    catch(err){
        console.error(err);
        return err instanceof Error ? err : new Error('An unknown error occurred');
    }
}


// פונקצייה גנרית למחיקת אובייקט במסד הנתונים
const deleteDada = async (endPoint : string = '', id : string) : Promise<Data | Error> => {
    try{
        const response : Response = await fetch(`${baseURL}${endPoint}/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data : Data = await response.json();
        console.log(data);
        return data;
    }
    catch(err){
        console.error(err);
        return err instanceof Error ? err : new Error('An unknown error occurred');
    }
}

const dugma: Pasanger = {
"createdAt": new Date().toISOString(),
"name": "נחמן",
"gender": "male",
"flight_id": "6141d9a8b5bafeb7b438f77a",
"agent": "טיסות לרבינו",
}


// פונקצייה שיוצרת אובייקט של נוסע בטיסה ומחזירה אותו
const createPasanger =  () : Pasanger | null=>  {

    const name:string = NAME_INPUT.value;

    if (!name) {
        alert('Enter name');
        return null;
    }
    if(!FLIGHT_ID){
        alert('Choose flight');
        return null;
    }

    const gender:string = MALE_BTN.checked ? 'male' : 'female';

    const pasanger : Pasanger = {
        createdAt: new Date().toISOString(),
        name: name,
        gender: gender,
        flight_id: FLIGHT_ID,
        agent: 'טיסות לרבינו',
    }

    return pasanger;
}



SEND_BTN.addEventListener('click', async () => {
    const pasanger : Pasanger | null = createPasanger();
    if(!pasanger) return;

    const response : Data | Error = await  postDada(pasanger, 'pasangers');
})

