// click/touch on custom tool/button
function myTnTool (action, item) {
  const idAndRating = item.$elt.find('.nGY2GThumbnailDescription').text().split('|')
  switch (action) {
    case 'custom1':
      // Send +1 rating. Rating per user needs to be implemented
      sendMediaRating(idAndRating[0], 1)
      item.$elt.find('.nGY2GThumbnailDescription').text(idAndRating[0] + '|' + (parseInt(idAndRating[1]) + 1))
      TnSetFavorite(item, parseInt(idAndRating[1]) + 1)
      break
  }
}

// Add custom elements after one thumbnail is build
function myTnInit ($e, item) {
  const idAndRating = item.$elt.find('.nGY2GThumbnailDescription').text().split('|')
  TnSetFavorite(item, idAndRating[1])
}

// Set the favorite status
function TnSetFavorite (item, rating) {
  item.$elt.find('[data-ngy2action="custom1"] i').text('♥️ ' + rating)
}

async function sendMediaRating (id, rating) {
  window.fetch('/rateMediaById', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, rating: rating })
  })
    .then(function (response) {
      console.log(response)
      if (response.ok) {
        console.log('Click was recorded')
        return
      }
      throw new Error('Request failed.')
    })
    .catch(function (error) {
      console.log(error)
    })
}
