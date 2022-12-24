$( document ).ready(function(){
    fetch("db/card_info.json")
        .then((response) => response.json())
        .then((json) => {
            for( let data of json)
                $("#shortcut-container").append(
                    generate_fancy_card_html(data)
                )
            }
        );

        


})


function generate_fancy_card_html(data){
    return `
    <div class="col-md-6 col-lg-3">
        <div class="cardFancy">
        <div class="face face1">
            <div class="content">
            <img src="${data.img}" alt="Card image cap" />
            <h3>${data.title}</h3>
            </div>
        </div>
        <div class="face face2">
            <div class="content">
            <p>${data.description}</p>
            <a href="${data.href} " ${data.is_external ? 'target=\"_blank\"' : ''}>Read More</a>
            </div>
        </div>
        </div>
    </div>
    `
}