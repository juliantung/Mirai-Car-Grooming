$(document).ready(function() {
    // Star rating functionality
    let rating = 0;

    window.highlightStars = function(num) {
        for (let i = 1; i <= num; i++) {
            $(`#ratings .star:nth-child(${i})`).addClass('highlighted');
        }
    };

    window.resetStars = function() {
        $('#ratings .star').removeClass('highlighted');
    };

    window.rate = function(num) {
        rating = num;
        resetStars();
        highlightStars(num);

        // Add glowing effect and size increase to all highlighted stars
        //for (let i = 1; i <= num; i++) {
         //   $(`#ratings .star:nth-child(${i})`).addClass('clicked');
        //}

        setTimeout(function() {
            if (num <= 3) {
                $('#pageTitle').text("Tell us more");
                $('#ratings').hide();
                $('#testing').hide();
                $('#feedback').show().addClass('active');
            } else {
                //Paste review link above
                window.location.href = 'https://search.google.com/local/writereview?placeid=ChIJe53QRNEX2jERiTOfbqTMf9g';
                //Paste navigator link above such as website
                //Change for specific companies
            }
        }, 200); // 0.5 second delay

        // Remove the glowing effect and size increase after some time
        setTimeout(function() {
            $(`#ratings .star`).removeClass('clicked');
        }, 150);

        
        $('#ratingValue').val(rating);
    };

    $('#feedbackForm').submit(function(event) {
        event.preventDefault(); 

        $.ajax({
            type: "POST",
            url: "https://api.web3forms.com/submit",
            data: $(this).serialize(),
            dataType: "json",
            success: function(response) {
                if (response.success) {
                    console.log("Feedback sent successfully!");
                } else {
                    console.error("There was an error sending your feedback: " + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX error: " + status + " - " + error);
            },
            complete: function() {
                $("#feedbackForm")[0].reset();
                $('#feedback').hide();
                $('#ratings').show();
                setTimeout(function() {
                    $('.contact-us-message').show(); // Show the contact us message after 2 seconds
                }, 10);
            }
        });
    });
});















