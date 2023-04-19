var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
document.querySelector(".custom-steps-wrapper").setAttribute("data-step", n+1);
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) {
    return false;
  }
  // Hide the current tab:
  if(n == 1){
    
    currentTab = currentTab + n;
  
    if (currentTab >= x.length) {
          Swal.fire({
              title: 'Are you sure?',
              text: 'Do you want to submit the form',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes'
          }).then((result) => {
              if (result.isConfirmed) {
                jQuery('#form').hide();
                jQuery( ".loader" ).show();
                form_submit()
                return false;
                // Otherwise, display the correct tab:
                showTab(currentTab);
              }
          });
    }
    else{
      x[currentTab-1].style.display = "none";
    }
  }
  else{
      x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
  }
  // Increase or decrease the current tab by 1:
  // if you have reached the end of the form...
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  input = x[currentTab].getElementsByTagName("input");
  select = x[currentTab].getElementsByTagName("select");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < input.length; i++) {
    // If a field is empty...
    
    if (input[i].hasAttribute('required')) {
      if (input[i].value == "") {
        // add an "invalid" class to the field:
        input[i].className += " invalid";
        // and set the current valid status to false
        valid = false;
      } 
    }
  }
    for (i = 0; i < select.length; i++) {
      // If a field is empty...
      
      if (select[i].hasAttribute('required')) {
        if (select[i].value == "") {
          // add an "invalid" class to the field:
          select[i].className += " invalid";
          // and set the current valid status to false
          valid = false;
        } 
      }    
    }

  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("tab")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}


function form_submit(){

  var field_settings = [];
  jQuery( "input[name=davi_input_text]" ).each(function( index ) {
    label = $(this).prev().text();
    var davi_input_text = {};
    davi_input_text['label'] = label;
    davi_input_text['type'] = 'text';
    davi_input_text['value'] = $( this ).val();
    field_settings.push(davi_input_text);

  });
  jQuery( "input[name=davi_input_hidden]" ).each(function( index ) {
    label = $(this).prev().text();
    var davi_input_hidden = {};
    davi_input_hidden['label'] = label;
    davi_input_hidden['type'] = 'hidden';
    davi_input_hidden['value'] = $( this ).val();
    field_settings.push(davi_input_hidden);

  });
  jQuery( "input[name=davi_input_email]" ).each(function( index ) {
    label = $(this).prev().text();
    var davi_input_email = {};
    davi_input_email['label'] = label;
    davi_input_email['type'] = 'text';
    davi_input_email['value'] = $( this ).val();
    field_settings.push(davi_input_email);
  });
  jQuery( "input[name=davi_input_date]" ).each(function( index ) {
    label = $(this).prev().text();
    var davi_input_date = {};
    davi_input_date['label'] = label;
    davi_input_date['type'] = 'text';
    davi_input_date['value'] = $( this ).val();
    field_settings.push(davi_input_date);
  });
  jQuery( "input[name=davi_input_phone]" ).each(function( index ) {
    label = $(this).parent().parent().prev().text();
    var davi_input_phone = {};
    davi_input_phone['label'] = label;
    davi_input_phone['type'] = 'phone';
    davi_input_phone['value'] = $( this ).val();
    field_settings.push(davi_input_phone);
  });
  jQuery( "select[name=davi_products]" ).each(function( index ) {
    label = $(this).parent().prev().text();
    var davi_products = {};
    davi_products['label'] = label;
    davi_products['type'] = 'select';
    davi_products['value'] = $( this ).val();
    field_settings.push(davi_products);
  });
  jQuery( "select[name=davi_dropdown]" ).each(function( index ) {
    label = $(this).parent().prev().text();
    var davi_dropdown = {};
    davi_dropdown['label'] = label;
    davi_dropdown['type'] = 'select';
    davi_dropdown['value'] = $( this ).val();
    field_settings.push(davi_dropdown);
  });
  jQuery( "select[name=davi_multiple_dropdown]" ).each(function( index ) {
    davi_multiple_dropdown = {};
    label = $(this).parent().prev().text();
    var davi_multiple_dropdown = {};
    davi_multiple_dropdown['label'] = label;
    davi_multiple_dropdown['type'] = 'select';
    davi_multiple_dropdown['value'] = $( this ).val();
    field_settings.push(davi_multiple_dropdown);
  });
  jQuery( "select[name=davi_dropdown_file]" ).each(function( index ) {
    label = $(this).parent().prev().text();
    var davi_dropdown_file = {};
    davi_dropdown_file['label'] = label;
    davi_dropdown_file['type'] = 'select';
    davi_dropdown_file['value'] = $( this ).val();
    field_settings.push(davi_dropdown_file);
  });
  jQuery( "select[name=davi_multiple_dropdown_file]" ).each(function( index ) {
    davi_multiple_dropdown_file = {};
    label = $(this).parent().prev().text();
    var davi_multiple_dropdown_file = {};
    davi_multiple_dropdown_file['label'] = label;
    davi_multiple_dropdown_file['type'] = 'select';
    davi_multiple_dropdown_file['value'] = $( this ).val();
    field_settings.push(davi_multiple_dropdown_file);
  });
  var davi_input_address = {};
  jQuery( "input[name=davi_input_address]" ).each(function( index ) {davi_input_address = {};
    label = $(this).prev().text();
    davi_input_address['label'] = label;
    davi_input_address['type'] = 'text';
    davi_input_address['value'] = $( this ).val();
  });
  jQuery( "input[name=davi_input_appartment_no]" ).each(function( index ) { davi_input_appartment_no = {};
      davi_input_address['value'] += $( this ).val();
  });
  jQuery( "input[name=davi_input_zip_code]" ).each(function( index ) {  davi_input_zip_code = {};
      davi_input_address['value'] += $( this ).val();
  });
  jQuery( "input[name=davi_input_state]" ).each(function( index ) { davi_input_state = {};
      davi_input_address['value'] += $( this ).val();
  });
  field_settings.push(davi_input_address);
  var shop = $('#shop').val();
  var data = {
    shop: shop,
  };
  fetch("/apps/sdta/get_settings", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
          "Content-Type": "application/json",
      },
  })
  .then(function (response) {
      return response.json();
  })
  .then(function (settings) {
    var formData = new FormData();

    // for pdf start
    var davi_input_pdf = {};
    jQuery( "input[name=davi_input_pdf]" ).each(function( index ) {
      label = $(this).parent().prev().text();
    })
    davi_input_pdf['label'] = label;
    davi_input_pdf['type'] = 'pdf';
    const pdf = $('input[name="davi_input_pdf"]').prop('files')[0];
    formData.append('pdf', pdf);
    // for pdf end
    // for file start
    var davi_input_file = {};
    jQuery( "input[name=davi_input_file]" ).each(function( index ) {
      label = $(this).parent().prev().text();
    })
    davi_input_file['label'] = label;
    davi_input_file['type'] = 'file';
    const file = $('input[name="davi_input_file"]').prop('files')[0];
    formData.append('file', file);
    // for file end
    // for files start
    var davi_input_files = {};
    jQuery( "input[name=davi_input_files]" ).each(function( index ) {
      label = $(this).parent().prev().text();
    })
    var totalfiles = $('input[name="davi_input_files[]"]').prop('files').length;
    for (var index = 0; index < totalfiles; index++) {
      formData.append("files[]", $('input[name="davi_input_files[]"]').prop('files')[index]);
    }
    davi_input_files['label'] = label;
    davi_input_files['type'] = 'files';
    // const files = $('input[name="davi_input_files"]').prop('files');
    // formData.append('files', files);
    // for files end

    formData.append('shop', shop);
    console.log(formData);
    fetch('/apps/sdta/save_file', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);  

    if(data.pdf){
      davi_input_pdf['value'] = data.pdf;
      field_settings.push(davi_input_pdf);
    }

    if(data.file){
      davi_input_file['value'] = data.file;
      field_settings.push(davi_input_file);
    }

    if(data.files){
      davi_input_files['value'] = data.files;
      field_settings.push(davi_input_files);
    }
        var form_type = $( 'input[name=davi_form_type]' ).val();
        var shop = $('#shop').val();
        var data = {
          shop: shop,
          form_type: form_type,
          field_settings: field_settings,
        };
        fetch("/apps/sdta/save_form", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (settings) {
          window.location = 'https://'+window.location.host+'/pages/quotes';
        });
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  });       
};