# 🛒 Voice Shopping Assistant - AI-Powered Multilingual E-Commerce

A modern, voice-enabled shopping assistant with intelligent product recommendations, supporting 6 languages and real-time voice commands.

## 🎯 Development Approach

### Overview
Built a **multilingual voice-enabled shopping assistant** using React + Vite, supporting 6 languages (English, Hindi, Spanish, French, German, Portuguese) with intelligent product recommendations and smart cart management.

### Key Features Implemented

#### 1. Voice Recognition & Commands
- **Web Speech API Integration**: Real-time voice input with browser-native speech recognition
- **Language-Aware Recognition**: Auto-switches between languages based on user selection
- **Advanced Quantity Detection**: Parses complex patterns like "add 2 litre milk", "2 पाव add kro"
- **Smart Command Parsing**: Recognizes actions (add/remove), quantities, and products using regex

#### 2. Smart Suggestions System
- **Pair-Based Recommendations**: Each product has curated complementary items
- **Cart-History Aware**: Combines suggestions from current item AND items already in cart
- **Natural Language Voice Feedback**: Supports all 6 languages with proper grammar
- **Smart UI**: Auto-hiding alerts with one-click add buttons

#### 3. Comprehensive Multilingual Support
- **Hindi Aliases**: Both Devanagari script and Roman transliteration
- **Voice Synthesis**: All 6 languages (en, hi, es, fr, de, pt)
- **UI Translation System**: 25+ keys per language
- **Language Selector**: Dropdown with emoji flags

#### 4. Cart Management
- **LocalStorage Persistence**: Cart data saved across sessions
- **Intelligent Quantity Detection**: Handles digits, word numbers, and unit phrases
- **Cart Breakdown**: Subtotal, savings, delivery fee (FREE if >₹200)

#### 5. Modern UI
- **Light Gradient Theme**: slate-50 → blue-50 → indigo-50
- **25 Products** across 8 categories
- **Smart Filtering**: Search, category filter, price range slider

### Technical Stack
- React 19.2.0
- Vite 7.3.1
- Tailwind CSS 4.1.18
- Web Speech API

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5176`

## 🎤 Voice Commands

**Add Items**
- English: "Add 2 milk", "Add 2 litre of milk"
- Hindi: "दो दूध जोड़ो", "2 लीटर दूध"

**Remove Items**
- English: "Remove bread", "Delete butter"
- Hindi: "ब्रेड हटाओ", "मक्खन निकालो"

**Clear Cart**
- English: "Clear cart", "Empty cart"
- Hindi: "कार्ट साफ़ करो", "कार्ट खाली करो"

## 📊 Features

| Feature | Status | Languages |
|---------|--------|-----------|
| Voice Commands | ✅ | 6 |
| Smart Suggestions | ✅ | 6 |
| Quantity Detection | ✅ | 2 (EN, HI) |
| Cart Persistence | ✅ | - |
| Product Filtering | ✅ | 6 |

---

**Version**: 1.0.0 | **Last Updated**: February 2026 | **Status**: Active Development
