var ACELab = function() {
  acejs = {}
  acejs.allowedInputFields = 'input, select, textarea';
  acejs.validationFields = {};

  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }
  
  String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.split(search).join(replacement);
  };  

  acejs.getFieldName = function($fieldSet) {
    var fieldName = $fieldSet.find(acejs.allowedInputFields).attr('name');
    var keyFieldName = fieldName.substring(6);
    return keyFieldName.substring(0, keyFieldName.indexOf(']'));
  }  

  acejs.validateMobilePhone= function(input){
    var isValid = false;
    if(typeof(inputname)!==undefined){
        var inputname       = input.attr("name");
        var identityname    = "";

        // if(inputname.indexOf("Mobile_Number")!=-1){
        //     identityname = "Mobile_Number"
        // }
        // else if(inputname.indexOf("Home_Number")!=-1){
        //     identityname = "Home_Number"
        // }
    
        var keyFieldName = inputname.substring(6);
        identityname = keyFieldName.substring(0, keyFieldName.indexOf(']'));

        var country = $(document).find('input[name$="['+identityname+'][country]"]').val();
        var phoneNum =  $(document).find('input[name$="['+identityname+'][no]"]').val();
        var elname = input.attr("name").replaceAll("[","_").replaceAll("]","_");
        var inputname = input.attr("name");
        var validationfail = function(identityname){
            //alert("Please enter a valid phone number!");
            if($(document).find("#error-invalid-"+identityname).length==0){
                $('input[name$="['+identityname+'][no]"]').after("<span id='error-invalid-"+identityname+"' class='custom-validation-error' style='color:red'>Please enter a valid phone number!</span>");
            }
            if($("#fakeBtn").length==0){
                console.log("showing button at validating mobile phone 1");
                console.log($(".btn-save").length)
                // $(".btn-save").after("<a class='btn' id='fakeBtn' style='float:right;'>SUBMIT</a>").hide();
            }
            else{
                // console.log("showing button at validating mobile phone 2");
                // $("#fakeBtn").show();
                // $(".btn-save").hide();
            }
        }
        
        var removeValidation = function(identityname){
            $(document).find("#error-invalid-"+identityname).remove(); 
            // console.log("errors remaining");
            // console.log($(".custom-validation-error").length);
            if($(".custom-validation-error").length==0){
                // $(".btn-save").show();
                // console.log("hiding button at validating mobile phone")
                // $("#fakeBtn").hide();
            }
        }
  
        if (country == "65"){
            if ( !((phoneNum.startsWith("6")) ||
                (phoneNum.startsWith("8")) ||
                (phoneNum.startsWith("9"))) || phoneNum.length != 8
            ){
                validationfail(identityname);
                isValid = false;
            } else {
                removeValidation(identityname); 
                isValid = true;
            }
        }
        else{
            removeValidation(identityname);
            isValid = true;
        }
    }
    return isValid;
  } // End of Validate Mobile Phone

  acejs.validatePostalCode = function(input){
    var isValid = false;
    if(typeof(input)!==undefined){
        var postalCode = input.val();
        var isnum = /^\d+$/.test(postalCode.trim());
    
        var validationfailpostalcode = function(scope){
            //alert("Please enter a valid phone number!");
            if($("#error-invalid-postalcode").length==0){
                $('input[name$="[PostalCode]"]').after("<span id='error-invalid-postalcode' class='custom-validation-error' style='color:red'>Please enter a valid postal code with just the 6 numbers.</span>");
            }
           if($("#fakeBtn").length==0){
                //  $(".btn-save").after("<a class='btn' id='fakeBtn' style='float:right;'>SUBMIT</a>").hide();
            }
            else{
                $("#fakeBtn").show();
                $(".btn-save").hide();
            }
        }
        
        var removeValidationpostalcode = function(){
            $("#error-invalid-postalcode").remove(); 
            // console.log("errors remaining");
            // console.log($(".custom-validation-error").length);
            if($(".custom-validation-error").length==0){
    
                // console.log("showing button at postal");
              //  $(".btn-save").show();
              //  $("#fakeBtn").hide();
            }
        }
        
        if (postalCode.length!=6 || !isnum){
            validationfailpostalcode(this);
            isValid = false;
        }
        else{
            // console.log("it didn't fail");
            removeValidationpostalcode();
            isValid = true;
        }
    }
    return isValid;
  } //End of Validate Postal Code  

  acejs.validateNRIC = function(str) {
    if (str.length != 9)
        return false;
  
    str = str.toUpperCase();
  
    var i,
        icArray = [];
    for (i = 0; i < 9; i++) {
        icArray[i] = str.charAt(i);
    }
  
    icArray[1] = parseInt(icArray[1], 10) * 2;
    icArray[2] = parseInt(icArray[2], 10) * 7;
    icArray[3] = parseInt(icArray[3], 10) * 6;
    icArray[4] = parseInt(icArray[4], 10) * 5;
    icArray[5] = parseInt(icArray[5], 10) * 4;
    icArray[6] = parseInt(icArray[6], 10) * 3;
    icArray[7] = parseInt(icArray[7], 10) * 2;
  
    var weight = 0;
    for (i = 1; i < 8; i++) {
        weight += icArray[i];
    }
  
    var offset = (icArray[0] == "T" || icArray[0] == "G") ? 4 : 0;
    var temp = (offset + weight) % 11;
  
    var st = ["J", "Z", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
    var fg = ["X", "W", "U", "T", "R", "Q", "P", "N", "M", "L", "K"];
  
    var theAlpha;
    if (icArray[0] == "S" || icArray[0] == "T") { theAlpha = st[temp]; } else if (icArray[0] == "F" || icArray[0] == "G") { theAlpha = fg[temp]; }
  
    return (icArray[8] === theAlpha);
  } //end of validateNRIC
  
  acejs.validateCompulsory = function() {
    //get all fields with compulsory tag that is vissible
    var $compulsoryFields = $('.compulsory:visible');
    var returnFlag = true;
    for (var x = 0; x <= $compulsoryFields.length - 1; x++) {
      var $field = $($compulsoryFields[x]).closest('div.control-group').find(acejs.allowedInputFields);
      var fieldValue = $field.val();
      if ($field.prop('type') == 'radio' && !$field.is(':checked')) {
          fieldValue = null;
      }
      var fieldName = acejs.getFieldName($($compulsoryFields[x]).parent());
  
      $($compulsoryFields[x]).closest('div.control-group').removeClass('error');
      $($compulsoryFields[x]).closest('div.control-group').find('span.help-block').remove();
  
      if (fieldValue == '' || fieldValue == null) {
          $field.closest('div.control-group').addClass('error');
          returnFlag = false;
      }
  
      if (fieldName.match(/NRIC/g) !== null && !acejs.validateNRIC(fieldValue)) {
          $field.closest('div.control-group').addClass('error');
          $field.closest('div.control-group').closest('div.control-group').append('<span class="help-block">NRIC/FIN Number needs Singapore NRIC format.</span>');
          returnFlag = false;
      }
    }

    $(".btn-save").hide();
    if (returnFlag) {
      // all filled in
      $(".btn-save").show();
      $("#fakeBtn").hide();
      //$(".btn-save").trigger('click');      
    } else {
      if($("#fakeBtn").length==0){
        $(".btn-save").after("<a class='btn' id='fakeBtn' style='float:right;'>SUBMIT</a>").show();
        $('#fakeBtn').before('<style type="text/css">@media (max-width: 720px){ #fakeBtn { width: 96% !important}}</style>');
        // $("#fakeBtn").on('click', function(){ acejs.validateCompulsory(); });
      }
      else{
        $("#fakeBtn").show();
        $(".btn-save").hide();
      }
    }
    console.log('CompulsoryValidation: ' + returnFlag);
    return returnFlag;
  } // end of checkCompulsory  

  acejs.validateNA = function(input) {
    if (typeof(input) !== undefined) {
      var value = input.val().toLowerCase();
      var valid = false;
      var blockedValues = ['.','n.a', 'n.a.', '-', '0', 'nil', 'none', 'null', 'na'];
      if (blockedValues.indexOf(value) !== -1) {
        // found error
        input.closest('div.control-group').addClass('error');
      } else {
        input.closest('div.control-group').removeClass('error');
        valid = true;
      }
      // console.log('validing: ' + input.attr('name') + ' ' + valid);
      // acejs.blockForm(valid);
      return valid;
    }
  }

  acejs.blockForm = function(valid) {
    if (valid) {
      $("#fakeBtn").hide();
      $(".btn-save").show();
    } else {
      if($("#fakeBtn").length==0){
        $(".btn-save").after("<a class='btn' id='fakeBtn' style='float:right;'>SUBMIT</a>").hide();
      }
      else{
        $("#fakeBtn").show();
        $(".btn-save").hide();
      }
    }
  }
  
  // makeFieldCompulsory - make a field compulsory by just adding a compulsory class in the label
  acejs.makeFieldCompulsory = function ( arrField ) {
    if (arrField.length > 0) { 
      for (x=0; x<=arrField.length-1; x++) {
        $('div[id$="'+arrField[x]+'"]').closest('div.control-group').find('label').addClass('compulsory');
      }
    }
  } // end of makeFieldCompulsory  
  
  return acejs;
} // end of ACELab

//-------------------------------------------- END OF FUNCTIONS
