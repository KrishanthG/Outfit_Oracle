document.addEventListener('DOMContentLoaded', () => {
    const clothingForm = document.getElementById('clothing-form');
    const wardrobeItems = document.getElementById('wardrobe-items');
    const outfits = document.getElementById('outfits');
  
    const wardrobe = JSON.parse(localStorage.getItem('wardrobe')) || [];
  



    
    clothingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const itemName = document.getElementById('item-name').value;
      const category = document.getElementById('category').value;
      const imageUrl = document.getElementById('image-url').value;
  
      const item = { name: itemName, category, imageUrl };
      wardrobe.push(item);
      localStorage.setItem('wardrobe', JSON.stringify(wardrobe));
      displayWardrobe();
      clothingForm.reset();
    });
  
    function displayWardrobe() {
      wardrobeItems.innerHTML = '';
      wardrobe.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('wardrobe-item');
        div.innerHTML = `
          <img src="${item.imageUrl}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.category}</p>
          <button onclick="removeItem(${index})">Remove</button>
        `;
        wardrobeItems.appendChild(div);
      });
    }
  
    window.removeItem = function(index) {
      wardrobe.splice(index, 1);
      localStorage.setItem('wardrobe', JSON.stringify(wardrobe));
      displayWardrobe();
    };
  
    displayWardrobe();
    fetchWeather();
  
    async function fetchWeather() {
      const apiKey = '2c13be436a963bf6e10777a5060e0567';
      const city = 'Chennai';
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      suggestOutfit(data.main.temp);
    }
  
    function suggestOutfit(temp) {
      const tops = wardrobe.filter(item => item.category === 'top');
      const bottoms = wardrobe.filter(item => item.category === 'bottom');
      const accessories = wardrobe.filter(item => item.category === 'accessory');
      const footwear = wardrobe.filter(item => item.category === 'footwear');
  
      outfits.innerHTML = '';
  
      // Create an outfit suggestion
      if (tops.length > 0 && bottoms.length > 0 && accessories.length > 0 && footwear.length > 0) {
        const randomTop = tops[Math.floor(Math.random() * tops.length)];
        const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
        const randomAccessory = accessories[Math.floor(Math.random() * accessories.length)];
        const randomFootwear = footwear[Math.floor(Math.random() * footwear.length)];
  
        const outfit = [randomTop, randomBottom, randomAccessory, randomFootwear];
        outfit.forEach(item => {
          const div = document.createElement('div');
          div.classList.add('outfit');
          div.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.category}</p>
          `;
          outfits.appendChild(div);
        });
      } else {
        outfits.innerHTML = '<p>Not enough items in your wardrobe to suggest a complete outfit.</p>';
      }
    }
  });
  