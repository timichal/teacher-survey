//require('bootstrap');
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

$(function () {

    $('.consent_btn').click(function() {
        if ($('#consent1_yes').is(':checked') && $('#consent2_yes').is(':checked') && $('#consent3_yes').is(':checked') && $('#consent4_yes').is(':checked')) {
            $('#toPart2').prop('disabled', false);
        } else {
            $('#toPart2').prop('disabled', true);
        }
    });

    $("#toPart2").click(function() {
        $("#content_1").hide(500);
        $("#content_2").show("fast");
    });
});

/*window.onbeforeunload = function() {
    return 'Are you sure you want to navigate away from this page?';
};*/