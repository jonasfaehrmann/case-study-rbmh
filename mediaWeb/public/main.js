// click/touch on custom tool/button
function myTnTool (action, item) {
  switch (action) {
    case 'custom1':
      // switch favorite status
      item.customData.favorite = !item.customData.favorite
      sendMediaRating(item.$elt.find('.nGY2GThumbnailDescription').text(), item.customData.favorite)
      TnSetFavorite(item)
      break
  }
}

// Add custom elements after one thumbnail is build
function myTnInit ($e, item, GOMidx) {
  console.log(item.$elt.find('[data-ngy2action="custom1"]').css('color'))
  TnSetFavorite(item)
}

// Set the favorite status
function TnSetFavorite (item) {
  let c = '#fff'
  if (item.customData.favorite) {
    c = '#e84855'
  }
  item.$elt.find('[data-ngy2action="custom1"]').css('color', c)
}

async function sendMediaRating (id, vote) {
  window.fetch('/rateMediaById', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id, rating: vote })
  })
    .then(function (response) {
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
