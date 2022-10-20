const prompts = {
  'Lightly spooked...': "a Tim Burton spooky old beat down house with ghosts in the windows and pumpkins in the yard",
  'Spookier...': 'a detailed fantasy matte painting of a spooky house by Jordan Grimmer, a real hellish shadowy scene from a film still of nightmare before christmas by Tim Burton, behance contest winner, vanitas, octane render, cinematic lighting, orange, ghoul, goblin',
  'Spooky...': 'a detailed fantasy matte painting of a spooky house by Jordan Grimmer, a real hellish shadowy scene from a film still of nightmare before christmas by Tim Burton, behance contest winner, vanitas, octane render, cinematic lighting, orange, spiders, witches',
  'Totally Spookified..': 'a Tim Burton spooky old beat down house with ghosts in the windows and pumpkins in the yard'
}

const strs = [
  '0.60',
  '0.70',
  '0.80',
  '0.85'
]

let form    = document.getElementById('image-upload-form'),
    file    = document.querySelector('#file'),
    results_container = $('#results'),
    results = results_container.find('.result-card'),
    valid   = ["front_of_house", "rear_of_house", "side_of_house", "street_scene"],
    btn     = $('.image-uploader-btn'),
    error   = $('.size-error'),
    house_error = $('.house-error');

async function validate(event) {
  let base64 = event.target.result,
      str    = '';

  if (base64.indexOf("data:image/png;base64,") != -1) {
    str = base64.split('data:image/png;base64,')[1];
  } else {
    str = base64.split('data:image/jpeg;base64,')[1];
  }
  
  var data = JSON.stringify({
    "base64": str
  });
  var config = {
    method: 'post',
    url: 'https://msomg243rj.execute-api.us-east-1.amazonaws.com/prod/foxy/room_scene_classification',
     headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  var is_house = false;

  axios(config)
  .then(function (response) {
    console.log(response);
    const formedImgData = response.data.result;

    for (var i = 1; i < formedImgData.length; i += 2) {
      console.log(formedImgData[i - 1]);
      console.log(formedImgData[i]);
      if (parseFloat(formedImgData[i]) > 0.65) {
        if (valid.includes(formedImgData[i - 1])) {
          is_house = true;
          generate_images(str);
        }
      }
    }
    if (!is_house) {
      house_error.removeClass('hidden');
      btn.removeClass('working');
    }
  })
  .catch(function (error) {
    console.log(error);
  });

}

const get_results = async (base_img, promptName, str) => {
  var data = JSON.stringify({
    "strength": str,
    "prompt": prompts[promptName],
    "base64_str": base_img
  });

  var config = {
    method: 'post',
    url: 'https://msomg243rj.execute-api.us-east-1.amazonaws.com/prod/foxy/spookify ',
     headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
 
  try {
      const response = await axios(config);
      return response.data.result;
  } catch (err) {
      console.log(err);
  }
}

async function generate_images (str) {
  var src = '',
      src2 = '',
      rand = Math.floor((Math.random() * 3) + 1);

  console.log(rand);

  src = await get_results(str, prompts[0], strs[0]);
  results.find('img').eq(0).attr('src', ' data:image/jpg;base64,' + src);

  src2 = await get_results(str, prompts[rand], strs[rand]);
  results.find('img').eq(1).attr('src', ' data:image/jpg;base64,' + src2);
  
  results_container.removeClass('hidden');
  btn.removeClass('working');
}

function size_check() {
  var fsize = Math.round((file.size / 1024));
  if (fsize >= 5120) {     //5MB
    return false;
  }
  return true;
}

function handleSubmit (event) {
  event.preventDefault();

  if (!size_check()) {
    error.removeClass('hidden');
  } else {
    btn.addClass('working').attr('disabled', true);
    results_container.addClass('hidden');

    let reader = new FileReader();
    reader.onload = validate;
    reader.readAsDataURL(file);
  }
}

form.addEventListener('submit', handleSubmit);
document.getElementById('retry').addEventListener('click', handleSubmit);