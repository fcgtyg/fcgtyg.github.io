$( document ).ready(function(){
    generate_html("db/card_info.json", generate_fancy_card_html, "shortcut-container")

    generate_html("db/education.json", generate_education_html, "education-body")

    generate_html("db/skill.json", generate_skill_html, "skills-body")

    generate_html("db/certificate.json", generate_certificate_html, "certificate-body")

})

function generate_html(file_path, func, element_id){
    fetch(file_path)
        .then((response) => response.json())
        .then((json) => {
            for( let data of json)
                $(`#${element_id}`).append(
                    func(data)
                )
            }
        );
}

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

function generate_education_html(data){
    return `
    <p class="h4">
        ${data.program} - ${data.school}
    </p>
    <p>
        <span class="badge bg-dark">${data.degree}</span>
        <span class="badge bg-dark">${data.start_date} - ${data.end_date}</span>
        <span class="badge bg-dark">${data.gpa}</span>
    </p>
    <p>
        <small>${data.description}</small>
    </p>
    <hr class="my-4" />
    `
}

function generate_skill_html(data){
    if(data.type == "language"){
        bg = "bg-danger"
    }else if(data.type == "soft"){
        bg = "bg-primary"
    }else{
        bg = "bg-success"
    }
    return `
        <div class="progress m-3" style="height: 20px">
            <div class="progress-bar ${bg}" role="progressbar" style="width: ${data.profiency * 10}%;">${data.title}</div>
        </div>
    `
}

function generate_certificate_html(data){
    return `
        <p class="h4">
            ${data.title}
        </p>
        <p class="fst-italic">
            ${data.authority} - ${data.date} - ${data.duration} Hours
        </p>
        <hr class="my-4" />
    `
}

function generate_skill_badge(data){
    bg = "bg-success"
    return `
        <span class="badge ${bg}">${data.title}</span>
    `
}