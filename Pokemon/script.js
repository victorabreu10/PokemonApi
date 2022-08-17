var formulario = document.querySelector('form')

formulario.addEventListener('submit', function(e){
    //bloqueio o refresh da pagina 
    e.preventDefault()
    // Url da pesquisa
    let urlForm = "https://pokeapi.co/api/v2/pokemon/";
    //Valoe do inpt name
    let nome = document.getElementById("name")
    //concatenar a url com o inpt name  
    urlForm = urlForm + this.name.value
    //transformar os valores em minusculos
    urlForm = urlForm.toLocaleLowerCase()

    //ID Content
    let resposta = document.getElementById('content')

    //ID ImgPokemon
    let iamgem = document.getElementById('imgPokemon')

    //Resposta Html
    let html = ''

    fetch(urlForm)
    .then(resposta => resposta.json() )
    .then (function(data){
        console.log(data)
        html = 'Nome: ' + maiuscula(data.forms[0].name) + '<br>'
        html = html + 'Type: ' + maiuscula(data.types[0].type.name)
        resposta.innerHTML = html

        iamgem.innerHTML = "<img src='" + data.sprites.front_default + "'><img src='" + data.sprites.back_default + "'>"
        function gettype(){
            if (data.types.length == 2) {
                return '' + maiuscula(data.types[0].type.name) + " & " + maiuscula(data.types[1].type.name)
            }
    
            return '' + maiuscula(data.types[0].type.name)
        }
    })
    .catch(function(err){   
        if(err == 'SyntaxError: Unexpected token N, "Not Found" is not valid JSON'){
            html = 'Pokemon não encontrado! 😪'
        } 
        else{
            html = err
        }
        resposta.innerHTML = html
    })

});

function maiuscula(val)
{
    return val[0].toUpperCase() + val.substr(1)
}