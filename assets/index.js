const apiRef = "https://reqres.in/api/users?delay=3"; // se declara variable para referenciar la API
const tableData = document.querySelector("tbody"); // variable para referenciar el cuerpo de tabla
const readData = document.querySelector("#readUser"); 

readData.addEventListener("click",()=>{ // se añade evento para botón de leer usuario
    fetch(apiRef)
    .then(response => response.json())
    .then(data => {
        const users = data.data;

        const lifeSpan = Date.now() + 60000; // se define tiempo de vida como 1 min en ms
        const userData = { //objeto que sirve para almacenar los datos de
            lifespan: lifeSpan,
            data: users
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        tableData.innerHTML = "";

        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.email}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td><img src="${user.avatar}" alt="Avatar"></td>
            `;
            tableData.appendChild(row);
            
        });
    })
    .catch(error => console.log("Error Fetching Data", error));
});

const storedUsers = localStorage.getItem('userData');
        if (storedUsers) {
            const users = JSON.parse(storedUsers);
            if (users.lifespan > Date.now()){
                const userData = users.data;
                userData.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.email}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td><img src="${user.avatar}" alt="Avatar"></td>
                    `;
                    tableData.appendChild(row);
                });
            } else {
                localStorage.removeItem('userData')
            }
        }