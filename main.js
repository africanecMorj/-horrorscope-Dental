let responseDb = JSON.parse(localStorage.getItem(`responseDb`)) || [];
let appointmentDb = JSON.parse(localStorage.getItem(`appointmentDb`)) || [];

function feedbackSystem (){
    return{
        showResponses: () => {
            $(`#feedBack__responseContainer`).empty();
            for(el of responseDb){
                if(el.starRate == 1){
                    $(`#feedBack__responseContainer`).append(`
                        <div class="feedback__resItem">
                            <h3>${el.userName}</h3>
                            <p>${el.resContent}</p>
                            <span>
                                <i class="fa-solid fa-star yellow"></i>
                                <i class="fa-solid fa-star gray"></i>
                                <i class="fa-solid fa-star gray"></i>
                                <i class="fa-solid fa-star gray"></i>
                                <i class="fa-solid fa-star gray"></i>
                            </span>
                        </div>`)
                }else if(el.starRate == 2){
                    $(`#feedBack__responseContainer`).append(`
                        <div class="feedback__resItem">
                            <h3>${el.userName}</h3>
                            <p>${el.resContent}</p>
                            <span>
                                <i class="fa-solid fa-star yellow"></i>
                                <i class="fa-solid fa-star yellow"></i>
                                <i class="fa-solid fa-star gray"></i>
                                <i class="fa-solid fa-star gray"></i>
                                <i class="fa-solid fa-star gray"></i>
                            </span>
                        </div>`)
                
                }else if(el.starRate == 3){
                    $(`#feedBack__responseContainer`).append(`
                        <div class="feedback__resItem">
                            <h3>${el.userName}</h3>
                            <p>${el.resContent}</p>
                            <span>
                                <i class="fa-solid fa-star yellow"></i>
                                <i class="fa-solid fa-star yellow"></i>
                                <i class="fa-solid fa-star yellow"></i>
                                <i class="fa-solid fa-star gray"></i>
                                <i class="fa-solid fa-star gray"></i>
                            </span>
                        </div>`)
                
                }else if(el.starRate == 4){
                    $(`#feedBack__responseContainer`).append(`
                        <div class="feedback__resItem">
                            <h3>${el.userName}</h3>
                            <p>${el.resContent}</p>
                            <span>
                                <i class="fa-solid fa-star yellow"></i>
                                <i class="fa-solid fa-star yellow"></i>
                                <i class="fa-solid fa-star yellow"></i>
                                <i class="fa-solid fa-star yellow"></i>
                                <i class="fa-solid fa-star gray"></i>
                            </span>
                        </div>`)
                
                }else if(el.starRate == 5){
                    $(`#feedBack__responseContainer`).append(`
                        <div class="feedback__resItem">
                            <h3>${el.userName}</h3>
                            <p>${el.resContent}</p>
                            <span>
                                <i class="fa-solid fa-star yellow"></i>
                                <i class="fa-solid fa-star yellow"></i>
                                <i class="fa-solid fa-star yellow"></i>
                                <i class="fa-solid fa-star yellow"></i>
                                <i class="fa-solid fa-star yellow"></i>
                            </span>
                        </div>`)
                }
            }
        },
        
        recordResponses: () => {
            let data = {
                starRate: $(`#feedback__selectionRate`).val(),
                userName: $(`#feedback__inpName`).val(),
                resContent:$(`#feedback__inpContent`).val(),
            }
            responseDb.push(data);
            localStorage.setItem(`responseDb`,JSON.stringify(responseDb));
        }
    }
    
};

function appointmentSystem () {
    return{
        sendAppoimtment: () => {
            let data = {
                patientName:$(`#appointment__name`).val(),
                patientGender:$(`#appointment__gender`).val(),
                patientPhone:$(`#appointment__phone`).val(), 
                patientEmail:$(`#appointment__email`).val(), 
                appointmentDate:$(`#appointment__date`).val(),
                departament:$(`#appointment__departament`).val(), 
                moreInformation:$(`#appointment__description`).val()
            };
            appointmentDb.push(data);
            localStorage.setItem(`appointmentDb`,JSON.stringify(appointmentDb));
            axios.post('https://formspree.io/f/mwpkladj', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                'Accept': 'application/json'
                }
            })
            
            .then(res => {
                $(`.feedBack__modalWindow`).fadeIn(300);
                $(`.feedBack__modalWindow`).text(`request was sent`)
                let timerId = setTimeout(()=>{$(`.feedBack__modalWindow`).fadeOut(300)},2000);
            })
            .catch(err =>{
                $(`.feedBack__modalWindow`).fadeIn(300);
                $(`.feedBack__modalWindow`).text(`cant send request, try later`)
                let timerId = setTimeout(()=>{$(`.feedBack__modalWindow`).fadeOut(300)},2000);
            })
        },
        showAppointmentHistory: () =>{
            console.log(appointmentDb)        
        }
            
    }
}



let appointment = appointmentSystem();
let feedBackSystem = feedbackSystem();
feedBackSystem.showResponses();
$(`.feedBack__modalWindow`).hide(0);
$(`.feedbackPage2`).fadeOut(0);
$(`#feedback__popup`).hide(0);
$(`#feedBack__btnPopup`).click(()=>{
    $(`.feedbackPage2`).fadeIn(300)
    $(`#feedback__popup`).show(300);
});
$(`#feedback__btnCancel`).click(()=>{
    $(`#feedback__popup`).hide(300);
    $(`.feedbackPage2`).fadeOut(300);
});
$(`#feedback__btnAgree`).click(()=>{
    feedBackSystem.recordResponses();
    feedBackSystem.showResponses();
    $(`#feedback__popup`).hide(300);
    $(`.feedbackPage2`).fadeOut(300);
    document.getElementById(`feedback__inpName`).value = ``;
    document.getElementById(`feedback__inpContent`).value = ``;
    document.getElementById(`feedback__selectionRate`).value = `1`;
});

$(`#appointment__formBtn`).click(()=>{
    appointment.sendAppoimtment();
});
