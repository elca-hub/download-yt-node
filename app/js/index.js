document.getElementById('downloadButton').addEventListener('click', function() {
  const youtubeId = document.getElementById('inputYoutubeId').value
  fetch(`http://localhost:3000/download?youtubeId=${youtubeId}`, { mode: 'cors' })
   .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${youtubeId}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }
  )
})