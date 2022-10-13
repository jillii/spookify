const prompts = {
  'Lightly spooked...': "a detailed fantasy matte painting of a spooky house by Jordan Grimmer, a real hellish shadowy scene from a film still of nightmare before christmas by Tim Burton, behance contest winner, vanitas, octane render, cinematic lighting, orange, pumpkin, bats",
  'Spookier...': 'a detailed fantasy matte painting of a spooky house by Jordan Grimmer, a real hellish shadowy scene from a film still of nightmare before christmas by Tim Burton, behance contest winner, vanitas, octane render, cinematic lighting, orange, ghoul, goblin',
  'Spooky...': 'a detailed fantasy matte painting of a spooky house by Jordan Grimmer, a real hellish shadowy scene from a film still of nightmare before christmas by Tim Burton, behance contest winner, vanitas, octane render, cinematic lighting, orange, spiders, witches',
  'Totally Spookified..': 'a Tim Burton spooky old beat down house with ghosts in the windows and pumpkins in the yard'
}

const strs = [
  '0.60',
  '0.70',
  '0.77',
  '0.85'
]

let form    = document.getElementById('image-upload-form'),
    file    = document.querySelector('#file'),
    results_container = $('#results'),
    results = results_container.find('.result-card'),
    valid   = ["front_of_house", "rear_of_house", "side_of_house", "street_scene"],
    btn     = $('.image-uploader-btn');

async function validate(base_img) {
  // var data = JSON.stringify({
  //   "base64": base_img
  // });

  // var config = {
  //   method: 'post',
  //   url: 'https://b64-room-scene.foxyai.com/foxy/room_scene_classification',
  //    headers: { 
  //     'Content-Type': 'application/json',
  //     'matt-test': 'MATT-TEST'
  //   },
  //   data : data
  // };

  // const response = await axios(config);
  // console.log(response);
  // const formedImgData = response.data.result;

  // for (var i = 1; i < formedImgData.length; i += 2) {
  //   if (parseFloat(formedImgData[i]) > 0.65) {
  //     if (valid.includes(formedImgData[i - 1])) {
  //       return true;
  //     }
  //   }
  // }

  // return false;

  return true;
}

const get_results = async (base_img, promptName, str) => {
  console.log("get_results");
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

async function generate_images (event) {
  let str = event.target.result.split('data:image/png;base64,')[1];
  var img = '';

  if (validate(str)) {
    for (var i = 0; i < 4; i++) {
      src = await get_results(str, prompts[i], strs[i]);
      results.find('img').eq(i).attr('src', ' data:image/jpg;base64,' + src);
    }
  }

  await btn.removeClass('working').removeAttr('disabled');
  await results_container.removeClass('hidden');
}

function handleSubmit (event) {
  event.preventDefault();

  btn.addClass('working').attr('disabled', true);
  results_container.addClass('hidden');

  let reader = new FileReader();
  reader.onload = generate_images;
  reader.readAsDataURL(file);
}

form.addEventListener('submit', handleSubmit);
document.getElementById('retry').addEventListener('click', handleSubmit);