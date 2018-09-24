//require('bootstrap');
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

$(function () {
    const date = new Date(Date.now()).toISOString();
    const dateStamp = date.substring(8,10) + "|" + ((parseInt(date.substring(11,13))+2) % 24) + date.substring(13,19) + "|";
    
    const code = window.location.href.split("?")[1]
    let uid;
    //document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    if (document.cookie.includes("uid")) {
        uid = document.cookie.substring(4,)
    } else {
        uid = Math.floor(Math.random() * 10000)
        document.cookie = "uid=" + uid;
    }

    const stamp = dateStamp + code + "|" + uid;

    console.log(stamp);
    let answers = {};
    answers.uid = stamp;

    $('.consent_btn').click(function() {
        if ($('#consent1_yes').is(':checked') && $('#consent2_yes').is(':checked') && $('#consent3_yes').is(':checked') && $('#consent4_yes').is(':checked')) {
            $('#consent_btn').prop('disabled', false);
        } else {
            $('#consent_btn').prop('disabled', true);
        }
    });

    $(".btn-mail").click(function() {
        answers["email_input_end"] = $("[name='email_input_end']").val();
        sendAnswers(answers);
        $("#final-email").hide("fast");
        $("#final-email-sent").show("fast");
    });

    $(".btn-toPart").click(function() {
        // page switching
        $(".visible").hide(500).removeClass("visible");
        let nextPart = $(this).attr("data-to-part");
        $("#content_"+nextPart).show("fast").addClass("visible");
        $("html, body").animate({ scrollTop: 200 }, "fast");

        // window unload alert, removed at the end
        window.onbeforeunload = function() {
            return 'Opravdu chcete opustit tuto stránku? Můžete přijít o vyplněné odpovědi!';
        };

        if (nextPart === "end") {
            window.onbeforeunload = function() {
                return undefined;
            }
        }

        // we use the page switching buttons to save the answers as well
        let radio_questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16", "q17", "q18", "gender", "work", "fulltime", "head_teacher"]
        radio_questions.forEach((question) => {
            answers[question] = $("[name='" + question + "']:checked").val();
        })

        let text_questions = ["part1_feedback", "part2_feedback", "part3_feedback", "popularity", "email_input", "email_input_end", "age"]
        text_questions.forEach((question) => {
            answers[question] = $("[name='" + question + "'").val();
        })

        // answers for the field checkboxes & freeform form an array
        let field_answers = [];
        $("[name='field']:checked").each(function() {
            field_answers.push($(this).val());
        })

        if (field_answers.length > 0) {
            answers.field = field_answers;
        }

        // answers for the reflection checkboxes & freeform form an array
        let reflection_answers = [];
        $("[name='reflection']:checked").each(function() {
            reflection_answers.push($(this).val());
        })
        if ($("[name='reflection_free']").val()) {
            reflection_answers.push($("[name='reflection_free']").val());
        }

        if (reflection_answers.length > 0) {
            answers.reflection = reflection_answers;
        }

        // answers for the subject checkboxes & freeform form an array
        let subjects_answers = [];
        $("[name='subjects']:checked").each(function() {
            subjects_answers.push($(this).val());
        })
        if ($("[name='subjects_free']").val()) {
            subjects_answers.push($("[name='subjects_free']").val());
        }

        if (subjects_answers.length > 0) {
            answers.subjects = subjects_answers;
        }

        // email prompt switcher
        if ( (nextPart === "end") && ( !(answers.hasOwnProperty("email_input")) || answers.email_input === "" ) ) {
            $("#final-email").show();
        }

        console.log(answers);

        // sending the answers when the user reaches the end
        if ( (nextPart === "midend") || (nextPart === "end") || (nextPart === "5") ) {
            sendAnswers(answers);
        }
    });
});

function sendAnswers(answers) {
    for (var answer in answers) {
        if (!answers[answer])  {
            delete answers[answer]
        }
    }

    $.ajax({
        url: "https://fo6tnkl1i8.execute-api.eu-central-1.amazonaws.com/prod",
        type: "POST",
        crossDomain: !0,
        contentType: "application/json",
        data: JSON.stringify(answers),
        dataType: "json",
        success: function success(response) {
            console.log(response);
        }
    });
}