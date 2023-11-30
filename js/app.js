// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];
        crearHTML();
    })
}

// Funciones
function agregarTweet(e){
    e.preventDefault()
    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    if(tweet === ''){
        mostrarError('Un tweet no puede ir vacio')
        return; // Evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet // es igual a esto = tweet: tweet
    }

    // Añadir a el arreglo de tweets
    tweets = [...tweets, tweetObj]; // Tomamos una copia del array
    
    //Una vez agregado vamos a crear el HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
}

function mostrarError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(()=>{
        mensajeError.remove()
    }, 3000)
}

function sincronizarStorage () {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Muestra un listado de los tweets
function crearHTML(){

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach( tweet => {
            
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X'

            // Agregar la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet( tweet.id ); // tweet se refiere al objeto actual, y accedemos a su id
            }

            const li = document.createElement('li');
            //Añadir el texto
            li.innerText = tweet.tweet

            // Asignar el boton
            li.appendChild(btnEliminar)

            // Insertarlo en el html
            listaTweets.appendChild(li)
        })
    }
    // Agregar los tweets actuales a LocalStorage
    sincronizarStorage();
}

function borrarTweet(id){
    // Nos crea un nuevo array y filtra todos menos el seleccionado (borrado) 
    tweets = tweets.filter( tweet => tweet.id !== id ); 
    
    crearHTML();
    
}

// Limpiar el HTML que se repite debido al appenChild
function limpiarHTML () {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}



