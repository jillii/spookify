const container = $('.drop-zone-container'),
      display   = $('#image-display'),
      button    = $('.image-uploader-btn');

function dropHandler(ev) {
  console.log('File(s) dropped');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    [...ev.dataTransfer.items].forEach((item, i) => {
      // If dropped items aren't files, reject them

      if (item.kind === 'file') {
        readURL(item);
      }
    });
  } else {
    // Use DataTransfer interface to access the file(s)
    [...ev.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`);
    });
  }
}

function dragOverHandler(ev) {
  console.log('File(s) in drop zone');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

// Show uploaded image
function readURL(input) {
  console.log('hi this happened');
  if (input.kind === 'file' || (input.files && input.files[0])) {
    if (input.kind === 'file') {
      file = input.getAsFile();
    }
    if (input.files && input.files[0]) {
      file = input.files[0];
    }

    var reader = new FileReader();

    reader.onload = function (e) {
      container.addClass('ready');
      display.removeClass('hidden').attr('src', e.target.result);
      button.removeAttr('disabled');
    };

    reader.readAsDataURL(file);
  }
}

function removeFile(e) {
  e.preventDefault();

  $('#file').val(null);
  container.removeClass('ready');
  display.addClass('hidden').attr('src', '');
  button.attr('disabled', true);
}