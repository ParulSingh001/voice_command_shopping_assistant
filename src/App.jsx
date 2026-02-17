import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import products from "./data/products";
import { translations } from "./data/translations";

function App() {
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [language, setLanguage] = useState("en");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(500);
  const [pairedSuggestions, setPairedSuggestions] = useState([]); // New state for paired suggestions
  const [showSuggestionAlert, setShowSuggestionAlert] = useState(false); // Show/hide suggestion alert

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shoppingCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }, [cart]);

  const t = (key) => translations[language][key] || key;

  const speak = (text, priority = false) => {
    // Add a small delay to ensure speech synthesis queue is clear
    setTimeout(() => {
      const speech = new SpeechSynthesisUtterance(text);
      const langMap = {
        "en": "en-US",
        "hi": "hi-IN",
        "es": "es-ES",
        "fr": "fr-FR",
        "de": "de-DE",
        "pt": "pt-BR"
      };
      speech.lang = langMap[language] || "en-US";
      speech.rate = 0.9; // Slightly slower speech for clarity
      speech.pitch = 1.0;
      speech.volume = 1.0;
      
      console.log("Speaking:", text);
      console.log("Language:", langMap[language]);
      console.log("Priority:", priority);
      
      if (priority) {
        // Only cancel for priority messages (voice commands)
        window.speechSynthesis.cancel();
      }
      
      window.speechSynthesis.speak(speech);
    }, 100); // 100ms delay
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    
    // Show paired suggestions based on the product being added
    let suggestions = [];
    
    // First, try to get suggestions from the product's paired items
    if (product.pairs && product.pairs.length > 0) {
      suggestions = product.pairs
        .map(id => products.find(p => p.id === id))
        .filter(p => p && !cart.find(ci => ci.id === p.id)) // Only suggest if not already in cart
        .slice(0, 2);
    }
    
    // If not enough suggestions, also check what complements items already in cart
    if (suggestions.length < 2) {
      const cartItemPairs = cart
        .flatMap(item => {
          const cartProduct = products.find(p => p.id === item.id);
          return cartProduct?.pairs || [];
        });
      
      const cartBasedSuggestions = [...new Set(cartItemPairs)] // Remove duplicates
        .map(id => products.find(p => p.id === id))
        .filter(p => p && !cart.find(ci => ci.id === p.id) && p.id !== product.id) // Exclude already in cart and current product
        .slice(0, 3 - suggestions.length); // Fill up to 3 total
      
      suggestions = [...suggestions, ...cartBasedSuggestions].slice(0, 3);
    }
    
    if (suggestions.length > 0) {
      setPairedSuggestions(suggestions);
      setShowSuggestionAlert(true);
      
      // Speak the suggestions in the selected language with natural phrasing
      const suggestionNames = suggestions.map(s => s.name);
      let speechMessage = "";
      
      // Create natural language suggestions based on number of items
      let productList = "";
      if (suggestionNames.length === 1) {
        productList = suggestionNames[0];
      } else if (suggestionNames.length === 2) {
        productList = `${suggestionNames[0]} और ${language === "hi" ? "" : ""}${suggestionNames[1]}`;
      } else {
        productList = `${suggestionNames.slice(0, -1).join(", ")} और ${suggestionNames[suggestionNames.length - 1]}`;
      }
      
      if (language === "hi") {
        speechMessage = `आप ${productList} भी जोड़ सकते हैं`;
      } else if (language === "es") {
        // Create Spanish list: "Tea y Bread" or "Tea, Coffee y Bread"
        let spanishList = "";
        if (suggestionNames.length === 1) {
          spanishList = suggestionNames[0];
        } else if (suggestionNames.length === 2) {
          spanishList = `${suggestionNames[0]} y ${suggestionNames[1]}`;
        } else {
          spanishList = `${suggestionNames.slice(0, -1).join(", ")} y ${suggestionNames[suggestionNames.length - 1]}`;
        }
        speechMessage = `También puedes agregar ${spanishList}`;
      } else if (language === "fr") {
        // Create French list: "Thé et Pain" or "Thé, Café et Pain"
        let frenchList = "";
        if (suggestionNames.length === 1) {
          frenchList = suggestionNames[0];
        } else if (suggestionNames.length === 2) {
          frenchList = `${suggestionNames[0]} et ${suggestionNames[1]}`;
        } else {
          frenchList = `${suggestionNames.slice(0, -1).join(", ")} et ${suggestionNames[suggestionNames.length - 1]}`;
        }
        speechMessage = `Vous pouvez aussi ajouter ${frenchList}`;
      } else if (language === "de") {
        // Create German list: "Tee und Brot" or "Tee, Kaffee und Brot"
        let germanList = "";
        if (suggestionNames.length === 1) {
          germanList = suggestionNames[0];
        } else if (suggestionNames.length === 2) {
          germanList = `${suggestionNames[0]} und ${suggestionNames[1]}`;
        } else {
          germanList = `${suggestionNames.slice(0, -1).join(", ")} und ${suggestionNames[suggestionNames.length - 1]}`;
        }
        speechMessage = `Du kannst auch ${germanList} hinzufügen`;
      } else if (language === "pt") {
        // Create Portuguese list: "Chá e Pão" or "Chá, Café e Pão"
        let portugueseList = "";
        if (suggestionNames.length === 1) {
          portugueseList = suggestionNames[0];
        } else if (suggestionNames.length === 2) {
          portugueseList = `${suggestionNames[0]} e ${suggestionNames[1]}`;
        } else {
          portugueseList = `${suggestionNames.slice(0, -1).join(", ")} e ${suggestionNames[suggestionNames.length - 1]}`;
        }
        speechMessage = `Você também pode adicionar ${portugueseList}`;
      } else {
        // English: "Tea and Bread" or "Tea, Coffee and Bread"
        let englishList = "";
        if (suggestionNames.length === 1) {
          englishList = suggestionNames[0];
        } else if (suggestionNames.length === 2) {
          englishList = `${suggestionNames[0]} and ${suggestionNames[1]}`;
        } else {
          englishList = `${suggestionNames.slice(0, -1).join(", ")} and ${suggestionNames[suggestionNames.length - 1]}`;
        }
        speechMessage = `You can also add ${englishList}`;
      }
      
      console.log("Suggestion message:", speechMessage);
      // Add a delay so the "Added" message finishes speaking first
      setTimeout(() => {
        speak(speechMessage);
      }, 500);
      
      // Hide suggestion after 6 seconds
      setTimeout(() => {
        setShowSuggestionAlert(false);
      }, 6000);
    }
  };

  const removeFromCart = (id, quantityToRemove = 1) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity - quantityToRemove) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleVoiceCommand = (command) => {
    if (!command) return;
    const lower = command.toLowerCase().trim();
    setVoiceText(command);
    
    // Debug log
    console.log("Voice command received:", command);
    console.log("Lowercase:", lower);

    // Check for clear cart command first
    if (lower.includes("clear") || lower.includes("empty") || lower.includes("khali") || lower.includes("saaf")) {
      setCart([]);
      speak(t("cartCleared"));
      return;
    }

    const numberWords = { 
      "one": 1, "first": 1, "two": 2, "to": 2, "too": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
      "ek": 1, "do": 2, "teen": 3, "char": 4, "paanch": 5, "chhe": 6, "saat": 7, "aath": 8, "nau": 9, "das": 10
    };

    let foundSomething = false;
    const processedProducts = new Set();
    const addedItems = [];
    const removedItems = [];

    // Determine if this is a remove/delete command
    // Check for various ways to say "remove" in English and Hindi
    const isRemoveCommand = lower.includes("remove") || lower.includes("delete") || 
                           lower.includes("hatao") || lower.includes("nikalo") ||
                           lower.includes("हटाओ") || lower.includes("निकालो");
    
    console.log("Is remove command:", isRemoveCommand);

    products.forEach((product) => {
      const productNames = [product.name.toLowerCase(), ...(product.aliases || [])];
      const matchedName = productNames.find(name => lower.includes(name.toLowerCase()));
      
      if (matchedName) {
        if (processedProducts.has(product.id)) return;
        processedProducts.add(product.id);
        
        foundSomething = true;
        console.log("Found product:", product.name, "Matched name:", matchedName);
        
        let quantity = 1;
        
        // Create escaped name for regex
        const escapedName = matchedName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const numberPatterns = Object.keys(numberWords).join('|');
        
        // Pattern 1: "number [unit] productname" 
        // Match: number, followed by optional units/words (but NOT remove commands), then product name
        // This handles: "2 milk", "2 litre milk", "2 packets of milk", "2 dudh", "2 litre dudh"
        const pattern1 = new RegExp(`(\\d+|${numberPatterns})\\s+(?:packets?|packs?|litres?|liters?|liter?|l|kg|grams?|g|pieces?|pcs?|p|of|and)\\s*${escapedName}`, 'i');
        const match1 = pattern1.exec(lower);
        
        if (match1) {
          const quantityText = match1[1].toLowerCase().trim();
          quantity = numberWords[quantityText] || parseInt(quantityText) || 1;
          console.log("Pattern 1 match:", match1[0], "Quantity:", quantity);
        } else {
          // Pattern 2: "number productname" (without units)
          // This handles: "2 milk", "two bread"
          const pattern2 = new RegExp(`(\\d+|${numberPatterns})\\s+${escapedName}`, 'i');
          const match2 = pattern2.exec(lower);
          
          if (match2) {
            const quantityText = match2[1].toLowerCase().trim();
            quantity = numberWords[quantityText] || parseInt(quantityText) || 1;
            console.log("Pattern 2 match:", match2[0], "Quantity:", quantity);
          } else {
            // Pattern 3: "productname number" - e.g., "bread 2", "milk two"
            const pattern3 = new RegExp(`${escapedName}\\s+(?:and\\s+)?(\\d+|${numberPatterns})`, 'i');
            const match3 = pattern3.exec(lower);
            
            if (match3) {
              const quantityText = match3[1].toLowerCase().trim();
              quantity = numberWords[quantityText] || parseInt(quantityText) || 1;
              console.log("Pattern 3 match:", match3[0], "Quantity:", quantity);
            }
          }
        }

        console.log("Final action - isRemoveCommand:", isRemoveCommand, "Quantity:", quantity);
        if (isRemoveCommand) {
          removeFromCart(product.id, quantity);
          removedItems.push(`${quantity} ${product.name}`);
          console.log("Removed:", quantity, product.name);
        } else {
          addToCart(product, quantity);
          addedItems.push(`${quantity} ${product.name}`);
          console.log("Added:", quantity, product.name);
        }
      }
    });

    if (addedItems.length > 0) {
      const itemList = addedItems.join(", ");
      const feedbackMessage = t("addedItem").replace("{item}", itemList);
      speak(feedbackMessage, true); // Priority = true for added message
    }
    
    if (removedItems.length > 0) {
      const itemList = removedItems.join(", ");
      const feedbackMessage = t("removedItem").replace("{item}", itemList);
      speak(feedbackMessage, true); // Priority = true for removed message
    }

    if (!foundSomething && (lower.includes("add") || lower.includes("jodo") || lower.includes("kro"))) {
      const numberWords = { 
        "one": 1, "first": 1, "two": 2, "to": 2, "too": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
        "ek": 1, "do": 2, "teen": 3, "char": 4, "paanch": 5, "chhe": 6, "saat": 7, "aath": 8, "nau": 9, "das": 10
      };
      
      const words = lower.split(" ");
      const addIndex = Math.max(words.indexOf("add"), words.indexOf("jodo"), words.indexOf("kro"));
      
      // Extract quantity and item name
      let customQuantity = 1;
      let newItemName = words[addIndex + 1];
      
      // Check if the word after 'add' is a number
      if (newItemName && (numberWords[newItemName] || !isNaN(parseInt(newItemName)))) {
        customQuantity = numberWords[newItemName] || parseInt(newItemName);
        newItemName = words[addIndex + 2]; // Get the actual item name
      } else if (newItemName) {
        // Check if there's a quantity before 'add'
        const beforeAddWords = words.slice(0, addIndex);
        for (let i = beforeAddWords.length - 1; i >= 0; i--) {
          if (numberWords[beforeAddWords[i]] || !isNaN(parseInt(beforeAddWords[i]))) {
            customQuantity = numberWords[beforeAddWords[i]] || parseInt(beforeAddWords[i]);
            break;
          }
        }
      }

      if (newItemName && !["a", "some", "the", "please", "cart", "mai", "mein", "litre", "liter", "packet", "pack", "piece"].includes(newItemName)) {
        const customItem = {
          id: Date.now(),
          name: newItemName.charAt(0).toUpperCase() + newItemName.slice(1),
          price: 0,
          category: "Other"
        };
        addToCart(customItem, customQuantity);
        foundSomething = true;
        speak(t("addedCustomItem").replace("{item}", `${customQuantity} ${newItemName}`));
      }
    } else if (!foundSomething) {
      speak(t("notRecognized"));
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      speak(t("emptyCart"));
      return;
    }
    speak(t("orderPlaced"));
    setCart([]); 
  };

  const startListening = () => {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) return alert("Browser not supported");
    
    const recognition = new Speech();
    const langMap = {
      "en": "en-US",
      "hi": "hi-IN",
      "es": "es-ES",
      "fr": "fr-FR",
      "de": "de-DE",
      "pt": "pt-BR"
    };
    recognition.lang = langMap[language] || "en-US";
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setVoiceText(text);
      handleVoiceCommand(text);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = cart.reduce((sum, item) => {
    if (item.oldPrice) {
      return sum + ((item.oldPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const deliveryFee = total > 200 ? 0 : 50;

  const getSmartSuggestions = () => {
    const cartIds = new Set(cart.map(item => item.id));
    return products.filter(p => !cartIds.has(p.id))
      .sort((a, b) => {
        const aDiscount = a.discount ? 1 : 0;
        const bDiscount = b.discount ? 1 : 0;
        if (aDiscount !== bDiscount) return bDiscount - aDiscount;
        return a.price - b.price;
      })
      .slice(0, 6);
  };

  const categories = ["All", "Dairy", "Bakery", "Produce", "Grains", "Pantry", "Meat", "Beverages"];
  
  const filteredProducts = products.filter(p => {
    const matchesSearch = searchTerm === "" || p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesPrice = p.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              🛒 VoiceCart AI
            </h1>
          </div>
          <p className="text-slate-600 hidden md:block">{t("smartAssistant")}</p>
          <div className="relative">
            <button 
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="px-4 py-2 rounded-lg font-semibold text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-md"
            >
              🌐 Language
            </button>
            {showLanguageDropdown && (
              <div className="absolute right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 min-w-max">
                <button 
                  onClick={() => {
                    setLanguage("en");
                    setShowLanguageDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm transition-all ${
                    language === "en" 
                      ? "bg-indigo-100 text-indigo-600 font-semibold" 
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  🇬🇧 English
                </button>
                <button 
                  onClick={() => {
                    setLanguage("hi");
                    setShowLanguageDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm transition-all border-t border-slate-200 ${
                    language === "hi" 
                      ? "bg-indigo-100 text-indigo-600 font-semibold" 
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  🇮🇳 हिंदी (Hindi)
                </button>
                <button 
                  onClick={() => {
                    setLanguage("es");
                    setShowLanguageDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm transition-all border-t border-slate-200 ${
                    language === "es" 
                      ? "bg-indigo-100 text-indigo-600 font-semibold" 
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  🇪🇸 Español (Spanish)
                </button>
                <button 
                  onClick={() => {
                    setLanguage("fr");
                    setShowLanguageDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm transition-all border-t border-slate-200 ${
                    language === "fr" 
                      ? "bg-indigo-100 text-indigo-600 font-semibold" 
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  🇫🇷 Français (French)
                </button>
                <button 
                  onClick={() => {
                    setLanguage("de");
                    setShowLanguageDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm transition-all border-t border-slate-200 ${
                    language === "de" 
                      ? "bg-indigo-100 text-indigo-600 font-semibold" 
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  🇩🇪 Deutsch (German)
                </button>
                <button 
                  onClick={() => {
                    setLanguage("pt");
                    setShowLanguageDropdown(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm transition-all border-t border-slate-200 ${
                    language === "pt" 
                      ? "bg-indigo-100 text-indigo-600 font-semibold" 
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  🇵🇹 Português (Portuguese)
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mic Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-slate-200">
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={startListening}
              className={`w-24 h-24 rounded-full shadow-xl transition-all flex items-center justify-center font-bold text-5xl ${
                isListening 
                  ? "bg-gradient-to-r from-red-500 to-pink-500 animate-pulse scale-110 text-white" 
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 text-white"
              }`}
            >
              {isListening ? "🎧" : "🎤"}
            </button>
            
            <div className="w-full max-w-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-indigo-200">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">LIVE COMMAND</p>
              <p className="text-xl font-bold text-slate-800 min-h-8">
                {voiceText || (language === "hi" ? "कहें 'कार्ट में दो दूध जोड़ो'" : "Say 'Add 2 milk to cart'")}
              </p>
            </div>

            <p className="text-sm text-slate-600 max-w-2xl text-center">
              💡 Try: "Add 2 Milk", "Remove Bread", "Find items under 50"
            </p>
          </div>
        </div>

        {/* Paired Suggestions Alert */}
        {showSuggestionAlert && pairedSuggestions.length > 0 && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-orange-500 rounded-lg p-6 mb-8 shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-orange-900 mb-3">💡 {t("smartSuggestions")}</h3>
                <div className="flex gap-3 flex-wrap">
                  {pairedSuggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        addToCart(product, 1);
                        setShowSuggestionAlert(false);
                      }}
                      className="bg-white border-2 border-orange-400 text-orange-700 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-all text-sm"
                    >
                      + {product.name} (₹{product.price})
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setShowSuggestionAlert(false)}
                className="text-orange-500 hover:text-orange-700 text-2xl"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Special Offers & Suggestions */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl shadow-lg p-8 mb-8 border-2 border-amber-200">
          <h3 className="text-2xl font-bold text-amber-900 mb-6 flex items-center">
            ⚡ {t("specialOffers")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {getSmartSuggestions().map(item => (
              <button 
                key={item.id}
                onClick={() => addToCart(item, 1)}
                className="group"
              >
                <div className="bg-white rounded-2xl p-4 border-2 border-amber-200 hover:shadow-lg transition-all hover:border-amber-400">
                  <p className="font-bold text-amber-900 text-center mb-2">{item.name}</p>
                  <p className="text-lg font-bold text-indigo-600 text-center">₹{item.price}</p>
                  {item.oldPrice && (
                    <p className="text-xs text-slate-400 line-through text-center">₹{item.oldPrice}</p>
                  )}
                  {item.discount && (
                    <p className="text-xs font-bold text-red-600 text-center mt-1">{item.discount}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t("searchProduct")}</label>
                  <input 
                    type="text"
                    placeholder="e.g., Milk, Bread..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t("category")}</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t("maxPrice")}: ₹{maxPrice}</label>
                  <input 
                    type="range"
                    min="0"
                    max="500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">🛍️ {t("availableProducts")} ({filteredProducts.length})</h2>
              <div className="space-y-4">
                {filteredProducts.length === 0 ? (
                  <p className="text-center text-slate-500 py-8">No products found</p>
                ) : (
                  filteredProducts.map(product => (
                    <div key={product.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:shadow-md transition-all">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg text-slate-800">{product.name}</h3>
                          {product.discount && (
                            <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded-lg">{product.discount}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span>Category: {product.category}</span>
                          {product.alternative && (
                            <span>📦 View Alternative: {product.alternative}</span>
                          )}
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <span className="text-2xl font-bold text-indigo-600">₹{product.price}</span>
                          {product.oldPrice && (
                            <span className="text-sm text-slate-400 line-through">₹{product.oldPrice}</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all"
                      >
                        Add
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-slate-200 sticky top-24">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                🛒 {t("cart")}
                <span className="bg-indigo-600 text-white rounded-full px-3 py-1 text-sm">{cart.length}</span>
              </h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-slate-400 text-lg">{t("yourCartIsEmpty")}</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-start p-3 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-bold text-slate-800">{item.name}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button 
                              onClick={() => removeFromCart(item.id, 1)}
                              className="w-6 h-6 bg-slate-300 rounded flex items-center justify-center text-sm font-bold"
                            >
                              −
                            </button>
                            <span className="w-6 text-center font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => addToCart(item, 1)}
                              className="w-6 h-6 bg-indigo-600 text-white rounded flex items-center justify-center text-sm font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-indigo-600">₹{item.price * item.quantity}</p>
                          {item.oldPrice && (
                            <p className="text-xs text-green-600">Save ₹{(item.oldPrice - item.price) * item.quantity}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-slate-200 pt-4 space-y-3">
                    <div className="flex justify-between text-slate-600">
                      <span>{t("subtotal")}</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-green-600 font-semibold">
                        <span>{t("youSave")}</span>
                        <span>₹{savings.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span>{t("delivery")}</span>
                      <span className={deliveryFee === 0 ? "text-green-600 font-semibold" : ""}>
                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                      <div className="flex justify-between text-lg font-bold text-indigo-600">
                        <span>{t("total")}</span>
                        <span>₹{(total + deliveryFee).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handlePlaceOrder}
                    className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all text-lg"
                  >
                    💳 {t("checkout")}
                  </button>

                  <button 
                    onClick={() => setCart([])}
                    className="w-full mt-3 text-slate-700 py-2 rounded-xl font-semibold hover:bg-slate-100 transition-all"
                  >
                    {t("clearCart")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
