const products = [
  // --- DAIRY ---
  { id: 1, name: "Milk", price: 50, oldPrice: 56, discount: "-10%", category: "Dairy", alternative: "Almond Milk", aliases: ["milk", "doodh", "दूध"], pairs: [2, 11, 12] }, // pairs: Bread, Butter, Tea
  { id: 10, name: "Almond Milk", price: 120, category: "Dairy", alternative: "Milk", aliases: ["almond milk", "badam ka doodh", "बादाम दूध"], pairs: [2, 6] }, // Bread, Apples
  { id: 14, name: "Paneer", price: 80, category: "Dairy", alternative: "Tofu", aliases: ["paneer", "पनीर", "cheese"], pairs: [16, 9, 8] }, // Tomato, Onion, Potato
  { id: 11, name: "Butter", price: 55, category: "Dairy", alternative: "Margarine", aliases: ["butter", "makkhan", "मक्खन", "घी"], pairs: [1, 2, 12] }, // Milk, Bread, Tea
  { id: 18, name: "Cheese", price: 153, oldPrice: 180, discount: "-15%", category: "Dairy", alternative: "Vegan Cheese", aliases: ["cheese", "cheddar", "चीज़"], pairs: [2, 16] }, // Bread, Tomato
  { id: 19, name: "Yogurt", price: 40, category: "Dairy", alternative: "Greek Yogurt", aliases: ["yogurt", "dahi", "दही", "दहीं"], pairs: [6, 7, 15] }, // Apples, Bananas, Biscuit

  // --- BAKERY ---
  { id: 2, name: "Bread", price: 30, category: "Bakery", alternative: "Brown Bread", aliases: ["bread", "pav", "पाव", "ब्रेड", "roti"], pairs: [1, 11, 18] }, // Milk, Butter, Cheese
  { id: 20, name: "Brown Bread", price: 40, category: "Bakery", alternative: "Bread", aliases: ["brown bread", "whole wheat bread", "गेहूं की रोटी", "भूरी ब्रेड"], pairs: [1, 11, 8] }, // Milk, Butter, Potato
  { id: 15, name: "Biscuit", price: 20, category: "Bakery", alternative: "Cookies", aliases: ["biscuit", "biscuits", "बिस्किट", "नमकीन"], pairs: [1, 12, 24] }, // Milk, Tea, Coke
  { id: 17, name: "Croissant", price: 60, oldPrice: 75, discount: "-20%", category: "Bakery", isSeasonal: true, alternative: "Donut", aliases: ["croissant", "croissants", "क्रोसांट"], pairs: [1, 12, 25] }, // Milk, Tea, Juice

  // --- PRODUCE (Fruits/Veg) ---
  { id: 6, name: "Apples", price: 120, category: "Produce", alternative: "Pears", aliases: ["apple", "apples", "seb", "सेब"], pairs: [19, 7, 12] }, // Yogurt, Bananas, Tea
  { id: 7, name: "Bananas", price: 40, category: "Produce", alternative: "Plantains", aliases: ["banana", "bananas", "kela", "केला", "सेल"], pairs: [19, 1, 25] }, // Yogurt, Milk, Juice
  { id: 8, name: "Potato", price: 30, category: "Produce", alternative: "Sweet Potato", aliases: ["potato", "potatoes", "aloo", "आलू"], pairs: [9, 16, 23] }, // Onion, Tomato, Chicken
  { id: 9, name: "Onion", price: 50, category: "Produce", alternative: "Garlic", aliases: ["onion", "onions", "pyaz", "प्याज"], pairs: [8, 16, 23] }, // Potato, Tomato, Chicken
  { id: 16, name: "Tomato", price: 40, category: "Produce", alternative: "Bell Pepper", aliases: ["tomato", "tomatoes", "tamatar", "टमाटर"], pairs: [9, 8, 14] }, // Onion, Potato, Paneer

  // --- GRAINS & PANTRY ---
  { id: 4, name: "Rice", price: 80, category: "Grains", alternative: "Quinoa", aliases: ["rice", "chawal", "चावल"], pairs: [8, 23, 9] }, // Potato, Chicken, Onion
  { id: 21, name: "Quinoa", price: 150, category: "Grains", alternative: "Rice", aliases: ["quinoa", "क्विनोआ"], pairs: [1, 19, 6] }, // Milk, Yogurt, Apples
  { id: 22, name: "Oats", price: 62, oldPrice: 70, discount: "-12%", category: "Grains", alternative: "Muesli", aliases: ["oats", "oat", "जई"], pairs: [1, 7, 6] }, // Milk, Bananas, Apples
  { id: 5, name: "Sugar", price: 40, category: "Pantry", alternative: "Jaggery", aliases: ["sugar", "shakkar", "शक्कर"], pairs: [12, 13, 15] }, // Tea, Coffee, Biscuit
  { id: 12, name: "Tea", price: 90, category: "Pantry", alternative: "Green Tea", aliases: ["tea", "chai", "चाय"], pairs: [1, 2, 15] }, // Milk, Bread, Biscuit
  { id: 13, name: "Coffee", price: 150, category: "Pantry", alternative: "Instant Coffee", aliases: ["coffee", "kopi", "कॉफी"], pairs: [1, 2, 15] }, // Milk, Bread, Biscuit

  // --- MEAT & BEVERAGES ---
  { id: 23, name: "Chicken", price: 250, category: "Meat", alternative: "Soya Chunks", aliases: ["chicken", "murga", "मुर्गा", "चिकन"], pairs: [8, 9, 16] }, // Potato, Onion, Tomato
  { id: 24, name: "Coke", price: 45, category: "Beverages", alternative: "Pepsi", aliases: ["coke", "coca cola", "कोला"], pairs: [15, 7, 2] }, // Biscuit, Bananas, Bread
  { id: 25, name: "Juice", price: 95, oldPrice: 110, discount: "-13%", category: "Beverages", alternative: "Coconut Water", aliases: ["juice", "ras", "रस"], pairs: [6, 7, 19] } // Apples, Bananas, Yogurt
];

export default products;