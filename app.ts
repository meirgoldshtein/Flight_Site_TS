const SELECT : HTMLSelectElement = document.querySelector("select")!;
const PASANGERS_CONTAINER : HTMLDivElement = document.querySelector(".body")!;
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

interface Details{
    name? : string;
    gender? : string;
    flight_id? : string;
    agent? : string;
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
        // console.log(data);
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
        // console.log(data);
        return data;
    }
    catch(err){
        console.error(err);
        return err instanceof Error ? err : new Error('An unknown error occurred');
    }
}

// פונקצייה גנרית לעדכון אובייקט במסד הנתונים
const putDada = async <T>(obj : T, endPoint : string = '', id : string) : Promise<T | Error> => {
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
        const data : T = await response.json();
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
        // console.log(data);
        return data;
    }
    catch(err){
        console.error(err);
        return err instanceof Error ? err : new Error('An unknown error occurred');
    }
}

// מאזין לעריכת נוסע
const btnEditListener = (event : Event) : void => {
    const btnEdit : HTMLButtonElement = event.target as HTMLButtonElement;
    const card : HTMLDivElement = btnEdit.parentElement! as HTMLDivElement;
    const inputs = card.querySelectorAll('input');
    const btnSave = card.querySelector('.btnSave') as HTMLButtonElement;     
    btnSave.disabled = !btnSave.disabled;
    inputs.forEach((input: HTMLInputElement) => {
        input.disabled = !input.disabled;  
    });

}

// מאזין לעדכון פרטי נוסע
const btnSaveListener = async (event : Event) : Promise<void>  => {
    const btnSave : HTMLButtonElement = event.target as HTMLButtonElement;
    const card : HTMLDivElement = btnSave.parentElement! as HTMLDivElement;
    const inputs = card.querySelectorAll('input');
    const name = inputs[0].value;
    const gender = inputs[1].value;
    const pasanger : Details = {name, gender};
    await putDada(pasanger, 'pasangers', btnSave.id);
    renderPassangers();
}

// פונקצייה לרנדור כל הטיסות של הסוכן הנוכחי
const renderPassangers = async () : Promise<void | Error> => {
    try{
        const data : Data[] | Error = await getData('pasangers?agent=Top%20travel%20agency');
        if(data instanceof Error){
            console.error(data);
            return;
        }   
        // console.log(data);
        PASANGERS_CONTAINER.innerHTML = '';
        (data as Pasanger[]).forEach((pasanger : Pasanger) => {
            const card = document.createElement('div');
            card.classList.add('card');
            const details = document.createElement('div');
            details.classList.add('details');
            details.innerHTML = `
                <input type="text" class="inputDetails" value="${pasanger.name}" disabled>
                <input type="text" class="inputDetails" value="${pasanger.gender}" disabled>`;
            card.appendChild(details);

            // הוספת כפתור עריכה
            const btnEdit : HTMLButtonElement = document.createElement('button')!;
            btnEdit.id = pasanger.id? pasanger.id.toString(): '';
            btnEdit.textContent = 'Edit';
            btnEdit.classList.add('btnEdit');
            card.appendChild(btnEdit);
            btnEdit.addEventListener('click', (e) => btnEditListener(e));

            // הוספת כפתור שמירה
            const btnSave : HTMLButtonElement = document.createElement('button')!;
            btnSave.textContent = 'Save';
            btnSave.id = pasanger.id? pasanger.id.toString(): '';
            btnSave.disabled = true;
            btnSave.classList.add('btnSave');
            card.appendChild(btnSave);
            btnSave.addEventListener('click', async (e) => {btnSaveListener(e)});

            // הוספת כפתור מחיקה
            const btnDelete : HTMLButtonElement = document.createElement('button')!;
            btnDelete.textContent = 'Delete';
            btnDelete.classList.add('btnDelete');
            btnDelete.id = pasanger.id? pasanger.id.toString(): '';
            card.appendChild(btnDelete);
            btnDelete.addEventListener('click', async (e) => {
                await deleteDada('pasangers', btnDelete.id);
                renderPassangers();
            });
            PASANGERS_CONTAINER.appendChild(card);   
        });
    }
    catch(err){
        console.error(err);
        return err instanceof Error ? err : new Error('An unknown error occurred');
    }
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
        agent: AGENT_ID,
    }

    return pasanger;
}


// פונקציייה לרנדור כל הטיסות לבחירה בסלקט
const renderFlightOptions = async () : Promise<void | Error> => {
    
    try{
        const res : Data[]|Error = await getData(`flights`);
        if(res instanceof Error){
            console.error(res);
            throw new Error(`${res}`);
            
        }

        // const data : Flight[] = await response.json();
        // console.log(res);
        (res as Flight[]).forEach((flight : Flight) => {
            const option = document.createElement('option') as HTMLOptionElement;
            option.value = flight.id? flight.id : '';
            option.textContent = flight.from + ' - ' + flight.to;
            SELECT.appendChild(option);
        });
    }
    catch(err){
        console.error(err);
        return err instanceof Error ? err : new Error('An unknown error occurred');
       
    }
}


SEND_BTN.addEventListener('click', async () => {
    const pasanger : Pasanger | null = createPasanger();
    if(!pasanger) return;
    try{
        const response : Data | Error = await  postDada(pasanger, 'pasangers');
        if(response instanceof Error){
            console.error(response);
            return;
        }

        // console.log(response);
        NAME_INPUT.value = '';
    }
    catch(err){
        console.error(err);
    }

    
})


SELECT.addEventListener('change', async () => {
    FLIGHT_ID = SELECT.value;
    // console.log(FLIGHT_ID);
})
const main = async () => {
    try {
        await renderFlightOptions();
        console.log('Flight options rendered successfully');  
    } catch (error) {
        console.error('Error rendering flight options:', error); 
    }

    try {
        await renderPassangers();
        console.log('Passangers rendered successfully');  
    } catch (error) {
        console.error('Error rendering passangers:', error); 
    }
};

main();
const deleteAll = async () => {
    for(let i = 0; i < 300; i+=3){
        await deleteDada('pasangers',i.toString());
   }
}
// deleteAll();