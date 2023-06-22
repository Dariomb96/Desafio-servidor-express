const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const totalInput = document.querySelector('input[name="total"]');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value;
    const total = parseFloat(totalInput.value);

    fetch('/products/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            total: total
        })
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
});