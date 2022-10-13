function dropHandler(ev) {
  console.log('File(s) dropped');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    [...ev.dataTransfer.items].forEach((item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === 'file') {
        const file = item.getAsFile();
        console.log(`… file[${i}].name = ${file.name}`);

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
  if (input.kind === 'file' || (input.files && input.files[0])) {
    if (input.kind === 'file') {
      file = input.getAsFile();
    }
    if (input.files && input.files[0]) {
      file = input.files[0];
    }

    var reader = new FileReader();

    reader.onload = function (e) {
      $('#image-display').removeClass('hidden').attr('src', e.target.result).width(150).height(200);
      $('.image-uploader-btn').removeAttr('disabled');
    };

    reader.readAsDataURL(file);
  }
}

