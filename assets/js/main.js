// DOM
const url = 'https://frontend-take-home.fetchrewards.com/form';

const form = document.querySelector('#searchform');
const occupationsLabel = document.querySelector('#Occupation');
const statesLabel = document.querySelector('#State');

const fullName = document.querySelector('#FullName');
const password = document.querySelector('#Password');
const email = document.querySelector('#Email');
const invalid = document.querySelectorAll('div.invalid-feedback')

const button = document.querySelector('button')



// left off creating validation for each input : adding valid if their was text or not



// <!-- Key if valid or not 
// Valid : class="form-control is-valid" <- in input field
// Valid : class="valid feedback" <- right after input
// invalid : class="form-control is-invalid" <- in input field
// invalid : class="invalid-feedback" <- right after input
//  respond with : missing text--> 

//Script Format :DOM -> getData -> Data manipulation -> Error & Success Handling Specific Functions 


getData();

//input validation

fullName.addEventListener('input', checkName)
password.addEventListener('input', checkPassword)
email.addEventListener('input', checkEmail)

//async function to grab occupation & state data inside url

async function getData() {
  try {
      const response = await axios.get(url);
      const occupationsData = response.data.occupations;
      const statesData = response.data.states;

    //  create function called with occupations & states data as arguments
      create(occupationsData, statesData);
  } catch (error) {
      onError(error);
    }
}

// create function (Data Manipulation)

function create(occupation, state) {

    // iterate over occupation + option element creation & append  

    for (let each of occupation)
    {
        const option = document.createElement('option');
        
        option.append(each);
        occupationsLabel.append(option);
        
    }
    
    // iterate over state + option elements creation & append

    for (let i = 0; i < state.length; i++)
    {
        const option = document.createElement('option');
        

        option.append(state[i].abbreviation);
        statesLabel.append(option);
    }
   
}

// Submit Detection (Data Manipulation)

form.addEventListener('submit', function (e) {
    e.preventDefault()
    try {
    axios({
         method: 'post',
         url: url,
         data: {
            name: `${form.FullName.value}`,
            email: `${form.Email.value}`,
            password: `${form.Password.value}`,
            occupation: `${form.Occupation.value}`,
            state: `${form.State.value}`
        },
     
    // used to validate the status of the request
   
    validateStatus: () => true
    }).then(res => { 
        console.log(res.status);
         
    })
      
        button.innerText = 'Data Submitted';
       
    }
    catch (e) {
        console.log(e)
        onError(e)
    }
});

// For error Handling 

function onError(e) {

    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    h1.innerText = `Oh no Error!!`;
    p.innerText = `${e}`;

    document.body.append(h1);
    document.body.append(p);
}


//input Validation for FullName, Password, and Email

function checkName(e) {

        if (e.target.value !== '') {
            fullName.className = ''
            fullName.className = 'form-control is-valid';
            
        }
        else {
            fullName.className = 'form-control is-invalid';
            
        }
    
} 
function checkPassword(e) {

        if (e.target.value !== '') {
            password.className = ''
            password.className = 'form-control is-valid';
        }
        else {
            password.className = 'form-control is-invalid';
        }
    
} 
function checkEmail(e) {

        if (e.target.value !== '') {
            email.className = ''
            email.className = 'form-control is-valid';
        }
        else {
            email.className = 'form-control is-invalid';
        }
    
} 


// The last three functions could have been made into one and wanted to add some ARIA attributes into the html. I just didn't have the time but still wanted to submit it in a timely manner. 

// All in all, Thankyou very much for this opportunity. I loved this mini project :)