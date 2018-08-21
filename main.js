$(document).ready( function() {
  //Variables

  // Value hash
  var values = {
    monthly: '$10 /mo',
    quarterly: '$9 /mo',
    yearly: '$7 /mo'
  }

  var $plan = $('#plan')
  var $price = $('#price')
  var $empty = $('#empty')
  var $inCart = $('#in_cart')

  //Functions
  function updateTotal() {
    var total = 0
    var $entries = $('.entry')

    if ($entries.length)
      $empty.show()
    else
      $empty.hide()

    $entries.each( function(index, entry) {
      var data = $(entry).data()
      var price = parseFloat(data.price)
      var installment = data.plan

      switch(installment) {
        case 'monthly':
          total += price
          break
        case 'quarterly':
          total += price * 3
          break
        case 'yearly':
          total += price * 12
      }
    })

    $('#total').text('$' + total)
  }


  //Listeners
  //
  
  $('#purchase').on('click', function() {
    $('#complete')
      .html("<h2>PURCHASE COMPLETE<h2>")
      .css({
        'background-color': '#bca',
        'width': '25%',
        'border': 'solid 1px green',
        'text-align': 'center'
      })
      .animate({
        width: '70%',
        opacity: 0.4,
        marginLeft: '0.6in',
        fontSize: '3em',
        borderWidth: '10px'
      }, 1500)
  })

  $('#display_cart').on('click', function() {
    var cart = $('#cart')
    var button = $(this)

    button.text() === 'Hide Cart' ? button.text('Show Cart') : button.text('Hide Cart')
    cart.slideToggle(3000)
  })

  //Find the plan select
  //Listen for a change
  $plan.on('change', function() {
    // set text to values['monthly']
    $price.text(values[this.value])
  })

  $empty.on('click', function() {
    $inCart.empty()
    updateTotal()
  })

  // find add button
  // listen for a click
  $('#add').on('click', function() {
    var installment = $plan.val()
    // figure out the price
    var price = $price.text()
    // add an entry to cart

    var numeric = price.replace(/[A-Za-z$\/\s]/g, '')
    var data = 'data-price="' + numeric + '" data-plan="' + installment + '"'
    var li = '<li class="entry" ' + data + '>' + installment + ' - ' + price + '<button class="remove">X</button></li>'

    $inCart.append(li)
    updateTotal()
  })

  $(document).on('click', '.remove', function() {
    $(this).parent('.entry').remove()
    updateTotal()
  })

})
