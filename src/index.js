//require('bootstrap');
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

$(function () {
    const stamp = Date.now() + Math.floor(Math.random() * 10000);
    let answers = {};
    answers.uid = stamp;

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
        let radio_questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16", "q17", "q18"]
        radio_questions.forEach((question) => {
            answers[question] = $("[name='" + question + "']:checked").val();
        })

        let text_questions = ["part1_feedback", "part2_feedback", "part3_feedback", "popularity", "email_input"]
        text_questions.forEach((question) => {
            answers[question] = $("[name='" + question + "'").val();
        })

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

        // sending the answers when the user reaches the end
        if (nextPart === "end") {
            sendAnswers(answers);
        }

        console.log(answers);
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
        }
    });
}