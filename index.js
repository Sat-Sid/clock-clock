const toggle_icon = document.querySelector("input.form-check-input");
const clock_body = document.querySelector(".clock_body");
const clock_frame = document.querySelector(".clock_frame");
const analog_clock = document.querySelector(".analog_clock");
const digital_clock = document.querySelector(".digital_clock");

const d_month = document.querySelector("p.d_month");
const d_date = document.querySelector("p.d_date");
const d_hr = document.querySelector("h1.d_hour");
const d_mt = document.querySelector("h1.d_minutes");
 
const a_hr = document.querySelector(".hr_hand");
const a_mt = document.querySelector(".mt_hand");
const a_sec = document.querySelector(".sec_hand");

let initial_rotate = true;
let initial_rotate_deg = 0;

//update every second
setInterval(function(){
    let currentDateTime = date_tm_module();
    digital_dmt_setter(currentDateTime);
    analog_tm_setter(currentDateTime);
}, 1000);


//add event listener to toggle
toggle_icon.addEventListener("click", function(){
    if (toggle_icon.checked){
        //show digital clock
        show_digital_clock();
    } else {
        //show analog clock
        show_analog_clock();
    };
});

//function to show digital clock and remove analog clock
function show_digital_clock() {
    clock_body.classList.remove("clock_body_analog");
    clock_body.classList.add("clock_body_digital");
    digital_clock.classList.remove("d-none");
    analog_clock.classList.add("d-none"); 
}

//function to show analog clock and remove digital clock
function show_analog_clock() {

    /////////////////TEST//////////////////
    //quick animation for minute hand
    while (initial_rotate) {
        a_mt.style.transform = "rotate(" + initial_rotate_deg + "deg)";
        a_mt.style.transition = "transform 2s linear";

        initial_rotate_deg ++;

        if (initial_rotate_deg > date_tm_module()[1]) {
            initial_rotate = false;
        }
    }
    
    initial_rotate = true;
    initial_rotate_deg = 0;
    ///////////////////////////////////

    clock_body.classList.remove("clock_body_digital");
    clock_body.classList.add("clock_body_analog");
    analog_clock.classList.remove("d-none");
    digital_clock.classList.add("d-none");

}

//calculate hour, minute & sec hand's deg rotation and set those values
function analog_tm_setter(current_date_time_analog) {

    let ct_hr = current_date_time_analog[0];
    let ct_mt = current_date_time_analog[1];
    let ct_sec = current_date_time_analog[2];

    //NOTE: 
    //MINUTE DEG = ((CT_MT * 60) + CT_SEC) * (6 / 60)
    //HOUR DEG = ((CT_HR * 60 * 60) + (CT_MT * 60) + CT_SEC) * (30 / (60 * 60))

    let ct_hr_deg = ((ct_hr * 60 * 60) + (ct_mt * 60) + (ct_sec)) * (30 / (60 * 60));
    let ct_mt_deg = ((ct_mt * 60) + ct_sec) * (6 / 60);
  
    a_hr.style.transform = "rotate(" + ct_hr_deg + "deg)";
    a_mt.style.transform = "rotate(" + ct_mt_deg + "deg)";
    a_sec.style.transform = rotate_deg(ct_sec);
}

//returns current date & time as an array
function date_tm_module(){
    current_d_time = new Date();

    let current_hours = current_d_time.getHours();
    let current_minutes = current_d_time.getMinutes();
    let current_seconds = current_d_time.getSeconds();
    let current_date_string = current_d_time.toDateString();

    return [current_hours, current_minutes, current_seconds, current_date_string];
}

//this function return's formated value of 6deg rotation which can be added to any.styles.transform
function rotate_deg(current_seconds){
    let curr_sec = current_seconds;
    let deg_rotate = curr_sec * 6;

    return "rotate(" + deg_rotate + "deg)";
}

//formate date, month & time and set it for digital clock
function digital_dmt_setter(current_date_time_digital){

    let d_m_t = current_date_time_digital;
    let d_m_array = d_m_t[3].slice(4, 10).split(" ");

    clock_frame.style.transform = rotate_deg(d_m_t[2]);
    d_month.innerText = d_m_array[0].toUpperCase();
    d_date.innerText = d_m_array[1];

    d_m_t.slice(0, 2).forEach(function(hr_mt_value, index){
        if (hr_mt_value < 10) {
            if (index == 0) {
                d_hr.innerText = "0" + d_m_t[0];
            } else {
                d_mt.innerText = "0" + d_m_t[1];
            }
        } else {
            if (index == 0) {
                d_hr.innerText = d_m_t[0];
            } else {
                d_mt.innerText = d_m_t[1];
            }
        }
    });
}

