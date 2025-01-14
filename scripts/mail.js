const inputSubmit = document.querySelector(".btn__product-submit");
let controller = new AbortController();
const formMessage = document.getElementById("form-message");

function convertFormData(formData) {
	const form = new FormData(formData);
	console.log(form.get("email"));
	return form;
};

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");
    convertFormData(form);
    form.addEventListener("submit", formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);
        const formData = new FormData(form);
	/*const formData = form => {
		const {elements} = form;
		Array.from(elements).map(element => {
		const {name, value} = element;
		console.log({name, value});
		});
	};
	formData(form);*/
        if(error === 0) {
            const response = await fetch('http://31.31.202.81/v1/', {
                method: "POST",
                body: JSON.stringify(
			{email: formData.get("email"), 
			 company: formData.get('company'), 
			 message: formData.get('message'),
			 tel: formData.get('tel'),
			 select: formData.get('select'),
			 name: formData.get('name')
		}),
		     headers: {'Content-Type': 'application/json'},
             signal: controller.signal,
            });
		console.log(formData);
            if(response.ok) {
                const result = await response.json();
                console.log("response ok");
		console.log(result);
                alertSendForm(inputSubmit, "Сообщение отправлено");
                restartInput();
            } else {
		controller.abort();
                resetFetch();
                console.log(`response ne ok`);
                alertSendForm(inputSubmit, "Ошибка");
                restartInput();
            }
        } else {
            console.log("empty");
    }
}
});

const resetFetch = () => {
    setTimeout(() => {
        controller = new AbortController();
    }, 1500);
}


const alertSendForm = (element, value) => {
    element.value = value;
};

const restartInput = () => {
    setTimeout(() => {
        alertSendForm(inputSubmit, "Отправить запрос");
    }, 1500);
}

function formValidate(form) {
    let error = 0;
    const captchaInput = document.querySelector('.form__captcha-input');
    const warning = document.querySelector(".captcha__warning");
    const char = document.querySelector(".captcha__char").innerHTML;
    const inputs = document.querySelectorAll('.req');
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].value === '') {
            error++;
        }
    }
    if(captchaInput.value === char) {
        console.log("true captcha");
        warning.style.display = "none";
    } else {
        console.log("false captcha");
        warning.style.display = "block";
        captchaInput.value = "";
	error++;
    }
   
    return error;
};

function createCaptcha(text) {
    if(typeof text != "string") {
        return;
    }
    const inputText = document.querySelector(".form__captcha-target");
    let innerHTML = inputText.innerHTML;
    let index = innerHTML.indexOf(text);
    const rand = Math.floor(Math.random() * inputText.dataset.value);
    index = rand;
    if (index >= 0) { 
     innerHTML = innerHTML.substring(0, index) + "<span class='captcha__char'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
     inputText.innerHTML = innerHTML;
    }
}

createCaptcha("e");
