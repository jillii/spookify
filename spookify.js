
function base64_encode(file) {
   try {
    const res = file.toString('base64');
    return res
   } catch(error) {
    console.error(error);
    return;
   }
}

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

const input = document.getElementById('upload-file'),
      form  = document.getElementById('image-upload-form');

const upload = (file) => {
   var data = JSON.stringify({
    "strength": strs[0],
    "prompt": prompts[0],
    "base64_str": base64_encode(file)
  });

  fetch('https://spookify-model.foxyai.com/foxy/spookify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }).then(
    response => response.json()
  ).then(
    success => console.log(success)
  ).catch(
    error => console.log(error)
  );
};


const onSelectFile = () => upload(input.files[0]);

form.addEventListener('submit', onSelectFile, false);
