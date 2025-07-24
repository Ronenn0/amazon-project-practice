//exercises
function xhrGreeting() {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        console.log(xhr.response);
    });

    xhr.open('GET', 'https://supersimplebackend.dev/greeting');
    xhr.send();
}

async function fetchGreeting() {
    fetch('https://supersimplebackend.dev/greeting').then(response => {
        return response.text();
    }).then(hello => {
        console.log(hello);
    });
}
await fetchGreeting();
async function fetchGreetingAwait() {
    const response = await fetch('https://supersimplebackend.dev/greeting');
    console.log(await response.text());
}
await fetchGreetingAwait();

async function fetchPOSTGreeting() {
    const response = await fetch('https://supersimplebackend.dev/greeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Ronen Azam'
        })
    });
    const answer = await response.text();
    console.log(answer);
}
await fetchPOSTGreeting();

async function amazonRequest() {
    try {
        const response = await fetch('https://www.amazon.com');
        const answer = await response.json();
        console.log(answer);
    }
    catch {
        console.log('CORS error. Your resquest was blocked by the backend.');

    }
}
//await amazonRequest();

async function emptyPOST() {
    try {
        const response = await fetch('https://supersimplebackend.dev/greeting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.status);
        if (response.status >= 400) {
            throw response;
        }
        const answer = await response.json();
    }
    catch (error) {
        if (error.status == 400) {
            const msg = await error.json();
            console.log(msg);

        } else {
            console.log('Network error. Please try again later.');
        }
    }
}
await emptyPOST();