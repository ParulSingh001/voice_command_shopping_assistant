# 🎤 Voice Shopping Assistant - Smart Multilingual E-Commerce

A modern, voice-enabled shopping application with intelligent product recommendations and 6-language support. Shop hands-free using voice commands in English, Hindi, Spanish, French, German, or Portuguese!

## ✨ Key Features

### 🎙️ Voice Recognition & Commands
- **Real-time voice input** using Web Speech API
- **Smart quantity detection**: "Add 2 litres of milk", "2 पाव add kro"
- **Multi-language support** for voice commands (auto-switches with language selection)
- **Smart command parsing** with support for:
  - English numbers: "one", "two", "three"
  - Hindi numbers: "ek", "do", "teen"
  - Units: "litre", "packet", "kg", "gram"
  - Actions: "add", "remove", "clear cart"
  - Hindi actions: "jodo", "hatao", "khali"

### 💡 Intelligent Product Recommendations
- **Pair-based suggestions** (milk → suggests bread, butter, tea)
- **Cart-history aware** (learns from what user has already added)
- **Natural voice feedback** with language-appropriate phrasing
- **Auto-hide smart alerts** with clickable quick-add buttons
- Voice announcement of suggestions in selected language

### 🌍 Comprehensive Multilingual Support
- **6 Languages**: English, Hindi, Spanish, French, German, Portuguese
- **Bilingual aliases** for every product (English + Hindi Devanagari + Transliteration)
- **All UI text translated** using centralized translation system
- **Language-aware voice synthesis** (proper accents and pronunciation)
- **Dropdown language selector** with emoji flags

### 🛒 Advanced Cart Management
- **Persistent cart** (localStorage saves across sessions)
- **Real-time quantity detection** from voice commands
- **Smart remove functionality** ("remove", "delete", "hatao", "nikalo")
- **Cart breakdown** (subtotal, savings, delivery fee)
- **Free delivery** when cart > ₹200
- **Add/remove/clear operations** from voice or UI

### 🎨 Modern Light Theme UI
- **Gradient background** (slate → blue → indigo)
- **Responsive design** with Tailwind CSS
- **Product filtering**:
  - Search by name
  - Filter by category
  - Price range slider
- **25 products** across 8 categories

## 🏗️ Development Approach

### Voice Recognition & Processing
- **Language-aware speech recognition** that auto-switches with user's language selection
- **Advanced regex patterns** for detecting quantities: "2 milk", "do dudh", "2 litre milk"
- **Multi-language number support** (English: "two", Hindi: "do")
- **Smart command parsing** for actions: add, remove, clear cart

### Intelligent Suggestion Algorithm
1. Get direct product pairs (e.g., milk → [bread, butter, tea])
2. Analyze cart history for complementary purchases
3. Combine and deduplicate suggestions (max 3 items)
4. Exclude items already in cart
5. Speak suggestions in user's selected language
6. Show visual alert with quick-add buttons for convenience

### Multilingual Architecture
- **Centralized translations** in `src/data/translations.js` for all 6 languages
- **Product database** with bilingual aliases (English + Hindi Devanagari + Transliteration)
- **Pair matching system** for smart recommendations across language boundaries
- **Voice synthesis** with language-specific settings and pronunciation

### Voice Synthesis Queue Management
- **Priority-based speech queue** (voice commands cancel suggestions)
- **Timed delays** to ensure "Added" message completes before suggestions speak
- **Language-specific speech settings** (rate, pitch, volume optimization)
- **Non-blocking speech** (suggestions don't interrupt other messages)

### React State Management
- **Hooks-based architecture** (useState, useEffect for reactive updates)
- **LocalStorage persistence** for cart across sessions
- **Real-time language switching** with automatic UI translation
- **Efficient re-rendering** with proper dependency management

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
# App runs at http://localhost:5176
```

### Usage
1. Click the **🎤 microphone button** to start voice input
2. Say a command like:
   - English: "Add 2 milk"
   - Hindi: "2 दूध add kro"
   - Spanish: "Agregar pan"
3. Listen for confirmation and suggestions
4. Click suggestion buttons or continue speaking

## 📁 Project Structure

```
voice-shopping-assistant/
├── src/
│   ├── App.jsx                 # Main app with voice logic
│   ├── data/
│   │   ├── products.js        # 25 products with multilingual aliases
│   │   └── translations.js    # 6-language translation system
│   ├── components/
│   │   ├── ProductList.jsx    # Product grid display
│   │   └── SearchBar.jsx      # Search functionality
│   └── styles/                # CSS files
├── package.json               # Dependencies
├── vite.config.js            # Vite configuration
└── README.md                  # This file
```

## 🔧 Technical Stack

| Component | Technology |
|-----------|------------|
| Frontend Framework | React 19.2.0 |
| Build Tool | Vite 7.3.1 |
| Styling | Tailwind CSS 4.1.18 |
| Voice APIs | Web Speech API (native browser) |
| State Management | React Hooks |
| Persistence | LocalStorage |
| Language Support | 6 languages |

## 🌐 Supported Languages

| Language | Code | Voice Synthesis |
|----------|------|-----------------|
| English | en | en-US ✓ |
| Hindi | hi | hi-IN ✓ |
| Spanish | es | es-ES ✓ |
| French | fr | fr-FR ✓ |
| German | de | de-DE ✓ |
| Portuguese | pt | pt-BR ✓ |

## 💾 Data Persistence

- **Cart saved to localStorage** automatically
- **Survives page refresh**
- **Clears on "Clear Cart" command**
- **JSON format storage**

## 🐛 Troubleshooting

### Voice not being recognized?
- Check microphone permissions in browser
- Ensure you're speaking clearly
- Try saying commands slower
- Check if speech recognition language is set correctly

### Suggestions not appearing?
- Open browser console (F12) to see debug logs
- Make sure items added aren't already in cart
- Wait for the "Added" message to complete first

### Speech not being heard?
- Check browser volume settings
- Ensure voice synthesis is enabled
- Try a different language
- Check if other audio is playing

## 📈 Performance

- **Fast voice recognition** (under 2 seconds)
- **Instant UI updates**
- **Smooth animations** with Tailwind transitions
- **Optimized product search**
- **Efficient state management**

## 🚀 Future Enhancements

- [ ] User authentication & history
- [ ] Payment gateway integration
- [ ] Order tracking
- [ ] More product categories
- [ ] Custom voice profiles
- [ ] Mobile app version
- [ ] Real inventory sync
- [ ] SMS/Email order confirmations

## 📝 License

MIT License - Feel free to use and modify!

## 👨‍💻 Developer Notes

### Key Files Modified
- `src/App.jsx`: Main voice logic and state management
- `src/data/products.js`: Product database with aliases and pairs
- `src/data/translations.js`: All translation strings (6 languages)
- `src/components/ProductList.jsx`: Product rendering

### Important Functions
- `handleVoiceCommand()`: Parses voice input, detects quantities
- `addToCart()`: Handles adding + intelligent suggestion generation
- `speak()`: Voice synthesis with priority queue management
- `startListening()`: Initiates speech recognition with language awareness

---

**Happy Shopping! 🛒🎤**

For updates and issues, visit: [GitHub Repository](https://github.com/ParulSingh001/voice_command_shopping_assistant)
