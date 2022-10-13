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

let form = document.getElementById('image-upload-form'),
    file = document.querySelector('#file'),
    results = document.getElementById('results');

$.ajax({
  url: "https://b64-room-scene.foxyai.com/foxy/room_scene_classification",
  type: "GET",
  success: function (result) {
    console.log(result);
  },
  error: function (error) {
    console.log(error);
  }

});

function validate(base_img) {
  console.log('validate method');


  return true;
}

function get_results(base_img, promptName, str) {
  console.log("get_results");
  var data = JSON.stringify({
    "strength": str,
    "prompt": prompts[promptName],
    "base64_str": base_img
  });

  var config = {
    method: 'post',
    url: 'https://spookify-model.foxyai.com/foxy/spookify',
     headers: { 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    data : data
  };

  const response = axios(config);
  console.log(response);
  const formedImgData = response.data.result;

  return formedImgData;
}

function generate_images (event) {
  let str = event.target.result;

  if (validate(str)) {
    for (var i = 0; i < 4; i++) {
      results.append(get_results(str, prompts[i], strs[i]));
    }
  }
}

function handleSubmit (event) {
  console.log("handleSubmit");
  event.preventDefault();

  let reader = new FileReader();
  reader.onload = generate_images;
  reader.readAsDataURL(file);

}

form.addEventListener('submit', handleSubmit);