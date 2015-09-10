//   _______                __                       _____     ______
//  |__   __|              / _|                     |_   _|   / / __ \
//     | |_   _ _ __   ___| |_ ___  _ __ _ __ ___     | |    / / |  | |
//     | | | | | '_ \ / _ \  _/ _ \| '__| '_ ` _ \    | |   / /| |  | |
//     | | |_| | |_) |  __/ || (_) | |  | | | | | |  _| |_ / / | |__| |
//     |_|\__, | .__/ \___|_| \___/|_|  |_| |_| |_| |_____/_/   \____/
//         __/ | |
//        |___/|_|
//
//    form-submit event demo
//
//    This demo application simply demonstrates how the form-submit in Typeform I/O
//    works.
//
//    Run the `run-server.sh` script to start a server, navigate to http://localhost:8000
//    and try it out.
//
//    The code is open source and available at https://github.com/typeformio/form-submit-demo



// Which page to start on
var first_page = "one";

/////////////////////
// Individual page actions
/////////////////////
var pages = {
  "page_one": function() {
    fadeInStepsInPage('one', ['one', 'two', 'three', 'four']);
    // When the user clicks on the ready button, go to page two
    this.on('click', '#ready', function() {
      goToPage('two');
    });
  },
  "page_two": function() {
    // Defer and focus the form for user input
    setTimeout(function() {
      $('#form').attr('src', 'https://forms.typeform.io/to/N8SfkWWXZG');
      $('#form').focus();
    }, 0);
    /////////////////////////////////////////////////////////////////////////////
    // This is what you care about, the message event. It comes from the embedded
    // typeform and will have the originalEvent.data set to 'form-submit' if the
    // user submits the form.
    // If this event gets sent, we send the user to the third page and then change
    // the little debug event-status thing we have in the top-left
    $(window).on('message', function(ev) {
      if(ev.originalEvent.data === 'form-submit') {
        goToPage('three');
        formEventHaveBeenSubmitted();
      }
    });
  },
  "page_three": function() {
    fadeInStepsInPage('three', ['one', 'two', 'three', 'four']);
  },
}


/////////////////////
// Application start
/////////////////////
$(document).ready(function() {
  goToPage(first_page);
});


/////////////////////
// Helper functions
/////////////////////

// Hides all the pages
function hideAllPages() {
  Object.keys(pages).forEach(function(page) {
    $('#' + page).hide();
  });
}

// Hides all the pages, show the one declared in page_name and then executes the
// page function
function goToPage(page_name) {
  hideAllPages();
  $page = $('#page_' + page_name);
  $page.show();
  pages['page_' + page_name].bind($page)();
}

// Function to switch the status of the debug event-status
function formEventHaveBeenSubmitted() {
  $('.event_not_yet').hide();
  $('.event_submitted').fadeIn();
}

// Function to animate the steps like a flashy intro
function fadeInStepsInPage(page, steps) {
  if(steps.length > 0) {
    $('#page_' + page + ' .step_' + steps[0]).fadeIn(1000, function() {
      fadeInStepsInPage(page, steps.slice(1));
    });
  }
}
