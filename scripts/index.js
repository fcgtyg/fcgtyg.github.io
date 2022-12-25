$( document ).ready(function(){
    generate_html("db/card_info.json", generate_fancy_card_html, "shortcut-container")

    generate_html("db/education.json", generate_education_html, "education-body")

    generate_html("db/skill.json", generate_skill_html, "skills-body")

    generate_html("db/certificate.json", generate_certificate_html, "certificate-body")

    generate_html("db/experience.json", generate_career_html, "career-body")

    generate_html("db/project.json", generate_project_html, "projects-body")

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

function generate_career_html(data){
    start_date = data.start_date
    start_date_split = start_date.split(" ")
    end_date = "Currently Working"
    if(data.end_date){
        end_date = "Until " + data.end_date
    }
    reference_html = ""
    if(data.references)
        reference_html = generate_career_reference_html(data.references)
    skill_html = generate_skill_badge(data.tech_stack)
    return `
        <div class="timeline-row">
            <div class="timeline-time">${start_date_split[0]}<small>${start_date_split[1]}</small></div>
            <div class="timeline-content">
                <i class="icon-attachment"></i>
                <small>${end_date}</small>
                <h4>${data.title}</h4>
                <h6>${data.corporation}</h6>
                <hr class="my-1" />
                <p>
                    ${data.description}
                </p>
                <p>
                <span>References</span>
                    ${reference_html}
                </p>
                <div class="thumbs">
                <span class="badge bg-dark mx-1">${data.location}</span>
                <span class="badge bg-dark mx-1">${data.place}</span>
                <span class="badge bg-dark mx-1">${data.type}</span>
                </div>
                <div>
                    ${skill_html}
                </div>
            </div>
        </div>
    `
}

function generate_career_reference_html(data_list){
    html = ""
    for (let reference of data_list){
        html += `
            <a class="text-reset" href="${reference.profile}">${reference.name}</a>
        `
    }

    return html
}

function generate_skill_badge(data_list){
    html = ""
    for(let data of data_list){
        html += `
            <span class="badge bg-success">${data}</span>
        `
    }
    return html
}


function generate_project_html(data){
    
    if(data.end_date){
        end_date = data.end_date
    }else{
        end_date = "InProgress Now"
    }

    end_date_split = end_date.split(" ")

    skill_html = generate_skill_badge(data.tech_stack)
    return `
        <div class="timeline-row">
        <div class="timeline-time">${end_date_split[1]}<small>${end_date_split[0]}</small></div>
        <div class="timeline-content">
            <i class="icon-code"></i>
            <small>Started at ${data.start_date}</small>
            <h4>${data.title}</h4>
            <p>
                ${data.description}
            </p>
            <div class="thumbs">
            <span class="badge bg-dark mx-1">${data.corporation}</span>
            </div>
            <div>
                ${skill_html}
            </div>
        </div>
        </div>
    `
}