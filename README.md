# 🛒 Checkmarket

Checkmarket is a practical, offline-first React Native mobile application designed to help users manage grocery products and create smart shopping lists. 

Whether you are a store owner managing inventory or a shopper planning your weekly groceries, Checkmarket provides a simple and intuitive interface to get the job done.

## ✨ Features

* **Product Management:** * Add, edit, and delete products.
    * Define product names, prices, and images.
    * Pre-populated with a sample list of common grocery items.
* **Smart Shopping Lists:**
    * Create customized shopping lists (e.g., "Weekly Groceries", "BBQ Party").
    * Select products from your inventory to add to your list.
    * Automatically calculates the total price of your selected items.
* **Offline Storage:**
    * All products and lists are saved locally on the device using `AsyncStorage`. No internet connection required to use the app!

## 🚀 Tech Stack

* **[React Native](https://reactnative.dev/):** UI framework for building native apps using React.
* **[Expo](https://expo.dev/):** Development platform for fast React Native creation.
* **[React Navigation](https://reactnavigation.org/):** Routing and navigation for the app screens.
* **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/):** Asynchronous, unencrypted, persistent, key-value storage system.

## 📂 Project Structure

```text
checkmarket/
├── App.js                 # App entry point
├── src/
│   ├── components/        # Reusable UI components (ProductCard, CustomButton)
│   ├── data/              # Initial mock data (initialProducts.js)
│   ├── navigation/        # Stack and Tab navigators
│   ├── screens/           # App screens (ManageProducts, CreateList, etc.)
│   └── utils/             # Helper functions (storage.js)