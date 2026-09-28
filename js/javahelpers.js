
  function initSubcategorySliders() {
    document.querySelectorAll('.subcategory-item').forEach(function(card) {
      var imgElem = card.querySelector('.subcategory-img');
      if (!imgElem) return;
      var productsData = imgElem.getAttribute('data-products');
      if (!productsData) return;
      
      var images = productsData.split(',').map(function(url) { return url.trim(); });
      var names = imgElem.getAttribute('data-names').split(',').map(function(txt){ return txt.trim(); });
      var descriptions = imgElem.getAttribute('data-descriptions').split(',').map(function(txt){ return txt.trim(); });
      var prices = imgElem.getAttribute('data-prices').split(',').map(function(price){ return price.trim(); });
      var index = 0;
      var detailsElem = card.querySelector('.product-details');
      
      if (images.length > 1) {
         setInterval(function() {
            index = (index + 1) % images.length;
            // Fade out
            imgElem.style.transition = "opacity 0.3s ease";
            imgElem.style.opacity = 0;
            // After fade-out, update src and details then fade in
            setTimeout(function(){
               imgElem.src = images[index];
               imgElem.style.opacity = 1;
               if (detailsElem) {
                 var heading = detailsElem.querySelector('.description-heading');
                 var desc = detailsElem.querySelector('.description');
                 var price = detailsElem.querySelector('.product-price');
                 if(heading) heading.textContent = names[index];
                 if(desc) desc.textContent = descriptions[index];
                 if(price) price.innerHTML = '<strong>Price:</strong> GHS ' + prices[index];
               }
            }, 300);
         }, 3000);
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", initSubcategorySliders);
 
    window.setWelcomePopupTimer = function (dotNetRef) {
        // Check if user has already dismissed the popup
        if (localStorage.getItem("welcomePopupDismissed") === "true") {
            console.log("🚫 Welcome popup already dismissed. Skipping.");
            return;
        }

        setTimeout(function () {
            console.log("⏱️ 60 seconds passed. Showing welcome popup...");
            dotNetRef.invokeMethodAsync('ShowWelcomePopup');
        }, 60000); // 60 seconds
    };

    window.markWelcomePopupDismissed = function () {
        localStorage.setItem("welcomePopupDismissed", "true");
        console.log("✅ Welcome popup dismissal saved.");
    };

  // Ensure global functions exist for opening/closing the Order popup
  // This will show the order popup, hide the product modal, and prevent background scrolling.
  window.openOrderPopup = function () {
    try {
      var order = document.getElementById('orderPopup');
      if (!order) {
        console.warn('openOrderPopup: #orderPopup not found');
        return;
      }

      // Hide product modal if visible
      var productModal = document.getElementById('productModal');
      if (productModal) {
        productModal.style.display = 'none';
      }

      order.style.display = 'block';
      order.setAttribute('aria-hidden', 'false');
      // Prevent background scroll while order modal is open
      document.body.style.overflow = 'hidden';
      // Focus first input for accessibility
      var firstInput = order.querySelector('select, input, textarea, button');
      if (firstInput) firstInput.focus();
    } catch (err) {
      console.error('openOrderPopup error', err);
    }
  };

  window.closeOrderPopup = function () {
    try {
      var order = document.getElementById('orderPopup');
      if (!order) return;

      order.style.display = 'none';
      order.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      // Restore product modal visibility if it exists (useful when closing order to go back)
      var productModal = document.getElementById('productModal');
      if (productModal) {
        productModal.style.display = 'block';
      }
    } catch (err) {
      console.error('closeOrderPopup error', err);
    }
    };
  