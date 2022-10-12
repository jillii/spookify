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

function handleSubmit (event) {
  console.log("handleSubmit");
  event.preventDefault();

  let reader = new FileReader();
  reader.onload = generate_images;
  reader.readAsDataURL(file);

}

async function get_results(base_img, promptName, str) {
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

  const response = await axios(config);
  console.log(response);
  const formedImgData = response.data.result;

  return formedImgData;
}

function generate_images (event) {
  let str = event.target.result;

  for (var i = 0; i < 4; i++) {
    console.log('youre in the loop');
    results.append(get_results(str, prompts[i], strs[i]));
  }
}

form.addEventListener('submit', handleSubmit);