//require('bootstrap');
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

$(function () {
    const stamp = Date.now() + Math.floor(Math.random() * 10000);
    let answers = {};

    $('.consent_btn').click(function() {
        if ($('#consent1_yes').is(':checked') && $('#consent2_yes').is(':checked') && $('#consent3_yes').is(':checked') && $('#consent4_yes').is(':checked')) {
            $('#consent_btn').prop('disabled', false);
        } else {
            $('#consent_btn').prop('disabled', true);
        }
    });

    $(".btn-toPart").click(function() {
        // page switching
        $(".visible").hide(500).removeClass("visible");
        let nextPart = $(this).attr("data-to-part");
        $("#content_"+nextPart).show("fast").addClass("visible");

        // we use the page switching buttons to save the answers as well
        let radio_questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"]
        radio_questions.forEach((question) => {
            answers[question] = $("[name='" + question + "']:checked").val();
        })

        let text_questions = ["part1_feedback", "part2_feedback", "part3_feedback"]
        text_questions.forEach((question) => {
            answers[question] = $("[name='" + question + "'").val();
        })
        
        console.log(answers);
    });
});

/*
$.ajax({
    url: "https://ah3uqnxmak.execute-api.eu-central-1.amazonaws.com/prod",
    type: "POST",
    crossDomain: !0,
    contentType: "application/json",
    data: JSON.stringify({ "user_id": stamp, "q_id": qid, "val": val }),
    dataType: "json",
    success: function success(response) {
*/
/*
window.onbeforeunload = function() {
    console.log("quitting!");
    return 'Opravdu chcete opustit tuto stránku? Můžete přijít o vyplněné odpovědi!';
};*/